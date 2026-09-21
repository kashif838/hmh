/**
 * Client preview: only the homepage is reachable. Every other page still exists and builds;
 * links point to the matching homepage section and direct URLs redirect there.
 * Show the full site by setting NEXT_PUBLIC_HOME_ONLY=false (Vercel env or .env.local).
 */
export const HOME_ONLY = process.env.NEXT_PUBLIC_HOME_ONLY !== "false";

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
  if (path === "/") return href;
  const hit = SECTIONS.find(([p]) => path === p || path.startsWith(p + "/"));
  return hit ? hit[1] : "/";
}
