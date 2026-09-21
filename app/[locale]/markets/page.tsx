import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { Breadcrumbs } from "@/components/Page";
import { ContactBand, MarketsBlock } from "@/components/Sections";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/markets">) {
  const { locale } = await params;
  return pageMeta({
    title: "Markets We Serve",
    description: "HMH trades from Dubai into the GCC, MENA, CIS and Africa, and into the Australian continent.",
    path: "/markets",
    locale,
    image: "/images/dubai.jpg",
  });
}

export default async function MarketsPage({ params }: PageProps<"/[locale]/markets">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <Breadcrumbs items={[{ name: "Markets", path: "/markets" }]} />
      <div className="h-8 bg-white" />
      <MarketsBlock titleAs="h1" />
      <ContactBand />
    </Shell>
  );
}
