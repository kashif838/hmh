import { z } from "zod";
import { BrandSchema } from "./schema";

export const brands = z.array(BrandSchema).parse([
  {
    slug: "boon",
    name: "Boon",
    tagline: "Fresh & healthy. Sip the experience.",
    summary:
      "A range of instant hot drinks in single-serve printed cups. The premix is pre-dosed and the cup is the pack. Every cup carries English and Arabic, built for Gulf retail and for travel, office and catering supply.",
    story: [
      "Boon is an HMH own brand: ten varieties in one single-serve format, from karak tea and black tea with cardamom to lemon and ginger, moringa and zhourat.",
      "Because the premix is dosed into the cup itself, there is nothing to measure and nothing to wash. Add hot water, stir and serve.",
    ],
    facts: [
      ["Format", "Single-serve instant cup"],
      ["Languages", "English & Arabic"],
      ["Range", "10 varieties"],
    ],
    theme: "dark",
  },
  {
    slug: "abu-koora",
    name: "Abu Koora",
    tagline: "Sandwich biscuits, made for the Gulf.",
    summary:
      "Conceived by HMH, produced under contract in India and packaged in two languages for Arabic-speaking markets. A complete private-label build: specification, brand, artwork, compliant declarations and barcoding.",
    story: [
      "Abu Koora is an HMH own brand, and the clearest example of what HMH's private-label service delivers.",
      "The biscuits are produced by Biking Food Products Pvt Ltd in Hyderabad, India, for HMH General Trading LLC in Dubai, and packed in separate English and Arabic cartons so each market gets a pack that reads natively.",
    ],
    facts: [
      ["Product", "Sandwich biscuits"],
      ["Produced by", "Biking Food Products Pvt Ltd, Hyderabad"],
      ["Produced for", "HMH General Trading LLC, Dubai"],
      ["Origin", "Product of India"],
    ],
    theme: "light",
  },
]);

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
