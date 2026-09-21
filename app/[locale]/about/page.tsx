import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { PageIntro } from "@/components/Page";
import { CapabilityGrid, ContactBand, Hl, Quote, Reasons } from "@/components/Sections";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";
import { translate } from "@/lib/copy";

// Every line in FACTS is paraphrased tightly from HMH's company introduction letter.
const FACTS: [string, string][] = [
  ["Company", "HMH General Trading LLC, based in Dubai, UAE"],
  ["What we are", "One of the pioneers in trading for food and non-food products"],
  ["Activities", "Import, export, cross trading, wholesale, distribution and private labelling"],
  ["Markets", "GCC, MENA, CIS and Africa, and the Australian continent"],
  ["Portfolio", "FMCG and branded products in the food and non-food segments"],
  ["Food lines", "Dairy, agro commodities, grain, biscuits and confectionery, tuna, mineral water, spices"],
  ["Non-food lines", "Bulk and retail distribution of cosmetics, chemical products and industrial products"],
  ["Objective", "Quality products and reliable service to our customers and brand owners"],
];

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const tr = translate(locale);
  return pageMeta({
    title: tr("About"),
    description: tr("HMH General Trading LLC is a Dubai-based trading house for food and non-food products, serving customers and brand owners across the GCC, MENA, CIS and Africa."),
    path: "/about",
    locale,
    image: "/images/about-wide.jpg",
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = translate(locale);
  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: tr("About"), path: "/about" }]}
        title={tr("A Dubai trading house built on quality products and")}
        highlight={tr("reliable service")}
        lead={tr("HMH serves customers and brand owners across the GCC, MENA, CIS and African markets, with a professional team, competitive pricing and a portfolio spanning FMCG and branded goods.")}
        image={{ src: "/images/about-wide.jpg", alt: tr("Container vessel seen from directly above on open water") }}
      />

      <section className="bg-white pb-20 lg:pb-28">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 data-reveal className="t-h2-sm lg:col-span-4">{tr("The company")} <Hl>{tr("at a glance")}</Hl></h2>
          <dl data-reveal className="m-0 border-b border-ink-3/11 lg:col-span-8">
            {FACTS.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 gap-1 border-t border-ink-3/11 py-[17px] sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-[13.5px] font-light text-muted">{tr(k)}</dt>
                <dd className="m-0 text-[15px] font-medium leading-[1.55]">{tr(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-off-white py-20 lg:py-[100px]">
        <div className="wrap grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
          <Quote text={tr(company.mission)} caption={tr("HMH mission statement")} />
          <Quote text={tr(company.vision)} caption={tr("HMH vision statement")} />
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="wrap">
          <h2 data-reveal className="t-h2-sm mb-10">{tr("What we")} <Hl>{tr("do")}</Hl></h2>
          <CapabilityGrid />
        </div>
      </section>

      <Reasons />
      <ContactBand />
    </Shell>
  );
}
