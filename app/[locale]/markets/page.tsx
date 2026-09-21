import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { Breadcrumbs } from "@/components/Page";
import { ContactBand, MarketsBlock } from "@/components/Sections";
import { pageMeta } from "@/lib/seo";
import { translate } from "@/lib/copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/markets">) {
  const { locale } = await params;
  const tr = translate(locale);
  return pageMeta({
    title: tr("Markets We Serve"),
    description: tr("HMH trades from Dubai into the GCC, MENA, CIS and Africa, and into the Australian continent."),
    path: "/markets",
    locale,
    image: "/images/dubai.jpg",
  });
}

export default async function MarketsPage({ params }: PageProps<"/[locale]/markets">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = translate(locale);
  return (
    <Shell>
      <Breadcrumbs items={[{ name: tr("Markets"), path: "/markets" }]} />
      <div className="h-8 bg-white" />
      <MarketsBlock titleAs="h1" />
      <ContactBand />
    </Shell>
  );
}
