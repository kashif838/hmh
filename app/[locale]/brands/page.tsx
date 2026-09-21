import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { PageIntro } from "@/components/Page";
import { AbuKooraPanel, BoonPanel, ContactBand, LogoWall, Quote } from "@/components/Sections";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/brands">) {
  const { locale } = await params;
  return pageMeta({
    title: "Our Brands",
    description: "Bonfood, Baba Cook, Boon and Abu Koora: brands owned and developed by HMH General Trading, specified, packaged bilingually and placed in market.",
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
        lead="Brands owned and developed by HMH: specified, packaged bilingually and placed in market."
      >
        <div className="mt-8"><Quote text={company.mission} caption="HMH mission statement" size="md" /></div>
      </PageIntro>
      <div className="wrap -mt-6 mb-16 lg:mb-24"><LogoWall /></div>
      <BoonPanel />
      <AbuKooraPanel />
      <ContactBand />
    </Shell>
  );
}
