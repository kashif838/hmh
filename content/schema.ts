import { z } from "zod";

const Image = z.object({ src: z.string().startsWith("/images/"), alt: z.string().min(1) });

export const CategorySchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/),
  name: z.string(),
  group: z.enum(["food", "non-food"]),
  items: z.array(z.string()).min(1),
  intro: z.string(),
  image: Image.optional(),
  /** homepage mosaic: column span on the 12-col grid and row height */
  span: z.number().int().min(3).max(6),
  tall: z.boolean().default(false),
});

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/),
  category: z.string(),
  brand: z.enum(["boon", "abu-koora"]),
  name: z.string(),
  shortName: z.string(),
  nameAr: z.string().optional(),
  tagline: z.string().optional(),
  lead: z.string(),
  facts: z.array(z.tuple([z.string(), z.string()])),
  spec: z.array(z.tuple([z.string(), z.string()])),
  ingredients: z.string().optional(),
  allergens: z.array(z.string()).optional(),
  gallery: z.array(Image.extend({ label: z.string() })),
  cutout: z.string().optional(),
  module: z.enum(["bilingual", "range"]),
});

export const BrandSchema = z.object({
  slug: z.enum(["boon", "abu-koora"]),
  name: z.string(),
  tagline: z.string(),
  summary: z.string(),
  story: z.array(z.string()),
  facts: z.array(z.tuple([z.string(), z.string()])),
  theme: z.enum(["dark", "light"]),
});

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Brand = z.infer<typeof BrandSchema>;
