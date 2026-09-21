import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { JsonLd, breadcrumbLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="bg-white">
      <ol className="wrap m-0 flex list-none flex-wrap gap-[10px] pt-[26px] text-[12.5px] text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-[10px]">
              {last
                ? <span aria-current="page" className="font-medium text-ink-3">{c.name}</span>
                : <><Link href={c.path} className="hover:text-ink-3">{c.name}</Link><span aria-hidden="true" className="opacity-45">/</span></>}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbLd(all.map((c) => ({ name: c.name, path: c.path === "/" ? "/" : `${c.path}/` })))} />
    </nav>
  );
}

/** Title block for inner pages: breadcrumb, H1 with a gold tail, lead, optional wide image. */
export function PageIntro({
  crumbs, title, highlight, lead, image, children,
}: {
  crumbs: Crumb[];
  title: string;
  highlight?: string;
  lead: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <section className="bg-white pb-16 pt-10 lg:pb-[88px] lg:pt-14">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-6">
            <h1 data-reveal className="t-h2 lg:col-span-7 lg:text-[54px]">
              {title}{highlight && <> <span className="text-gold-deep">{highlight}</span></>}
            </h1>
            <div data-reveal className="lg:col-span-5 lg:col-start-8 lg:pb-2" style={{ transitionDelay: ".08s" }}>
              <p className="t-lead m-0 text-body">{lead}</p>
              {children}
            </div>
          </div>
          {image && (
            <div data-reveal className="tile relative mt-12 h-[240px] bg-ink md:h-[320px] lg:mt-[52px] lg:h-[380px]">
              <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ProductCard({ href, image, contain, tag, name, meta }: {
  href: string; image?: string; contain?: boolean; tag: string; name: string; meta: string;
}) {
  return (
    <Link href={href} data-reveal className="tile group block text-ink-3">
      <span className={`relative block h-[260px] overflow-hidden lg:h-[300px] ${contain ? "bg-off-white" : "bg-[#111315]"}`}>
        {image ? (
          <Image src={image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className={contain ? "object-contain p-8" : "object-cover"} />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-[28px] font-bold tracking-[0.04em] text-ink-3/80">BOON</span>
            <span className="text-[13px] font-light text-muted">{name.replace(/^Boon /, "")}</span>
          </span>
        )}
      </span>
      <span className="t-label mt-[18px] block text-gold-deep">{tag}</span>
      <span className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[18px] font-semibold tracking-[-0.02em]">{name}</span>
        <span className="text-gold-deep transition-transform duration-400 group-hover:translate-x-[5px] rtl:group-hover:-translate-x-[5px]">
          <svg className="rtl:-scale-x-100" width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden="true"><path d="M0 4.5h13M9.2.8 13 4.5 9.2 8.2" stroke="currentColor" strokeWidth="1.4" /></svg>
        </span>
      </span>
      <span className="mt-1 block text-[12.5px] font-light text-muted">{meta}</span>
    </Link>
  );
}
