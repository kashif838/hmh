import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { FormPage } from "@/components/FormPage";
import { pageMeta } from "@/lib/seo";

const TYPES = [
  ["Distribution", "Your brand into GCC, MENA, CIS and African channels through HMH."],
  ["Agency", "HMH representing your brand in the markets we trade."],
  ["Private label", "Product developed and packed under your name, or ours."],
  ["Sourcing", "HMH finding and buying the product you need, from origin to your port."],
];

export async function generateMetadata({ params }: PageProps<"/[locale]/partner-with-us">) {
  const { locale } = await params;
  return pageMeta({ title: "Partner With Us", description: "Brand owners and manufacturers: partner with HMH General Trading for distribution, agency, private label or sourcing across the GCC, MENA, CIS and Africa.", path: "/partner-with-us", locale });
}

export default async function PartnerPage({ params }: PageProps<"/[locale]/partner-with-us">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <FormPage
        kind="partner"
        path="/partner-with-us"
        name="Partner With Us"
        title="Partner with"
        highlight="HMH"
        lead="HMH works with brand owners and manufacturers as well as buyers. Tell us about your brand and the kind of partnership you have in mind."
        aside={
          <dl data-reveal className="mt-8 border-b border-ink-3/11">
            {TYPES.map(([t, b]) => (
              <div key={t} className="border-t border-ink-3/11 py-4">
                <dt className="text-[14.5px] font-semibold">{t}</dt>
                <dd className="m-0 mt-1 text-[13px] font-light leading-[1.6] text-muted">{b}</dd>
              </div>
            ))}
          </dl>
        }
      />
    </Shell>
  );
}
