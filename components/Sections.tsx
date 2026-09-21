import { Fragment } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { capabilities, flow, privateLabelSteps, reasons } from "@/content/services";
import { categories } from "@/content/categories";
import { productsOf } from "@/content/products";
import { brands } from "@/content/brands";
import { company, markets } from "@/content/company";
import { MAP_ACTIVE, MAP_DIM } from "@/content/map-dots";
import { Arrow, Icon } from "./Icons";

/* ── Small shared pieces ─────────────────────────────────────── */

/** Heading with a coloured tail, the site's only emphasis device (no italics). */
export function Hl({ children, tone = "deep" }: { children: React.ReactNode; tone?: "deep" | "gold" }) {
  return <span className={tone === "gold" ? "text-gold" : "text-gold-deep"}>{children}</span>;
}

export function SectionHead({ title, aside, dark = false }: { title: React.ReactNode; aside?: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-[70px]">
      <h2 data-reveal className={`t-h2 max-w-[680px] ${dark ? "text-paper-bright" : ""}`}>{title}</h2>
      {aside && (
        <div data-reveal className={`max-w-[360px] text-[14px] font-light leading-[1.72] lg:mb-2 ${dark ? "text-paper/70" : "text-muted"}`} style={{ transitionDelay: ".08s" }}>
          {aside}
        </div>
      )}
    </div>
  );
}

export function Quote({ text, caption, size = "lg" }: { text: string; caption: string; size?: "lg" | "md" }) {
  return (
    <figure data-reveal className="m-0">
      <span aria-hidden="true" className="block text-[52px] leading-[0.6] text-gold">&ldquo;</span>
      <blockquote className="m-0 mt-[10px]">
        <p className={`m-0 font-normal leading-[1.58] tracking-[-0.017em] text-[#26272a] ${size === "lg" ? "text-[17px] lg:text-[19px]" : "text-[16px] lg:text-[17px]"}`}>{text}</p>
      </blockquote>
      <figcaption className="t-label mt-[14px] text-gold-deep">{caption}</figcaption>
    </figure>
  );
}

/* ── Capabilities ────────────────────────────────────────────── */

export function CapabilityGrid() {
  return (
    <div className="grid grid-cols-1 gap-px border border-ink-3/13 bg-ink-3/13 sm:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c, i) => (
        <Link key={c.title} href={c.href} data-reveal className="cap block bg-white px-7 pb-9 pt-[34px] lg:px-[30px]" style={{ transitionDelay: `${(i % 3) * 0.05}s` }}>
          <span className="capicon inline-flex"><Icon name={c.icon} size={26} /></span>
          <h3 className="mt-[18px] mb-[9px] text-[18px] tracking-[-0.02em]">{c.title}</h3>
          <p className="m-0 text-[13px] font-light leading-[1.66] text-muted">{c.body}</p>
        </Link>
      ))}
    </div>
  );
}

/* ── How goods move ──────────────────────────────────────────── */

export function Flow() {
  const offsets = ["lg:pt-0", "lg:pt-[52px]", "lg:pt-[14px]", "lg:pt-[66px]"];
  return (
    <section className="section-y bg-white">
      <div className="wrap">
        <SectionHead
          title={<>Four capabilities, one continuous <Hl>chain of custody</Hl></>}
          aside="Most companies do one part of this. Because we do all four, a shipment does not change hands, or change owner of the problem, between origin and shelf."
        />
        <div data-reveal className="relative mt-[54px] h-px bg-ink-3/14">
          <span className="flowline absolute inset-0 block bg-gradient-to-r from-gold-deep to-gold-deep/15 rtl:bg-gradient-to-l" />
        </div>
        <ol className="m-0 grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[26px]">
          {flow.map((f, i) => (
            <li key={f.title} data-reveal className={offsets[i]} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="flex items-center gap-3 pb-[22px] pt-6">
                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold-deep" />
                <span className="t-label text-gold-deep">{f.step}</span>
              </div>
              <div className="tile relative h-[300px] bg-off-white lg:h-[392px]">
                <Image src={f.image} alt={f.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
              </div>
              <h3 className="mt-[22px] mb-[9px] text-[22px] tracking-[-0.024em]">{f.title}</h3>
              <p className="m-0 text-[13.5px] font-light leading-[1.7] text-muted">{f.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-20 h-px bg-ink-3/13 lg:mt-28" />
      </div>
    </section>
  );
}

/* ── What we trade: asymmetric mosaic ────────────────────────── */

function CategoryTile({ c, index }: { c: (typeof categories)[number]; index: number }) {
  const h = c.tall ? "h-[300px] lg:h-[428px]" : "h-[260px] lg:h-[306px]";
  const big = c.span >= 6;
  if (!c.image) {
    return (
      <Link href={`/products/${c.slug}`} data-reveal className={`tile relative block bg-off-white ${h} sm:col-span-1 lg:[grid-column:span_var(--span)]`} style={{ ["--span" as string]: c.span, transitionDelay: `${(index % 4) * 0.05}s` }}>
        <span className="absolute inset-0 border border-ink-3/12" />
        <span className="absolute inset-x-6 bottom-[22px] block">
          <span className="rule !bg-gold-deep" />
          <span className="block text-[21px] font-semibold tracking-[-0.024em] text-[#1c1d1f]">{c.name}</span>
          <span className="mt-[5px] block text-[12.5px] font-light text-muted">{c.items.join(" · ")}</span>
        </span>
      </Link>
    );
  }
  return (
    <Link href={`/products/${c.slug}`} data-reveal className={`tile relative block bg-[#111315] ${h} lg:[grid-column:span_var(--span)]`} style={{ ["--span" as string]: c.span, transitionDelay: `${(index % 4) * 0.05}s` }}>
      <Image src={c.image.src} alt={c.image.alt} fill sizes={big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} className="object-cover saturate-[.92]" />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,10,0)_38%,rgba(8,9,10,.88)_100%)]" />
      <span className="absolute inset-x-[22px] bottom-6 block lg:inset-x-[26px]">
        <span className="rule" />
        <span className="flex items-end justify-between gap-[18px]">
          <span className="block">
            <span className={`block font-semibold tracking-[-0.026em] text-paper-bright ${big ? "text-[22px] lg:text-[27px]" : "text-[20px] lg:text-[21px]"}`}>{c.name}</span>
            <span className="mt-[6px] block text-[12.5px] font-light text-paper/75">{c.items.join(" · ")}</span>
          </span>
          {big && <span className="arw shrink-0 text-gold-light"><Arrow /></span>}
        </span>
      </span>
    </Link>
  );
}

export function CategoryMosaic() {
  const food = categories.filter((c) => c.group === "food");
  const nonFood = categories.filter((c) => c.group === "non-food");
  return (
    <>
      <div data-reveal className="mb-[18px] mt-10 flex items-center gap-4">
        <span className="t-label text-gold-deep">Food</span>
        <span className="h-px flex-1 bg-ink-3/18" />
        <span className="text-[12.5px] text-[#7a756b]">{food.length} categories</span>
      </div>
      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-12">
        {food.map((c, i) => <CategoryTile key={c.slug} c={c} index={i} />)}
      </div>
      <div id="non-food" data-reveal className="mb-[18px] mt-11 flex scroll-mt-24 items-center gap-4">
        <span className="t-label text-gold-deep">Non-food</span>
        <span className="h-px flex-1 bg-ink-3/18" />
        <span className="text-[12.5px] text-[#7a756b]">{nonFood.length} categories</span>
      </div>
      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-12">
        {nonFood.map((c, i) => <CategoryTile key={c.slug} c={c} index={i} />)}
      </div>
    </>
  );
}

/* ── Markets map ─────────────────────────────────────────────── */

const DXB = { x: 771.3, y: 230.5 };
const ROUTES = [
  { name: "GCC", x: 744.1, y: 235.4, kind: "market", lx: -6, ly: 26, anchor: "middle" },
  { name: "MENA", x: 655.6, y: 215.1, kind: "market", lx: 0, ly: -14, anchor: "middle" },
  { name: "CIS", x: 812.9, y: 138.0, kind: "market", lx: 10, ly: -13, anchor: "start" },
  { name: "AFRICA", x: 649.0, y: 324.6, kind: "market", lx: -8, ly: 24, anchor: "middle" },
  { name: "AUSTRALIA", x: 1029.2, y: 434.2, kind: "market", lx: 0, ly: 24, anchor: "middle" },
  { name: "SOUTH ASIA", x: 848.9, y: 247.5, kind: "source", lx: 8, ly: 26, anchor: "start" },
] as const;

function arcPath(x: number, y: number) {
  const mx = (DXB.x + x) / 2, my = (DXB.y + y) / 2;
  const dx = x - DXB.x, dy = y - DXB.y;
  const L = Math.hypot(dx, dy) || 1;
  let ox = -dy / L, oy = dx / L;
  if (y > DXB.y) { ox = dy / L; oy = -dx / L; }
  const bow = L * 0.24;
  return `M${DXB.x} ${DXB.y} Q${(mx + ox * bow).toFixed(1)} ${(my + oy * bow).toFixed(1)} ${x} ${y}`;
}

const dots = (s: string) => s.split(" ").map((p) => { const [x, y] = p.split(","); return <use key={p} href="#d" x={x} y={y} />; });

export function WorldMap() {
  return (
    <svg viewBox="150 26 1006 496" width="100%" height="auto" direction="ltr" role="img" className="block"
      aria-label="World map with HMH's trading regions highlighted around the Gulf, MENA, CIS, Africa and Australia, and routes radiating from Dubai">
      <defs><circle id="d" r="1.5" /></defs>
      <g fill="rgba(234,230,220,.15)">{dots(MAP_DIM)}</g>
      <g fill="#c79a4b" opacity=".72">{dots(MAP_ACTIVE)}</g>
      <g>
        {ROUTES.map((r) => (
          <g key={r.name}>
            {r.kind === "source"
              ? <path d={arcPath(r.x, r.y)} fill="none" stroke="#eae6dc" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 6" opacity=".4" />
              : <path className="arc" d={arcPath(r.x, r.y)} />}
            <circle cx={r.x} cy={r.y} r="3.4" fill={r.kind === "source" ? "#eae6dc" : "#c79a4b"} />
            <text x={r.x + r.lx} y={r.y + r.ly} textAnchor={r.anchor} fontFamily="var(--font-poppins), sans-serif" fontSize="9.5" fontWeight="600" letterSpacing="1.8" fill="rgba(234,230,220,.82)">{r.name}</text>
          </g>
        ))}
      </g>
      <circle cx={DXB.x} cy={DXB.y} r="5.5" fill="#e3c583" />
      <circle cx={DXB.x} cy={DXB.y} r="12" fill="none" stroke="#c79a4b" strokeWidth="1" opacity=".55" />
      <circle cx={DXB.x} cy={DXB.y} r="21" fill="none" stroke="#c79a4b" strokeWidth=".8" opacity=".25" />
      <text x={DXB.x} y="210" textAnchor="middle" fontFamily="var(--font-poppins), sans-serif" fontSize="11" fontWeight="600" letterSpacing="2.2" fill="#f4f1ea">DUBAI</text>
    </svg>
  );
}

export function MarketsBlock({ withBand = true, titleAs: Title = "h2" }: { withBand?: boolean; titleAs?: "h1" | "h2" }) {
  return (
    <section id="markets" className="bg-ink pt-20 lg:pt-[122px]">
      <div className="wrap">
        <div className="mx-auto max-w-[880px] text-center">
          <Title data-reveal className="t-h2 text-paper-bright">Dubai sits within eight hours of <Hl tone="gold">two-thirds of the world</Hl></Title>
          <p data-reveal className="mx-auto mt-[22px] max-w-[600px] text-[15px] font-light leading-[1.72] text-paper/70" style={{ transitionDelay: ".08s" }}>
            That geography is the reason the business exists here. Goods route through the UAE, or around it, depending on what the trade needs.
          </p>
        </div>
        <div data-reveal className="-mx-5 mt-[34px] md:mx-0" style={{ transitionDelay: ".12s" }}><WorldMap /></div>
        <div data-reveal className="mt-[22px] flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12.5px] font-light text-paper/55">
          <span className="flex items-center gap-2"><span className="h-[9px] w-[9px] rounded-full bg-gold opacity-75" />Active trading regions</span>
          <span className="flex items-center gap-2"><span className="h-px w-5 bg-gold" />Market routes</span>
          <span className="flex items-center gap-2"><span className="h-px w-5 bg-paper/60" />Sourcing origin</span>
        </div>
        <div className="mt-14 h-px bg-paper/14" />
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {markets.map((m, i) => (
            <div key={m.name} data-reveal className={`py-7 pe-5 ${i > 0 ? "lg:border-s lg:border-paper/12 lg:ps-[22px]" : ""} ${i % 2 === 1 ? "border-s border-paper/12 ps-5 lg:ps-[22px]" : ""}`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <h3 className="mb-[9px] text-[17px] tracking-[-0.02em] text-[#f4f1ea]">{m.name}</h3>
              <p className="m-0 text-[13px] font-light leading-[1.64] text-paper/62">{m.body}</p>
            </div>
          ))}
        </div>
        <div className="h-px bg-paper/14" />
        <p data-reveal className="mx-auto mt-5 max-w-[660px] text-center text-[12.5px] font-light leading-[1.7] text-paper/50">
          HMH also trades into the Australian continent.
        </p>
      </div>
      {withBand ? (
        <div data-reveal className="relative mt-[74px] h-[240px] overflow-hidden lg:h-[264px]">
          <Image src="/images/dubai.jpg" alt="Dubai waterfront skyline at dusk" fill sizes="100vw" className="object-cover object-[50%_62%]" />
          <span className="flip-rtl absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,.92)_0%,rgba(8,9,10,.5)_46%,rgba(8,9,10,.2)_100%)]" />
          <span className="absolute inset-0 flex items-center">
            <span className="wrap block w-full">
              <span className="block text-[21px] font-semibold tracking-[-0.024em] text-paper-bright lg:text-[24px]">Head office: {company.city}, {company.country}</span>
              <span className="mt-2 block max-w-[440px] text-[13.5px] font-light leading-[1.66] text-paper/75">Trading, sourcing and private-label operations all run from here.</span>
            </span>
          </span>
        </div>
      ) : <div className="h-20 lg:h-[122px]" />}
    </section>
  );
}

/* ── Brand logo wall ─────────────────────────────────────────── */

const LOGOS: { name: string; images: { src: string; alt: string; w: number; h: number }[] }[] = [
  { name: "Bonfood", images: [{ src: "/images/bonfood.png", alt: "Bonfood logo", w: 900, h: 305 }] },
  {
    name: "Baba Cook",
    images: [
      { src: "/images/babacook-en.png", alt: "Baba Cook logo, English", w: 900, h: 718 },
      { src: "/images/babacook-ar.png", alt: "Baba Cook logo, Arabic", w: 759, h: 604 },
    ],
  },
  { name: "Abu Koora", images: [{ src: "/images/abukoora-logo.png", alt: "Abu Koora logo", w: 560, h: 243 }] },
];

export function LogoWall() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-px border border-ink-3/13 bg-ink-3/13 p-0 sm:grid-cols-3" aria-label="HMH brands">
      {LOGOS.map((l, i) => (
        <li key={l.name} data-reveal className="flex h-[180px] items-center justify-center gap-6 bg-white px-8 lg:h-[220px]" style={{ transitionDelay: `${i * 0.06}s` }}>
          {l.images.map((img) => (
            <Image key={img.src} src={img.src} alt={img.alt} width={img.w} height={img.h}
              sizes="(min-width:640px) 22vw, 60vw"
              className={`w-auto object-contain ${l.images.length > 1 ? "max-h-[96px] lg:max-h-[118px]" : "max-h-[84px] lg:max-h-[104px]"} max-w-full`} />
          ))}
        </li>
      ))}
    </ul>
  );
}

/* ── Own brands ──────────────────────────────────────────────── */

export function BoonPanel() {
  const boon = brands.find((b) => b.slug === "boon")!;
  const range = productsOf("boon");
  const withCups = range.filter((p) => p.cutout);
  const others = range.filter((p) => !p.cutout);
  return (
    <div data-reveal className="bg-ink-2 py-16 text-paper lg:py-[74px]">
      <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-[68px]">
        <div className="lg:w-[322px] lg:shrink-0">
          <h3 className="text-[44px] font-bold leading-none tracking-[0.02em] text-paper-bright lg:text-[52px]">BOON</h3>
          <p className="mt-3 text-[18px] tracking-[-0.02em] text-gold">{boon.tagline}</p>
          <p className="t-label mt-4 text-paper/55">HMH own brand</p>
          <p className="mt-6 text-[13.5px] font-light leading-[1.74] text-paper/75">{boon.summary}</p>
          <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-[11px] text-[12.5px] font-light">
            {boon.facts.map(([k, v]) => (<Fragment key={k}><dt className="text-paper/50">{k}</dt><dd className="m-0 text-paper">{v}</dd></Fragment>))}
          </dl>
          <div className="mt-[30px] flex flex-wrap gap-3">
            <Link href="/partner-with-us" className="btn btn-gold">Become a Distributor</Link>
            <Link href="/brands/boon" className="btn btn-ghost">The range</Link>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="cupwrap -mx-5 flex items-end gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:items-start lg:justify-between lg:gap-2 lg:overflow-visible lg:px-[14px]">
            {withCups.map((p, i) => (
              <Link key={p.slug} href={`/products/${p.category}/${p.slug}`} className="flex shrink-0 flex-col items-center gap-[14px] lg:min-w-0 lg:flex-1 lg:shrink">
                <Image className="cup h-[150px] w-auto lg:h-auto lg:max-h-[198px] lg:w-full lg:object-contain" style={{ transitionDelay: `${i * 0.04}s` }} src={p.cutout!} alt={p.name} width={280} height={356} sizes="(min-width:1024px) 130px, 118px" />
                <span className="text-center text-[12.5px] font-light text-paper/75">{p.shortName}</span>
              </Link>
            ))}
          </div>
          <div className="flip-rtl mt-[26px] h-px bg-gradient-to-r from-gold/55 to-paper/8" />
          <p className="mt-[18px] flex flex-wrap items-center gap-[10px] text-[12.5px] font-light text-paper/60">
            <span className="t-label text-paper/45">Also in range</span>
            {others.map((p, i) => (
              <span key={p.slug} className="flex items-center gap-[10px]">
                {i > 0 && <span className="opacity-40">&middot;</span>}
                <Link href={`/products/${p.category}/${p.slug}`} className="hover:text-gold-light">{p.shortName}</Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AbuKooraPanel() {
  const ak = brands.find((b) => b.slug === "abu-koora")!;
  return (
    <div data-reveal className="bg-off-white py-16 lg:py-[74px]">
      <div className="wrap flex flex-col items-center gap-12 lg:flex-row lg:gap-[68px]">
        <div className="grid w-full flex-1 grid-cols-2 items-end gap-4 lg:gap-[26px]">
          {[["/images/abukoora-en.png", "English pack"], ["/images/abukoora-ar.png", "Arabic pack"]].map(([src, label]) => (
            <figure key={src} className="m-0 flex flex-col gap-[14px]">
              <Image src={src} alt={`Abu Koora sandwich biscuits carton, ${label.toLowerCase()}`} width={808} height={860} sizes="(min-width:1024px) 30vw, 50vw" className="h-auto w-full" />
              <figcaption className="t-label text-center text-[#7a6a4a]">{label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="lg:w-[400px] lg:shrink-0">
          <h3 className="text-[42px] font-bold leading-none tracking-[-0.03em] text-[#1c1d1f] lg:text-[50px]">{ak.name}</h3>
          <p className="mt-3 text-[18px] tracking-[-0.02em] text-gold-deep">{ak.tagline}</p>
          <p className="t-label mt-4 text-muted">HMH own brand &middot; Private label</p>
          <p className="mt-6 text-[13.5px] font-light leading-[1.74] text-body">{ak.summary}</p>
          {ak.facts.length > 0 && <dl className="mt-7 grid grid-cols-[auto_1fr] gap-x-5 gap-y-[11px] text-[12.5px] font-light">
            {ak.facts.map(([k, v]) => (<Fragment key={k}><dt className="text-[#7a756b]">{k}</dt><dd className="m-0 text-[#2a2b2d]">{v}</dd></Fragment>))}
          </dl>}
          <div className="mt-[30px] flex flex-wrap gap-3">
            <Link href="/products/biscuits-confectionery/abu-koora-sandwich-biscuits" className="btn btn-dark">View product</Link>
            <Link href="/services/private-label" className="btn btn-line">How we build a brand</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Private label process ───────────────────────────────────── */

export function PrivateLabelSteps() {
  return (
    <div className="wrap">
      <div data-reveal className="relative h-px bg-paper/14">
        <span className="flowline absolute inset-0 block bg-gradient-to-r from-gold to-gold/12 rtl:bg-gradient-to-l" />
      </div>
      <ol className="m-0 grid list-none grid-cols-1 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {privateLabelSteps.map((s, i) => {
          const last = i === privateLabelSteps.length - 1;
          return (
            <li key={s.title} data-reveal className="lg:pe-7" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className={`-mt-[6px] block h-[11px] w-[11px] rounded-full ${last ? "bg-gold-light" : "bg-gold"}`} />
              <span className={`t-label mt-[26px] block ${last ? "text-gold-light" : "text-gold"}`}>Step 0{i + 1}</span>
              <h3 className="mt-3 mb-[10px] text-[25px] tracking-[-0.028em] text-paper-bright">{s.title}</h3>
              <p className="m-0 text-[13px] font-light leading-[1.7] text-paper/66">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function PrivateLabelSection() {
  return (
    <section id="private-label" className="bg-ink pb-20 lg:pb-[126px]">
      <div className="relative h-[340px] overflow-hidden lg:h-[376px]">
        <Image src="/images/pl-crane.jpg" alt="Ship-to-shore cranes above stacked containers" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,12,.52),rgba(10,11,12,.97))]" />
        <div className="absolute inset-0 flex items-center">
          <div className="wrap w-full">
            <h2 data-reveal className="t-h2 max-w-[800px] text-paper-bright">Bring us a shelf. We&rsquo;ll bring you <Hl tone="gold">a product to put on it</Hl></h2>
          </div>
        </div>
      </div>
      <div className="wrap relative -mt-[18px]">
        <p data-reveal className="mb-[54px] max-w-[616px] text-[15px] font-light leading-[1.74] text-paper/72">
          Retailers and distributors come to us for product under their own name. We handle the whole route, and we have walked it ourselves, twice, with Abu Koora and Boon.
        </p>
      </div>
      <PrivateLabelSteps />
      <div className="wrap mt-12">
        <Link href="/services/private-label" className="btn btn-ghost">Private label in detail <Arrow /></Link>
      </div>
    </section>
  );
}

/* ── Why partner ─────────────────────────────────────────────── */

export function Reasons() {
  return (
    <section className="section-y bg-white">
      <div className="wrap flex flex-col gap-12 lg:flex-row lg:gap-[90px]">
        <div className="lg:w-[428px] lg:shrink-0">
          <h2 data-reveal className="t-h2-sm">No inflated numbers. Just what we actually <Hl>do</Hl></h2>
          <p data-reveal className="mt-[26px] text-[14.5px] font-light leading-[1.74] text-body" style={{ transitionDelay: ".08s" }}>
            Plenty of trading companies lead with counters: countries, containers, customers. We would rather describe the work and let the enquiry test it.
          </p>
          <div className="mt-[34px]"><Quote text={company.vision} caption="HMH vision statement" size="md" /></div>
        </div>
        <div className="min-w-0 flex-1 border-y border-ink-3/17">
          {reasons.map((r, i) => (
            <div key={r.title} data-reveal className={`py-7 ${i > 0 ? "border-t border-ink-3/12" : ""}`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <h3 className="mb-2 text-[19px] tracking-[-0.026em] text-[#1c1d1f] lg:text-[21px]">{r.title}</h3>
              <p className="m-0 max-w-[560px] text-[14px] font-light leading-[1.72] text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact band ────────────────────────────────────────────── */

export function ContactBand() {
  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-20 lg:flex lg:h-[512px] lg:items-center lg:py-0">
      <Image src="/images/cta-yard.jpg" alt="Container yard with gantry cranes" fill sizes="100vw" className="object-cover" />
      <div className="flip-rtl absolute inset-0 bg-[linear-gradient(95deg,rgba(6,7,8,.96)_0%,rgba(6,7,8,.82)_46%,rgba(6,7,8,.48)_100%)]" />
      <div className="wrap relative flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-[70px]">
        <div className="max-w-[700px]">
          <h2 data-reveal className="t-h2 text-paper-bright">Tell us what you need<br className="hidden sm:block" /> and <Hl tone="gold">where it has to land</Hl></h2>
          <p data-reveal className="mt-6 max-w-[530px] text-[15px] font-light leading-[1.72] text-paper/80" style={{ transitionDelay: ".08s" }}>
            Send the category, the volume, the destination port and the Incoterm you trade on. We will come back with a quotation, not a brochure.
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-[14px]" style={{ transitionDelay: ".16s" }}>
            <Link href="/request-a-quote" className="btn btn-gold">Request a Quote</Link>
            <Link href="/partner-with-us" className="btn btn-ghost">Partner With HMH</Link>
          </div>
        </div>
        <div data-reveal className="shrink-0 border border-paper/20 bg-ink/50 px-[34px] py-[30px]" style={{ transitionDelay: ".2s" }}>
          <p className="t-label m-0 text-gold">Direct</p>
          <p className="mt-[18px]"><a href={company.phoneHref} dir="ltr" className="text-[25px] font-semibold tracking-[-0.026em] text-paper-bright hover:text-gold-light">{company.phone}</a></p>
          <p className="mt-[9px]"><a href={`mailto:${company.email}`} className="text-[14px] font-light text-gold-light hover:text-gold">{company.email}</a></p>
          <div className="my-[22px] h-px bg-paper/16" />
          <p className="m-0 text-[12.5px] font-light leading-[1.68] text-paper/65">{company.legalName}<br />{company.city}, {company.country}</p>
        </div>
      </div>
    </section>
  );
}
