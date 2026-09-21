import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { PageIntro, ProductCard } from "@/components/Page";
import { CategoryMosaic, ContactBand, Hl } from "@/components/Sections";
import { products } from "@/content/products";
import { getCategory } from "@/content/categories";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  return pageMeta({
    title: "Products",
    description: "Thirteen categories of food and non-food products traded by HMH General Trading LLC from Dubai: dairy, beverages, oils, biscuits, honey, grains, produce, canned foods, spices, cosmetics, chemicals and industrial products.",
    path: "/products",
    locale,
  });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const own = products.filter((p) => p.cutout);

  return (
    <Shell>
      <PageIntro
        crumbs={[{ name: "Products", path: "/products" }]}
        title="Thirteen categories, food and"
        highlight="non-food"
        lead="Traded in container loads against specification, origin and Incoterm, for importers, wholesalers and distributors. Prices are quoted on enquiry, never listed."
      />
      <section className="bg-white pb-20 lg:pb-28">
        <div className="wrap"><CategoryMosaic /></div>
      </section>
      <section className="bg-off-white py-20 lg:py-[100px]">
        <div className="wrap">
          <h2 data-reveal className="t-h2-sm">HMH own-brand <Hl>products</Hl></h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {own.map((p) => (
              <ProductCard key={p.slug} href={`/products/${p.category}/${p.slug}`} image={p.cutout} contain tag={getCategory(p.category)!.name} name={p.name} meta={p.facts[0][1]} />
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </Shell>
  );
}
