"use client";

import Script from "next/script";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { submitEnquiry, type EnquiryKind, type EnquiryState } from "@/app/actions/enquiry";
import { track } from "./Analytics";
import { Arrow } from "./Icons";

const EVENT: Record<EnquiryKind, string> = { quote: "rfq_submit", partner: "partner_submit", contact: "contact_submit" };
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function Field({ name, label, error, span2, children }: {
  name: string; label: string; error?: string; span2?: boolean; children: React.ReactElement;
}) {
  return (
    <label className={`field ${span2 ? "sm:col-span-2" : ""}`} htmlFor={name}>
      <span>{label}</span>
      {children}
      {error && <span className="err" id={`${name}-err`}>{error}</span>}
    </label>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  const t = useTranslations("form");
  return (
    <button type="submit" className="btn btn-gold" disabled={pending}>
      {pending ? t("sending") : t("send")} {!pending && <Arrow />}
    </button>
  );
}

export function EnquiryForm({ kind, product, category }: { kind: EnquiryKind; product?: string; category?: string }) {
  const t = useTranslations("form");
  const [state, action] = useActionState<EnquiryState, FormData>(submitEnquiry, { status: "idle" });
  // The action returns English messages; show them in the page's language.
  const ERR: Record<string, string> = { Required: t("errRequired"), "Enter a valid email address": t("errEmail"), "Tell us how we can help": t("errMessage") };
  const e = Object.fromEntries(Object.entries(state.errors ?? {}).map(([k, m]) => [k, ERR[m] ?? m]));
  const v = state.values ?? {};
  const inv = (n: string) => (e[n] ? { "aria-invalid": true as const, "aria-describedby": `${n}-err` } : {});

  useEffect(() => {
    if (state.status === "ok") track(EVENT[kind], { product: product ?? "", category: category ?? "" });
  }, [state.status, kind, product, category]);

  if (state.status === "ok") {
    return (
      <div role="status" className="border border-ink-3/14 p-8 lg:p-[42px]">
        <p className="t-label m-0 text-gold-deep">{t("sent")}</p>
        <p className="mt-4 text-[17px] font-normal leading-[1.6] tracking-[-0.014em]">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid grid-cols-1 gap-x-[18px] gap-y-5 border border-ink-3/14 p-6 sm:grid-cols-2 lg:px-[42px] lg:py-10">
      <input type="hidden" name="kind" value={kind} />
      {/* Honeypot, hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label>{t("honeypot")} <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {kind === "quote" && (
        <>
          {product
            ? <Field name="product" label={t("product")} span2><input id="product" name="product" defaultValue={v.product ?? product} readOnly /></Field>
            : <Field name="category" label={t("category")} span2><input id="category" name="category" defaultValue={v.category ?? category} placeholder={t("phCategory")} /></Field>}
          <Field name="quantity" label={t("quantity")}><input id="quantity" name="quantity" defaultValue={v.quantity} inputMode="numeric" placeholder={t("phQuantity")} /></Field>
          <Field name="unit" label={t("unit")}>
            <select id="unit" name="unit" defaultValue={v.unit}>{(t.raw("units") as string[]).map((u, i) => <option key={u} value={["Cartons", "Pallets", "20ft container", "40ft container"][i]}>{u}</option>)}</select>
          </Field>
          <Field name="country" label={t("country")} error={e.country}><input id="country" name="country" defaultValue={v.country} required placeholder={t("phCountry")} autoComplete="country-name" {...inv("country")} /></Field>
          <Field name="port" label={t("port")}><input id="port" name="port" defaultValue={v.port} placeholder={t("phPort")} /></Field>
          <Field name="incoterm" label={t("incoterm")}>
            <select id="incoterm" name="incoterm" defaultValue={v.incoterm}>
              <option value="Not sure yet">{t("incotermUnsure")}</option>
              {["EXW", "FOB", "CFR", "CIF", "DAP"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </Field>
        </>
      )}

      {kind === "partner" && (
        <>
          <Field name="brand" label={t("brand")} error={e.brand}><input id="brand" name="brand" defaultValue={v.brand} required {...inv("brand")} /></Field>
          <Field name="partnership" label={t("partnership")}>
            <select id="partnership" name="partnership" defaultValue={v.partnership}>{(t.raw("partnerships") as string[]).map((p, i) => <option key={p} value={["Distribution", "Agency", "Private label", "Sourcing"][i]}>{p}</option>)}</select>
          </Field>
          <Field name="category" label={`${t("category")} ${t("optional")}`} span2><input id="category" name="category" defaultValue={v.category ?? category} /></Field>
        </>
      )}

      <Field name="company" label={t("company")} error={e.company}><input id="company" name="company" defaultValue={v.company} required autoComplete="organization" {...inv("company")} /></Field>
      <Field name="name" label={t("name")} error={e.name}><input id="name" name="name" defaultValue={v.name} required autoComplete="name" {...inv("name")} /></Field>
      <Field name="email" label={t("email")} error={e.email}><input id="email" name="email" type="email" defaultValue={v.email} required autoComplete="email" {...inv("email")} /></Field>
      <Field name="phone" label={`${t("phone")} ${t("optional")}`}><input id="phone" name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" dir="ltr" /></Field>
      <Field name="message" label={kind === "contact" ? t("message") : `${t("message")} ${t("optional")}`} error={e.message} span2>
        <textarea id="message" name="message" defaultValue={v.message} required={kind === "contact"} placeholder={kind === "quote" ? t("phMessage") : ""} {...inv("message")} />
      </Field>

      {kind === "quote" && (
        <label className="flex cursor-pointer items-start gap-3 text-[13px] font-light leading-[1.55] text-body sm:col-span-2">
          <input type="checkbox" name="privateLabel" defaultChecked={v.privateLabel === "on"} className="mt-[2px] h-[18px] w-[18px] shrink-0 accent-gold-deep" />
          {t("privateLabel")}
        </label>
      )}

      {SITE_KEY && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile sm:col-span-2" data-sitekey={SITE_KEY} data-theme="light" />
        </>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-5 sm:col-span-2">
        <Submit />
        <span className="text-[12.5px] font-light text-muted">{t("note")}</span>
      </div>
      {state.status === "invalid" && <p role="alert" className="m-0 text-[13px] text-[#b3261e] sm:col-span-2">{t("invalid")}</p>}
      {state.status === "error" && <p role="alert" className="m-0 text-[13px] text-[#b3261e] sm:col-span-2">{t("error")}</p>}
    </form>
  );
}
