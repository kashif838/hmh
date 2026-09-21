import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Shell } from "@/components/Shell";
import { Breadcrumbs, ProductCard } from "@/components/Page";
import { AbuKooraPanel, BoonPanel, ContactBand, Hl } from "@/components/Sections";
import { brands, getBrand } from "@/content/brands";
import { productsOf } from "@/content/products";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/brands/[brand]">) {
  const { locale, brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  return pageMeta({ title: `${b.name}, an HMH brand`, description: b.summary, path: `/brands/${b.slug}`, locale, image: b.slug === "boon" ? "/images/boon-range.png" : "/images/abukoora-en.png" });
}

export default async function BrandPage({ params }: PageProps<"/[locale]/brands/[brand]">) {
  const { locale, brand } = await params;
  setRequestLocale(locale);
  const b = getBrand(brand);
  if (!b) notFound();
  const items = productsOf(b.slug);

  return (
    <Shell>
      <Breadcrumbs items={[{ name: "Our Brands", path: "/brands" }, { name: b.name, path: `/brands/${b.slug}` }]} />
      <section className="bg-white pb-14 pt-10 lg:pt-14">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
          <h1 data-reveal className="t-h2 lg:col-span-7 lg:text-[54px]">{b.name} <Hl>{b.tagline.replace(/\.$/, "")}</Hl></h1>
          <div data-reveal className="lg:col-span-5 lg:col-start-8">
            {b.story.map((s) => <p key={s} className="t-lead m-0 mb-4 text-body last:mb-0">{s}</p>)}
          </div>
        </div>
      </section>

      {b.slug === "boon" ? <BoonPanel /> : <AbuKooraPanel />}

      <section className="bg-white py-20 lg:py-28">
        <div className="wrap">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 data-reveal className="t-h2-sm">{items.length > 1 ? <>The {b.name} <Hl>range</Hl></> : <>The <Hl>product</Hl></>}</h2>
            <Link data-reveal href="/partner-with-us" className="btn btn-dark">Become a Distributor</Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.slug} href={`/products/${p.category}/${p.slug}`} image={p.cutout} contain tag={p.nameAr ?? b.name} name={p.shortName} meta={p.facts[0][1]} />
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </Shell>
  );
}
