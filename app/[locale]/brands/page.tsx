import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { PageIntro } from "@/components/Page";
import { AbuKooraPanel, BoonPanel, ContactBand, Quote } from "@/components/Sections";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  return pageMeta({
    title: "Our Brands",
    description: "Boon and Abu Koora: two brands owned and developed by HMH General Trading, specified, manufactured under contract, packaged bilingually and placed in market.",
    path: "/brands",
    locale,
  });
}

export default async function BrandsPage({ params }: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: "Our Brands", path: "/brands" }]}
        title="We don’t only move brands. We"
        highlight="build them"
        lead="Two brands owned and developed by HMH: specified, manufactured under contract, packaged bilingually and placed in market."
      >
        <div className="mt-8"><Quote text={company.mission} caption="HMH mission statement" size="md" /></div>
      </PageIntro>
      <BoonPanel />
      <AbuKooraPanel />
      <ContactBand />
    </Shell>
  );
}
