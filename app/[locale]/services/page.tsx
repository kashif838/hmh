import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shell } from "@/components/Shell";
import { PageIntro } from "@/components/Page";
import { Arrow } from "@/components/Icons";
import { CapabilityGrid, ContactBand, Flow } from "@/components/Sections";
import { servicePages } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  return pageMeta({
    title: "What We Do",
    description: "Import, export, cross trading, wholesale and distribution, private label and global sourcing: food and non-food FMCG from Dubai.",
    path: "/services",
    locale,
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: "What We Do", path: "/services" }]}
        title="Import, export and distribution, with"
        highlight="brands we build"
        lead="HMH is an importer, exporter, wholesaler and distributor of food and non-food products, a cross-trader, and a private-label developer. One company, one point of accountability."
      />
      <section className="bg-white pb-20 lg:pb-28">
        <div className="wrap">
          <CapabilityGrid />
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
            <h2 data-reveal className="t-h2-sm lg:col-span-4">Global sourcing</h2>
            <p data-reveal className="t-lead m-0 text-body lg:col-span-7 lg:col-start-6">
              Every trade starts with the right supplier. HMH finds, qualifies and buys from manufacturers against the specification and the price the destination market will bear, then carries the goods through import, export or cross-trade to the customer.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-px border border-ink-3/13 bg-ink-3/13 md:grid-cols-3">
            {servicePages.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-reveal className="cap group flex flex-col justify-between gap-10 bg-white p-8 lg:p-10">
                <span>
                  <h3 className="text-[24px] tracking-[-0.026em]">{s.title}</h3>
                  <p className="mt-3 text-[13.5px] font-light leading-[1.7] text-muted">{s.intro}</p>
                </span>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold-deep">In detail <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Flow />
      <ContactBand />
    </Shell>
  );
}
