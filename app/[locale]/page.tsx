import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shell } from "@/components/Shell";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Arrow } from "@/components/Icons";
import {
  AbuKooraPanel, BoonPanel, CapabilityGrid, CategoryMosaic, ContactBand, Flow, Hl,
  LogoWall, MarketsBlock, PrivateLabelSection, Quote, Reasons, SectionHead,
} from "@/components/Sections";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

const SLIDES = [
  { src: "/images/hero-1.jpg", alt: "Container vessel alongside a terminal berth at dusk", label: "IMPORT · EXPORT · DUBAI TERMINAL" },
  { src: "/images/hero-2.jpg", alt: "Aerial view of a container storage yard", label: "GLOBAL SOURCING · CONTAINER YARD" },
  { src: "/images/hero-3.jpg", alt: "Deck of a loaded container vessel at sunset", label: "OCEAN FREIGHT · CROSS TRADING" },
];

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return {
    ...pageMeta({ title: "From origin to every market", description: company.description, path: "/", locale }),
    title: { absolute: "HMH General Trading — From origin to every market" },
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Shell overlay>
      <HeroCarousel slides={SLIDES}>
        <div className="max-w-[830px]">
          <h1 data-rise className="t-display text-paper-bright">From origin to <Hl tone="gold">every market</Hl></h1>
          <p data-rise className="mt-6 max-w-[540px] text-[15.5px] font-light leading-[1.66] text-paper/85 lg:mt-[30px] lg:text-[17px]" style={{ transitionDelay: ".12s" }}>
            {company.description}
          </p>
          <div data-rise className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-[14px] lg:mt-[42px]" style={{ transitionDelay: ".24s" }}>
            <Link href="/products" className="btn btn-gold">Explore What We Trade <Arrow /></Link>
            <Link href="/partner-with-us" className="btn btn-ghost">Partner With HMH</Link>
          </div>
        </div>
      </HeroCarousel>

      {/* About */}
      <section id="about" className="bg-white pt-20 lg:pt-[118px]">
        <div className="wrap">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-6">
            <h2 data-reveal className="t-h2 lg:col-span-7 lg:text-[54px]">
              A Dubai trading house built on quality products and <Hl>reliable service</Hl>
            </h2>
            <div className="pb-[6px] lg:col-span-5 lg:col-start-8" style={{ transitionDelay: ".1s" }}>
              <Quote text={company.mission} caption="HMH mission statement" />
            </div>
          </div>
          <div data-reveal className="tile relative mt-[52px] h-[260px] bg-ink md:h-[340px] lg:h-[398px]">
            <Image src="/images/about-wide.jpg" alt="Container vessel seen from directly above on open water" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
            <p data-reveal className="m-0 text-[12.5px] font-medium leading-[1.6] text-gold-deep md:col-span-3">
              Cross-trading: shipments routed origin to destination, whether or not they transit the UAE.
            </p>
            <p data-reveal className="m-0 text-[15px] font-light leading-[1.76] text-body md:col-span-4" style={{ transitionDelay: ".06s" }}>
              One of the pioneers in trading for food and non-food products, HMH serves customers and brand owners across the GCC, MENA, CIS and African markets, with a professional team, competitive pricing and a portfolio spanning FMCG and branded goods.
            </p>
            <p data-reveal className="m-0 text-[15px] font-light leading-[1.76] text-body md:col-span-4" style={{ transitionDelay: ".12s" }}>
              As trade has shifted, so have we. Import and export, cross-trading, wholesale distribution and private labelling now sit alongside one another: one company, one point of accountability, from sourcing through to shelf.
            </p>
          </div>
        </div>
        <div id="capabilities" className="wrap mt-24 scroll-mt-24"><CapabilityGrid /></div>
      </section>

      <Flow />

      {/* What we trade */}
      <section id="products" className="bg-white pb-20 pt-4 lg:pb-32 lg:pt-6">
        <div className="wrap">
          <SectionHead
            title={<>Thirteen categories, food and <Hl>non-food</Hl></>}
            aside={
              <>
                <p className="m-0">Traded in container loads against specification, origin and Incoterm. Prices are quoted on enquiry, never listed.</p>
                <Link href="/request-a-quote" className="mt-4 inline-flex items-center gap-[9px] border-b border-gold-deep/40 pb-[3px] text-[13px] font-semibold text-gold-deep">
                  Request a quote <Arrow />
                </Link>
              </>
            }
          />
          <CategoryMosaic />
        </div>
      </section>

      <MarketsBlock />

      {/* Our brands */}
      <section id="brands" className="bg-white pt-20 lg:pt-[122px]">
        <div className="wrap mb-14">
          <SectionHead
            title={<>We don&rsquo;t only move brands. We <Hl>build them</Hl></>}
            aside="Brands owned and developed by HMH: specified, packaged bilingually and placed in market."
          />
          <div className="mt-12"><LogoWall /></div>
        </div>
        <BoonPanel />
        <AbuKooraPanel />
      </section>

      <PrivateLabelSection />
      <Reasons />
      <ContactBand />
    </Shell>
  );
}
