import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shell } from "@/components/Shell";
import { Breadcrumbs, ProductCard } from "@/components/Page";
import { ProductGallery } from "@/components/ProductGallery";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Arrow, Icon } from "@/components/Icons";
import { Hl } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { getProduct, products, productsOf } from "@/content/products";
import { getCategory } from "@/content/categories";
import { getBrand } from "@/content/brands";
import { company } from "@/content/company";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, product: p.slug }));
}

async function load(params: PageProps<"/[locale]/products/[category]/[product]">["params"]) {
  const { locale, category, product } = await params;
  const p = getProduct(product);
  const c = getCategory(category);
  if (!p || !c || p.category !== c.slug) notFound();
  return { locale, p, c, brand: getBrand(p.brand)! };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[category]/[product]">) {
  const { locale, p, c } = await load(params);
  return pageMeta({
    title: p.name,
    description: p.lead,
    path: `/products/${c.slug}/${p.slug}`,
    locale,
    image: p.gallery[0]?.src,
  });
}

const TERMS = [
  { icon: "moq", title: "Minimum order", body: "Quoted per order" },
  { icon: "box", title: "Container loading", body: "Confirmed on quotation" },
  { icon: "clock", title: "Lead time", body: "Confirmed on quotation" },
  { icon: "doc", title: "Incoterms", body: "Quoted to the term you trade on" },
] as const;

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[category]/[product]">) {
  const { locale, p, c, brand } = await load(params);
  setRequestLocale(locale);

  const range = productsOf(p.brand);
  // Three products (same range first, then the other brand), then this product's category.
  const siblings = range.filter((x) => x.slug !== p.slug && x.cutout).slice(0, 2);
  const others = products.filter((x) => x.brand !== p.brand && x.cutout);
  const related = [
    ...[...siblings, ...others].slice(0, 3).map((x) => ({ href: `/products/${x.category}/${x.slug}`, image: x.cutout, contain: true, tag: "Product", name: x.name, meta: `${getCategory(x.category)!.name} · HMH own brand` })),
    { href: `/products/${c.slug}`, image: c.image?.src, contain: false, tag: "Category", name: c.name, meta: "Browse the category" },
  ];

  return (
    <Shell>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.lead,
        category: c.name,
        brand: { "@type": "Brand", name: brand.name },
        manufacturer: { "@type": "Organization", name: company.legalName },
        ...(p.gallery.length && { image: p.gallery.map((g) => `${company.url}${g.src}`) }),
      }} />
      <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: c.name, path: `/products/${c.slug}` }, { name: p.name, path: `/products/${c.slug}/${p.slug}` }]} />

      {/* Hero */}
      <section className="bg-white pb-20 pt-7 lg:pb-28">
        <div className="wrap grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-7">
            <ProductGallery images={p.gallery} brand={brand.name} name={p.shortName} />
          </div>
          <div data-reveal className="lg:col-span-5 lg:ps-[26px]" style={{ transitionDelay: ".08s" }}>
            <h1 className="t-h1">{p.name}</h1>
            <p className="mt-4 flex flex-wrap items-center gap-[10px] text-[13px] text-muted">
              <Link href={`/brands/${brand.slug}`} className="font-semibold text-gold-deep hover:text-ink-3">{brand.name}</Link>
              <span className="opacity-50">&middot;</span><span>HMH own brand</span>
              <span className="opacity-50">&middot;</span><Link href={`/products/${c.slug}`} className="hover:text-ink-3">{c.name}</Link>
            </p>
            {p.nameAr && <p lang="ar" dir="rtl" className="mt-3 font-[family-name:var(--font-arabic)] text-[17px] text-body">{p.nameAr}</p>}
            {p.tagline && <p className="mt-5 text-[18px] tracking-[-0.02em] text-gold-deep">{p.tagline}</p>}
            <p className="mt-6 text-[16px] font-light leading-[1.72] text-body">{p.lead}</p>
            <dl className="mt-[30px] border-b border-ink-3/11">
              {p.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-4 border-t border-ink-3/11 py-[14px] sm:grid-cols-[168px_1fr]">
                  <dt className="text-[13px] font-light text-muted">{k}</dt>
                  <dd className="m-0 text-[14px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {p.allergens && (
              <div className="mt-[26px]">
                <p className="mb-[11px] text-[12.5px] font-medium">Contains</p>
                <div className="flex flex-wrap gap-2">{p.allergens.map((a) => <span key={a} className="chip">{a}</span>)}</div>
              </div>
            )}
            <div className="mt-[34px] flex flex-wrap gap-3">
              <a href="#rfq" className="btn btn-gold">Request a Quote <Arrow /></a>
              <Link href="/partner-with-us" className="btn btn-line">Become a Distributor</Link>
            </div>
            <p className="mt-[22px] flex items-start gap-[11px] text-[12.5px] font-light leading-[1.6] text-muted">
              <span className="mt-px shrink-0 text-gold-deep"><Icon name="doc" size={22} /></span>
              Pricing, minimum order and Incoterms are quoted per order, never listed.
            </p>
          </div>
        </div>
      </section>

      {/* Specification */}
      <section className="bg-white pb-20 lg:pb-[116px]">
        <div className="wrap">
          <div className="mb-16 h-px bg-ink-3/13 lg:mb-24" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-4">
              <h2 className="t-h2-sm">Specification</h2>
              <p className="mt-[18px] max-w-[330px] text-[14px] font-light leading-[1.72] text-muted">Taken from the product&rsquo;s pack artwork.</p>
            </div>
            <dl data-reveal className="m-0 border-b border-ink-3/11 lg:col-span-8">
              {p.spec.map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-t border-ink-3/11 py-[17px] sm:grid-cols-[230px_1fr] sm:gap-6">
                  <dt className="text-[13.5px] font-light text-muted">{k}</dt>
                  <dd className="m-0 text-[14.5px] font-medium" {...(/[؀-ۿ]/.test(v) && { lang: "ar", dir: "rtl" })}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      {p.ingredients && (
        <section className="bg-off-white py-20 lg:py-[100px]">
          <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
            <h2 data-reveal className="t-h2-sm lg:col-span-4">Ingredients &amp; allergens</h2>
            <div data-reveal className="lg:col-span-8">
              <p className="m-0 max-w-[680px] text-[16px] font-light leading-[1.78] text-[#26272a] lg:text-[17px]">{p.ingredients}</p>
              {p.allergens && (
                <div className="mt-[30px] flex flex-wrap items-center gap-[10px]">
                  <span className="me-[6px] text-[12.5px] font-semibold">Allergens</span>
                  {p.allergens.map((a) => <span key={a} className="chip">{a}</span>)}
                </div>
              )}
              <p className="mt-[22px] text-[12.5px] font-light text-muted">As declared on the pack.</p>
            </div>
          </div>
        </section>
      )}

      {/* Module: bilingual packs or the range */}
      {p.module === "bilingual" ? (
        <section className="bg-ink-2 py-20 text-paper lg:py-[104px]">
          <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
            <div data-reveal className="lg:col-span-4">
              <h2 className="t-h2-sm text-paper-bright">One product, <Hl tone="gold">two languages</Hl></h2>
              <p className="mt-5 text-[14.5px] font-light leading-[1.74] text-paper/72">
                Separate English and Arabic cartons rather than one crowded dual-language face. Each market gets a pack that reads natively, with compliant declarations and a retail barcode on both.
              </p>
            </div>
            <div data-reveal className="grid grid-cols-2 gap-5 lg:col-span-7 lg:col-start-6 lg:gap-7">
              {[["/images/abukoora-en.png", "English pack"], ["/images/abukoora-ar.png", "Arabic pack"]].map(([src, label]) => (
                <figure key={src} className="m-0 text-center">
                  <Image src={src} alt={`Abu Koora ${label.toLowerCase()}`} width={808} height={860} sizes="(min-width:1024px) 28vw, 50vw" className="h-auto w-full" />
                  <figcaption className="t-label mt-4 text-gold">{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-ink-2 pb-[92px] pt-20 text-paper lg:pt-[100px]">
          <div className="wrap">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-[60px]">
              <h2 data-reveal className="t-h2-sm text-paper-bright">The {brand.name} <Hl tone="gold">range</Hl></h2>
              <p data-reveal className="m-0 max-w-[420px] text-[14px] font-light leading-[1.72] text-paper/70">
                Ten varieties in the same single-serve cup format. Order one, or build a mixed range for a retail, office or catering account.
              </p>
            </div>
            <div data-reveal className="-mx-5 mt-[62px] flex items-end gap-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:justify-between lg:gap-[10px] lg:overflow-visible lg:px-[10px]">
              {range.filter((x) => x.cutout).map((x) => {
                const cur = x.slug === p.slug;
                return (
                  <Link key={x.slug} href={`/products/${x.category}/${x.slug}`} aria-current={cur ? "page" : undefined}
                    className={`flex shrink-0 flex-col items-center gap-[13px] transition-opacity hover:opacity-100 ${cur ? "" : "opacity-60"}`}>
                    <Image src={x.cutout!} alt={x.name} width={280} height={356} sizes="170px" className={`w-auto transition-transform duration-500 hover:-translate-y-2 ${cur ? "h-[180px] lg:h-[214px]" : "h-[150px] lg:h-[176px]"}`} />
                    <span className={`text-center text-[12.5px] ${cur ? "font-semibold text-paper-bright" : "font-light text-paper/80"}`}>
                      {x.shortName}
                      <span className={`mx-auto mt-3 block h-[2px] w-[34px] ${cur ? "bg-gold" : ""}`} />
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-[34px] h-px bg-paper/14" />
            <p className="mt-[18px] flex flex-wrap items-center gap-[10px] text-[12.5px] font-light text-paper/60">
              <span className="font-semibold text-paper/85">Also in the range</span>
              {range.filter((x) => !x.cutout).map((x, i) => (
                <span key={x.slug} className="flex items-center gap-[10px]">
                  {i > 0 && <span className="opacity-40">&middot;</span>}
                  <Link href={`/products/${x.category}/${x.slug}`} aria-current={x.slug === p.slug ? "page" : undefined} className="hover:text-gold-light aria-[current=page]:text-gold">{x.shortName}</Link>
                </span>
              ))}
            </p>
          </div>
        </section>
      )}

      {/* Request a quotation */}
      <section id="rfq" className="scroll-mt-6 bg-white py-20 lg:py-28">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-5 lg:pe-10">
            <h2 className="t-h2-sm">Request a <Hl>quotation</Hl></h2>
            <p className="mt-5 text-[14.5px] font-light leading-[1.74] text-body">
              Tell us the volume, the destination and the Incoterm you trade on. We come back with a quotation for this product, not a brochure.
            </p>
            <div className="mt-9 border-b border-ink-3/11">
              {TERMS.map((t) => (
                <div key={t.title} className="flex items-start gap-4 border-t border-ink-3/11 py-[18px]">
                  <span className="shrink-0 text-gold-deep"><Icon name={t.icon} size={22} /></span>
                  <span>
                    <span className="block text-[14.5px] font-semibold">{t.title}</span>
                    <span className="mt-[3px] block text-[13px] font-light text-muted">{t.body}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[34px]">
              <p className="m-0 text-[12.5px] font-medium text-muted">Prefer to talk it through?</p>
              <p className="mt-[10px]"><a href={company.phoneHref} dir="ltr" className="text-[22px] font-semibold tracking-[-0.024em] hover:text-gold-deep">{company.phone}</a></p>
              <p className="mt-[6px]"><a href={`mailto:${company.email}`} className="text-[14px] text-gold-deep hover:text-ink-3">{company.email}</a></p>
            </div>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6"><EnquiryForm kind="quote" product={p.name} category={c.name} /></div>
        </div>
      </section>

      {/* More from HMH */}
      <section className="bg-white pb-20 lg:pb-[118px]">
        <div className="wrap">
          <div className="mb-16 h-px bg-ink-3/13 lg:mb-[92px]" />
          <h2 data-reveal className="t-h2-sm">More from HMH</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.href} {...r} />)}
          </div>
        </div>
      </section>
    </Shell>
  );
}
