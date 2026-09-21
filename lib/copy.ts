import { useLocale } from "next-intl";
import { AR } from "@/content/ar";

/** The English copy is the key. Arabic falls back to English for any string without a translation. */
export const translate = (locale: string) => (en: string) => (locale === "ar" && AR[en]) || en;

/** For non-async components, server or client. Async pages use translate(locale). */
export function useCopy() {
  return translate(useLocale());
}
