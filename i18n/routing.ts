import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// While false, /ar is noindex, has no hreflang, and the header AR switch stays inactive.
export const AR_LIVE = true;

export const dirOf = (locale: string) => (locale === "ar" ? "rtl" : "ltr");
