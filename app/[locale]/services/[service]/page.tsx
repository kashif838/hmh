import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { PageIntro } from "@/components/Page";
import { EnquiryForm } from "@/components/EnquiryForm";
import { AbuKooraPanel, Hl, PrivateLabelSteps } from "@/components/Sections";
import { getServicePage, servicePages } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[service]">) {
  const { locale, service } = await params;
  const s = getServicePage(service);
  if (!s) notFound();
  return pageMeta({ title: s.title, description: s.intro, path: `/services/${s.slug}`, locale, image: s.image.src });
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[service]">) {
  const { locale, service } = await params;
  setRequestLocale(locale);
  const s = getServicePage(service);
  if (!s) notFound();

  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: "What We Do", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]}
        title={s.heading}
        highlight={s.highlight}
        lead={s.intro}
        image={s.image}
      />
      <section className="bg-white pb-20 lg:pb-28">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 data-reveal className="t-h2-sm lg:col-span-4">How it works</h2>
          <div className="border-b border-ink-3/11 lg:col-span-8">
            {s.sections.map((sec, i) => (
              <div key={sec.title} data-reveal className="grid grid-cols-1 gap-2 border-t border-ink-3/11 py-7 sm:grid-cols-[230px_1fr] sm:gap-6" style={{ transitionDelay: `${i * 0.05}s` }}>
                <h3 className="text-[19px] tracking-[-0.022em]">{sec.title}</h3>
                <p className="m-0 text-[14.5px] font-light leading-[1.72] text-body">{sec.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {s.slug === "private-label" && (
        <>
          <section className="bg-ink py-20 lg:py-[110px]">
            <div className="wrap mb-14">
              <h2 data-reveal className="t-h2 text-paper-bright">Five steps, <Hl tone="gold">concept to carton</Hl></h2>
            </div>
            <PrivateLabelSteps />
          </section>
          <section className="bg-white pt-20 lg:pt-28">
            <div className="wrap mb-12"><h2 data-reveal className="t-h2-sm">Case study: <Hl>Abu Koora</Hl></h2></div>
            <AbuKooraPanel />
          </section>
        </>
      )}

      <section id="rfq" className="bg-white py-20 lg:py-28">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-5 lg:pe-10">
            <h2 className="t-h2-sm">Start a <Hl>conversation</Hl></h2>
            <p className="mt-5 text-[14.5px] font-light leading-[1.74] text-body">
              {s.slug === "private-label"
                ? "Tell us the product, the market and the volume. Tick private label and we will come back with how we would build it."
                : "Tell us what you need moved, where from and where to. We come back with a quotation, not a brochure."}
            </p>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6"><EnquiryForm kind="quote" /></div>
        </div>
      </section>
    </Shell>
  );
}
