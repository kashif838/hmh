import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { FormPage } from "@/components/FormPage";
import { pageMeta } from "@/lib/seo";
import { translate } from "@/lib/copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const tr = translate(locale);
  return pageMeta({ title: tr("Contact"), description: tr("Contact HMH General Trading LLC in Dubai: +971 55 771 6732, hmhdubai26@gmail.com."), path: "/contact", locale });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = translate(locale);
  return (
    <Shell>
      <FormPage
        kind="contact"
        path="/contact"
        name={tr("Contact")}
        title={tr("Talk to")}
        highlight={tr("HMH")}
        lead={tr("For quotations, partnerships or anything else, write to us here or call the Dubai office directly.")}
      />
    </Shell>
  );
}
