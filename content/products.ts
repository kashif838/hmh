import { z } from "zod";
import { ProductSchema, type Product } from "./schema";

// Abu Koora: every value below is printed on the carton.
const abuKoora = {
  slug: "abu-koora-sandwich-biscuits",
  category: "biscuits-confectionery",
  brand: "abu-koora",
  name: "Abu Koora Sandwich Biscuits",
  shortName: "Sandwich Biscuits",
  lead:
    "Sandwich biscuits flavoured with vanilla, milk and custard: an HMH own brand for Arabic-speaking markets, packed in separate English and Arabic cartons.",
  facts: [
    ["Pack format", "Printed retail carton"],
    ["Label languages", "English · Arabic"],
    ["Brand owner", "HMH General Trading LLC"],
  ],
  spec: [
    ["Product", "Sandwich biscuits"],
    ["Brand", "Abu Koora — HMH own brand"],
    ["Category", "Biscuits & Confectionery"],
    ["Pack format", "Printed retail carton"],
    ["Label languages", "English, Arabic"],
    ["Retail barcode", "Printed on pack"],
  ],
  ingredients:
    "Wheat flour, sugar, hydrogenated palm fat, starch, skimmed milk powder, whey powder, salt, leavening agents (E500, E503), citric acid (E330), emulsifier (from soya, E322) and nature-identical flavours (vanilla, milk, custard).",
  allergens: ["Wheat (gluten)", "Milk", "Soya"],
  gallery: [
    { src: "/images/abukoora-en.png", alt: "Abu Koora sandwich biscuits carton, English pack", label: "English pack" },
    { src: "/images/abukoora-ar.png", alt: "Abu Koora sandwich biscuits carton, Arabic pack", label: "Arabic pack" },
    { src: "/images/ak-biscuit.jpg", alt: "Pack artwork detail showing the sandwich biscuits", label: "Artwork detail" },
  ],
  cutout: "/images/abukoora-en.png",
  module: "bilingual",
} satisfies Product;

// Boon: variety names and order from the Boon packaging; Arabic names read off the packshots.
const boonVarieties: {
  slug: string; name: string; nameAr?: string; image?: string; tagline?: string; lead?: string;
}[] = [
  { slug: "lemon-ginger", name: "Lemon & Ginger", nameAr: "ليمون وزنجبيل", image: "boon-lemon-ginger.png" },
  { slug: "wild-thyme", name: "Wild Thyme" },
  { slug: "cumin-lemon", name: "Cumin & Lemon", nameAr: "كمون وليمون", image: "boon-cumin-lemon.png" },
  { slug: "black-tea-cardamom", name: "Black Tea with Cardamom", nameAr: "شاي أسود بالهيل", image: "boon-black-tea.png", tagline: "Bold comfort in every cup." },
  {
    slug: "karak-tea", name: "Karak Tea", nameAr: "شاي كارك", image: "boon-karak.png",
    lead: "Gulf-style karak tea as an instant premix, pre-dosed in its own printed cup. Add hot water, stir and serve. The cup is the pack, labelled in English and Arabic.",
  },
  { slug: "gold-coffee", name: "Gold Coffee", nameAr: "قهوة جولد", image: "boon-gold-coffee.png" },
  { slug: "green-tea", name: "Green Tea", nameAr: "شاي أخضر", image: "boon-green-tea.png", tagline: "Simple. Pure. Green." },
  { slug: "moringa", name: "Moringa", nameAr: "مورينغا", image: "boon-moringa.png" },
  { slug: "chamomile", name: "Chamomile" },
  { slug: "zhourat", name: "Zhourat" },
];

const boon: Product[] = boonVarieties.map((v) => ({
  slug: `boon-${v.slug}`,
  category: "beverages",
  brand: "boon",
  name: `Boon ${v.name}`,
  shortName: v.name,
  nameAr: v.nameAr,
  tagline: v.tagline,
  lead:
    v.lead ??
    `${v.name} as an instant premix, pre-dosed in its own printed cup. Add hot water, stir and serve. The cup is the pack, labelled in English and Arabic.`,
  facts: [
    ["Format", "Single-serve instant cup"],
    ["Label languages", "English · Arabic"],
    ["Range", "One of 10 Boon varieties"],
    ["Brand owner", "HMH General Trading LLC"],
  ],
  spec: [
    ["Product", `${v.name}, instant premix`],
    ["Brand", "Boon — HMH own brand"],
    ["Category", "Beverages"],
    ["Format", "Single-serve printed paper cup"],
    ["Preparation", "Add hot water, stir, serve"],
    ["Label languages", "English, Arabic"],
    ...(v.nameAr ? ([["Name on pack (Arabic)", v.nameAr]] as [string, string][]) : []),
  ],
  gallery: v.image
    ? [
        { src: `/images/${v.image}`, alt: `Boon ${v.name} single-serve cup`, label: `${v.name} cup` },
        { src: "/images/boon-range.png", alt: "The Boon instant cup range lined up", label: "The Boon range" },
      ]
    : [],
  cutout: v.image ? `/images/${v.image}` : undefined,
  module: "range",
}));

export const products = z.array(ProductSchema).parse([abuKoora, ...boon]);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (category: string) => products.filter((p) => p.category === category);
export const productsOf = (brand: Product["brand"]) => products.filter((p) => p.brand === brand);
