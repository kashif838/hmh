import type { Metadata } from "next";
import { AR_LIVE } from "@/i18n/routing";

/** Per-page metadata: unique title/description, canonical, hreflang pair once Arabic is live. */
export function pageMeta(opts: { title: string; description: string; path: string; locale: string; image?: string }): Metadata {
  const { title, description, path, locale, image } = opts;
  const en = path === "/" ? "/" : `${path}/`;
  const ar = `/ar${path === "/" ? "" : path}/`;
  return {
    title,
    description,
    alternates: {
      canonical: locale === "ar" ? ar : en,
      ...(AR_LIVE ? { languages: { en, ar, "x-default": en } } : {}),
    },
    openGraph: { title, description, url: locale === "ar" ? ar : en, images: image ? [image] : ["/images/hero-1.jpg"] },
    ...(locale === "ar" && !AR_LIVE ? { robots: { index: false, follow: false } } : {}),
  };
}
