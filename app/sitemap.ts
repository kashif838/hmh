import type { MetadataRoute } from "next";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { brands } from "@/content/brands";
import { servicePages } from "@/content/services";
import { company } from "@/content/company";
import { AR_LIVE } from "@/i18n/routing";
import { HOME_ONLY, OPEN } from "@/lib/preview";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = HOME_ONLY ? ["/", ...OPEN] : [
    "/", "/about", "/services", "/markets", "/products", "/brands",
    "/request-a-quote", "/partner-with-us", "/contact", "/privacy-policy", "/terms",
    ...servicePages.map((s) => `/services/${s.slug}`),
    ...categories.map((c) => `/products/${c.slug}`),
    ...products.map((p) => `/products/${p.category}/${p.slug}`),
    ...brands.map((b) => `/brands/${b.slug}`),
  ];
  const url = (p: string, ar = false) => `${company.url}${ar ? "/ar" : ""}${p === "/" ? "/" : `${p}/`}`;
  return paths.map((p) => ({
    url: url(p),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/products") ? 0.8 : 0.6,
    ...(AR_LIVE ? { alternates: { languages: { en: url(p), ar: url(p, true) } } } : {}),
  }));
}
