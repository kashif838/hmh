const norm = (p: string) => (p.length > 1 ? p.replace(/\/$/, "") : p);

/**
 * Whether `pathname` falls under a nav target.
 * - exact: only that page (for parents like /services whose children have their own links)
 * - otherwise the page and everything below it
 * - a target ending in "-" is a slug prefix, e.g. "/products/beverages/boon-" for every Boon product
 */
export function isActive(pathname: string, target: string, exact = false) {
  const p = norm(pathname);
  if (target.endsWith("-")) return p.startsWith(target);
  const t = norm(target.split("#")[0]);
  return p === t || (!exact && p.startsWith(t + "/"));
}
