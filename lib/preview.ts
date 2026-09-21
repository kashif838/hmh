/**
 * Client preview: only the homepage and the OPEN pages are reachable. Every other page still exists
 * and builds; links point to the matching homepage section and direct URLs redirect there.
 * Show the full site by setting NEXT_PUBLIC_HOME_ONLY=false (Vercel env or .env.local).
 */
export const HOME_ONLY = process.env.NEXT_PUBLIC_HOME_ONLY !== "false";

/** Pages shown during the preview (exact paths). */
export const OPEN = [
  "/about", "/products", "/brands", "/brands/boon", "/brands/abu-koora",
  "/markets", "/contact", "/request-a-quote", "/privacy-policy", "/terms",
  "/services", "/services/private-label", "/services/import-export", "/services/distribution",
];

const SECTIONS: [path: string, section: string][] = [
  ["/about", "/#about"],
  ["/services", "/#capabilities"],
  ["/products", "/#products"],
  ["/brands", "/#brands"],
  ["/markets", "/#markets"],
  ["/contact", "/#contact"],
  ["/request-a-quote", "/#contact"],
  ["/partner-with-us", "/#contact"],
];

/** Where an internal href should point while the preview is on. Hash-only and external hrefs pass through. */
export function previewHref(href: string): string {
  if (!HOME_ONLY || !href.startsWith("/")) return href;
  const path = href.split("#")[0].replace(/\/$/, "") || "/";
  if (path === "/" || OPEN.includes(path)) return href;
  const hit = SECTIONS.find(([p]) => path === p || path.startsWith(p + "/"));
  return hit ? hit[1] : "/";
}
