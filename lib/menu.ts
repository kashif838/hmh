import { categories } from "@/content/categories";
import { productsOf } from "@/content/products";

export type MenuLink = { href: string; name: string };
export type Menu = { food: MenuLink[]; nonFood: MenuLink[]; abuKoora: MenuLink[]; boon: MenuLink[] };

/** Plain data for the Products dropdown, built on the server so the header ships no content code. */
export function getMenu(): Menu {
  const cat = (group: "food" | "non-food") =>
    categories.filter((c) => c.group === group).map((c) => ({ href: `/products/${c.slug}`, name: c.name }));
  const prod = (brand: "boon" | "abu-koora") =>
    productsOf(brand).map((p) => ({ href: `/products/${p.category}/${p.slug}`, name: p.shortName }));
  return { food: cat("food"), nonFood: cat("non-food"), abuKoora: prod("abu-koora"), boon: prod("boon") };
}
