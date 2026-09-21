import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { Legal } from "@/components/Legal";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  return pageMeta({ title: "Terms of Use", description: "Terms for using the HMH General Trading website.", path: "/terms", locale });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <Legal name="Terms of Use" path="/terms" sections={[
        ["About this site", `This website presents the business of ${company.legalName}. It is for information and enquiries only; nothing is sold through it.`],
        ["No offer", "Product and category information describes what we trade. It is not an offer to sell. Prices, quantities, terms and availability are agreed only in a written quotation."],
        ["Accuracy", "We take care to keep information accurate. Product details are taken from pack artwork; always check the pack in market for current declarations."],
        ["Trademarks", "Boon and Abu Koora are brands of HMH General Trading LLC. Other names and marks shown in photography belong to their owners."],
        ["Contact", `Questions about these terms can be sent to ${company.email}.`],
      ]} />
    </Shell>
  );
}
