import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { FormPage } from "@/components/FormPage";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return pageMeta({ title: "Contact", description: "Contact HMH General Trading LLC in Dubai: +971 55 771 6733, hmhdubai26@gmail.com.", path: "/contact", locale });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <FormPage
        kind="contact"
        path="/contact"
        name="Contact"
        title="Talk to"
        highlight="HMH"
        lead="For quotations, partnerships or anything else, write to us here or call the Dubai office directly."
      />
    </Shell>
  );
}
