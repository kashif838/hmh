import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { Legal } from "@/components/Legal";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { translate } from "@/lib/copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  const tr = translate(locale);
  return pageMeta({ title: tr("Terms of Use"), description: tr("Terms for using the HMH General Trading website."), path: "/terms", locale });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = translate(locale);
  const sections: [string, string][] = [
    ["About this site", `${tr("This website presents the business of")} ${tr(company.legalName)}. ${tr("It is for information and enquiries only; nothing is sold through it.")}`],
    ["No offer", tr("Product and category information describes what we trade. It is not an offer to sell. Prices, quantities, terms and availability are agreed only in a written quotation.")],
    ["Accuracy", tr("We take care to keep information accurate. Product details are taken from pack artwork; always check the pack in market for current declarations.")],
    ["Trademarks", tr("Boon and Abu Koora are brands of HMH General Trading LLC. Other names and marks shown in photography belong to their owners.")],
    ["Contact", `${tr("Questions about these terms can be sent to")} ${company.email}.`],
  ];
  return (
    <Shell>
      <Legal name={tr("Terms of Use")} path="/terms" sections={sections.map(([h, p]) => [tr(h), p])} />
    </Shell>
  );
}
