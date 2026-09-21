import type { Metadata, Viewport } from "next";
import { Poppins, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { routing, dirOf } from "@/i18n/routing";
import { company } from "@/content/company";
import { Reveal } from "@/components/Reveal";
import { ClickTracking } from "@/components/Analytics";
import { JsonLd, organizationLd } from "@/components/JsonLd";
import { translate } from "@/lib/copy";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Arabic pages; Poppins has no Arabic glyphs.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
});

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const tr = translate(locale);
  return {
    metadataBase: new URL(company.url),
    title: {
      default: `${tr("HMH General Trading")} — ${tr("From origin to every market")}`,
      template: `%s — ${tr("HMH General Trading")}`,
    },
    description: tr(company.description),
    applicationName: tr(company.legalName),
    openGraph: { type: "website", siteName: tr(company.legalName), locale: locale === "ar" ? "ar_AE" : "en_AE" },
  };
}

export const viewport: Viewport = { themeColor: "#0a0b0c", viewportFit: "cover" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${poppins.variable} ${plexArabic.variable}`}>
      <head>
        {/* Reveal styles only hide content once JS is known to be running. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <NextIntlClientProvider>
          {children}
          <Reveal />
          <ClickTracking />
        </NextIntlClientProvider>
        <JsonLd data={organizationLd} />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
