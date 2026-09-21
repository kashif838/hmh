"use server";

import { z } from "zod";
import { company } from "@/content/company";

// `values` echoes what was submitted, because React resets form fields after an action runs.
export type EnquiryState = {
  status: "idle" | "ok" | "invalid" | "error";
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, msg = "Required") => z.string().trim().min(1, msg).max(max);

const Base = z.object({
  company: required(200),
  name: required(120),
  email: z.email("Enter a valid email address").max(200),
  phone: text(40).optional(),
  message: text(4000).optional(),
});

const Schemas = {
  quote: Base.extend({
    product: text(200).optional(),
    category: text(120).optional(),
    quantity: text(60).optional(),
    unit: z.enum(["Cartons", "Pallets", "20ft container", "40ft container"]),
    country: required(120),
    port: text(120).optional(),
    incoterm: z.enum(["Not sure yet", "EXW", "FOB", "CFR", "CIF", "DAP"]),
    privateLabel: z.literal("on").optional(),
  }),
  partner: Base.extend({
    brand: required(200),
    category: text(120).optional(),
    partnership: z.enum(["Distribution", "Agency", "Private label", "Sourcing"]),
  }),
  contact: Base.extend({ message: required(4000, "Tell us how we can help") }),
} as const;

export type EnquiryKind = keyof typeof Schemas;

const SUBJECT: Record<EnquiryKind, string> = {
  quote: "Quotation request",
  partner: "Partnership enquiry",
  contact: "Website enquiry",
};

async function verifyTurnstile(token: FormDataEntryValue | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot only
  if (typeof token !== "string" || !token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  return ((await res.json()) as { success?: boolean }).success === true;
}

async function deliver(subject: string, body: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Never pretend a lead was delivered in production when nothing can deliver it.
    if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY is not set");
    console.info(`[enquiry:dev] ${subject}\n${body}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "HMH Website <website@hmhdubai.com>",
      to: [process.env.ENQUIRY_TO ?? company.email],
      reply_to: replyTo,
      subject,
      text: body, // plain text only: submitted values are never rendered as HTML
    }),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  const kind = form.get("kind") as EnquiryKind;
  const schema = Schemas[kind];
  if (!schema) return { status: "error" };

  // Honeypot: real visitors never see or fill this field.
  if (form.get("website")) return { status: "ok" };
  const raw = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string" && v !== "")) as Record<string, string>;
  if (!(await verifyTurnstile(form.get("cf-turnstile-response")))) return { status: "error", values: raw };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { status: "invalid", errors, values: raw };
  }

  const data = parsed.data as Record<string, string | undefined>;
  const lines = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}: ${k === "privateLabel" ? "Yes" : v}`);
  const subject = `${SUBJECT[kind]}${data.product ? `: ${data.product}` : data.category ? `: ${data.category}` : ""} (${data.company})`;

  try {
    await deliver(subject, lines.join("\n"), data.email!);
    return { status: "ok" };
  } catch (e) {
    console.error("[enquiry] delivery failed", e);
    return { status: "error", values: raw };
  }
}
