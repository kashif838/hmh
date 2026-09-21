import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // The URL alone decides the language: unprefixed is English, /ar is Arabic.
  // Detection would send English links back to /ar once a visitor had seen Arabic.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// While false, /ar is noindex, has no hreflang, and the header AR switch stays inactive.
export const AR_LIVE = true;

export const dirOf = (locale: string) => (locale === "ar" ? "rtl" : "ltr");
