import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shell } from "@/components/Shell";
import { PageIntro, ProductCard } from "@/components/Page";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Hl } from "@/components/Sections";
import { categories, getCategory } from "@/content/categories";
import { productsIn } from "@/content/products";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[category]">) {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return pageMeta({ title: c.name, description: `${c.intro} Traded by HMH General Trading LLC from Dubai.`, path: `/products/${c.slug}`, locale, image: c.image?.src });
}

export default async function CategoryPage({ params }: PageProps<"/[locale]/products/[category]">) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const c = getCategory(category);
  if (!c) notFound();
  const own = productsIn(c.slug);
  const siblings = categories.filter((x) => x.group === c.group && x.slug !== c.slug);

  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: "Products", path: "/products" }, { name: c.name, path: `/products/${c.slug}` }]}
        title={c.name}
        lead={c.intro}
        image={c.image}
      >
        <a href="#rfq" className="btn btn-dark mt-7">Request a Quote</a>
      </PageIntro>

      <section className="bg-white pb-20 lg:pb-28">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 data-reveal className="t-h2-sm lg:col-span-4">What we trade</h2>
          <ul data-reveal className="m-0 list-none border-b border-ink-3/11 p-0 lg:col-span-8">
            {c.items.map((it) => (
              <li key={it} className="flex items-center justify-between gap-6 border-t border-ink-3/11 py-[18px]">
                <span className="text-[17px] font-medium tracking-[-0.015em]">{it}</span>
                <span className="text-[13px] font-light text-muted">Quoted per order</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {own.length > 0 && (
        <section className="bg-off-white py-20 lg:py-[100px]">
          <div className="wrap">
            <h2 data-reveal className="t-h2-sm">HMH own-brand <Hl>products</Hl></h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {own.map((p) => (
                <ProductCard key={p.slug} href={`/products/${c.slug}/${p.slug}`} image={p.cutout} contain tag={p.brand === "boon" ? "Boon" : "Abu Koora"} name={p.name} meta={p.facts[0][1]} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="rfq" className="scroll-mt-6 bg-white py-20 lg:py-28">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div data-reveal className="lg:col-span-5 lg:pe-10">
            <h2 className="t-h2-sm">Request a <Hl>quotation</Hl></h2>
            <p className="mt-5 text-[14.5px] font-light leading-[1.74] text-body">
              Send the product, the volume, the destination and the Incoterm you trade on. Pricing, minimum order and lead time are confirmed on every quotation.
            </p>
            <h3 className="t-label mt-12 text-gold-deep">Other {c.group === "food" ? "food" : "non-food"} categories</h3>
            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {siblings.map((s) => (
                <li key={s.slug}><Link href={`/products/${s.slug}`} className="inline-flex border border-ink-3/20 px-[13px] py-[7px] text-[12.5px] font-medium hover:border-ink-3">{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6"><EnquiryForm kind="quote" category={c.name} /></div>
        </div>
      </section>
    </Shell>
  );
}
