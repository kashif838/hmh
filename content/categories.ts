import { z } from "zod";
import { CategorySchema } from "./schema";

// Category list and sub-products come from HMH's product list and introduction letter.
// Array order is the homepage mosaic order.
export const categories = z.array(CategorySchema).parse([
  {
    slug: "dairy", name: "Dairy Products", group: "food", span: 6, tall: true,
    items: ["Milk powder", "Evaporated milk", "Juices"],
    intro: "Milk powder, evaporated milk and juices for importers, wholesalers and distributors.",
    image: { src: "/images/cat-dairy.jpg", alt: "Milk powder measured from a scoop beside a bottle" },
  },
  {
    slug: "grains-commodities", name: "Grains & Commodities", group: "food", span: 3, tall: true,
    items: ["Rice", "Wheat", "Wheat flour", "Pulses"],
    intro: "Agro commodities and grain: rice, wheat, wheat flour and pulses.",
    image: { src: "/images/cat-grains.jpg", alt: "Loose grain in close detail" },
  },
  {
    slug: "spices", name: "Spices", group: "food", span: 3, tall: true,
    items: ["Whole", "Ground", "Blends"],
    intro: "Spices for wholesale and retail distribution.",
    image: { src: "/images/cat-spices.jpg", alt: "Bulk spices displayed in open containers" },
  },
  {
    slug: "oils-fats", name: "Oils & Fats", group: "food", span: 3,
    items: ["Sunflower oil", "Olive oil", "Cooking oil"],
    intro: "Sunflower oil, olive oil and cooking oil.",
    image: { src: "/images/cat-oils.jpg", alt: "Olives in a wooden bowl" },
  },
  {
    slug: "biscuits-confectionery", name: "Biscuits & Confectionery", group: "food", span: 3,
    items: ["Sandwich biscuits", "Bourbon cream", "Wafers"],
    intro: "Sandwich biscuits, bourbon cream and wafers, including HMH's own Abu Koora brand.",
    image: { src: "/images/cat-biscuits.jpg", alt: "Stacked biscuits" },
  },
  {
    slug: "honey", name: "Honey", group: "food", span: 3,
    items: ["Natural honey", "Consumer packs", "Bulk packs"],
    intro: "Natural honey in consumer and bulk packs.",
    image: { src: "/images/cat-honey.jpg", alt: "Honey poured against a dark ground" },
  },
  {
    slug: "beverages", name: "Beverages", group: "food", span: 3,
    items: ["Tea", "Coffee", "Instant drinks"],
    intro: "Tea, coffee and instant drinks, including HMH's own Boon range of single-serve cups.",
    image: { src: "/images/cat-water.jpg", alt: "Bottles moving along a beverage line" },
  },
  {
    slug: "agricultural-produce", name: "Agricultural Produce", group: "food", span: 4,
    items: ["Fruits", "Vegetables"],
    intro: "Agricultural products: fruits and vegetables.",
    image: { src: "/images/cat-agri.jpg", alt: "Fresh produce in market crates" },
  },
  {
    slug: "canned-foods", name: "Canned Foods", group: "food", span: 4,
    items: ["Canned tuna", "Canned chicken", "Canned beans"],
    intro: "Canned tuna, canned chicken and canned beans.",
    image: { src: "/images/cat-canned-tins.jpg", alt: "Unlabelled food tins seen from above" },
  },
  {
    slug: "mineral-water", name: "Mineral Water", group: "food", span: 4,
    items: ["Consumer packs", "Bulk"],
    intro: "Mineral water for wholesale and retail distribution.",
    image: { src: "/images/cat-mineral-water.jpg", alt: "Water poured from a bottle into a glass" },
  },
  {
    slug: "cosmetics-personal-care", name: "Cosmetics & Personal Care", group: "non-food", span: 4,
    items: ["Bulk distribution", "Retail distribution"],
    intro: "Cosmetics, in bulk and retail distribution.",
    image: { src: "/images/cat-cosmetics.jpg", alt: "Cosmetic bottles arranged in a graded row" },
  },
  {
    slug: "chemicals", name: "Chemical Products", group: "non-food", span: 4,
    items: ["Bulk distribution", "Retail distribution"],
    intro: "Chemical products, in bulk and retail distribution.",
    image: { src: "/images/cat-chemicals.jpg", alt: "Stainless process tanks and pipework" },
  },
  {
    slug: "industrial-products", name: "Industrial Products", group: "non-food", span: 4,
    items: ["Bulk distribution", "Retail distribution"],
    intro: "Industrial products, in bulk and retail distribution.",
    image: { src: "/images/cat-industrial.jpg", alt: "Precision machine tooling and cutters" },
  },
]);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
