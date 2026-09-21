"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { AR_LIVE } from "@/i18n/routing";
import type { Menu, MenuLink } from "@/lib/menu";
import { isActive } from "@/lib/nav";

const NAV = [
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/brands", key: "brands" },
  { href: "/markets", key: "markets" },
] as const;

export function Lockup({ size = 25 }: { size?: number }) {
  const t = useTranslations("header");
  return (
    <span className="flex items-center gap-[13px]">
      <Image src="/images/hmh-mark.png" alt="HMH" width={600} height={300} priority className="w-auto" style={{ height: Math.round(size * 1.45) }} />
      <span className="h-[26px] w-px bg-gold/60" />
      <span className="text-[11px] font-medium tracking-[0.14em] text-paper/60 rtl:text-[13px] rtl:tracking-normal">{t("lockup")}</span>
    </span>
  );
}

function Col({ title, links, href }: { title: string; links: MenuLink[]; href?: string }) {
  const pathname = usePathname();
  return (
    <div>
      <p className="t-label mb-4 text-gold">{href ? <Link href={href} className="hover:text-gold-light">{title}</Link> : title}</p>
      <ul className="m-0 flex list-none flex-col gap-[9px] p-0">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className="navitem text-[13.5px] text-paper/75">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LangSwitch() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "ar" : "en";
  return (
    <div className="flex items-center gap-[9px] text-[12.5px] text-paper/50">
      <span className={locale === "en" ? "text-[#f4f1ea]" : ""}>EN</span>
      <span className="h-[11px] w-px bg-paper/25" />
      {AR_LIVE ? (
        <Link href={pathname} locale={other} className="hover:text-[#f4f1ea]" hrefLang={other}>AR</Link>
      ) : (
        <span aria-disabled="true" title={t("arSoon")}>AR</span>
      )}
    </div>
  );
}

export function Header({ overlay = false, menu }: { overlay?: boolean; menu: Menu }) {
  const t = useTranslations();
  const pathname = usePathname();
  // The menu belongs to the path it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenAt((typeof v === "function" ? v(open) : v) ? pathname : null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  // Desktop Products dropdown: same path-scoped trick, plus a short grace period on hover-out.
  const [dropAt, setDropAt] = useState<string | null>(null);
  const drop = dropAt === pathname;
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openDrop = () => { clearTimeout(hoverTimer.current); setDropAt(pathname); };
  const closeDropSoon = () => { clearTimeout(hoverTimer.current); hoverTimer.current = setTimeout(() => setDropAt(null), 160); };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenAt(null); menuBtn.current?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  useEffect(() => {
    if (!drop) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDropAt(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drop]);

  const active = (href: string) => isActive(pathname, href);

  return (
    <header className={overlay ? "absolute inset-x-0 top-0 z-40" : "relative z-40 bg-ink"}>
      <div className="wrap flex h-[76px] items-center gap-11 lg:h-[92px]">
        <Link href="/" aria-label={t("header.home")} className="shrink-0">
          <Lockup />
        </Link>
        <nav aria-label={t("header.primary")} className="ms-5 hidden items-center gap-8 lg:flex">
          {NAV.map((n) =>
            n.key === "products" ? (
              <div key={n.href} className="flex items-center gap-1" onMouseEnter={openDrop} onMouseLeave={closeDropSoon}>
                <Link href={n.href} className="navlink" aria-current={active(n.href) ? "page" : undefined}>{t(`nav.${n.key}`)}</Link>
                <button type="button" aria-label={t("header.showProducts")} aria-expanded={drop} aria-controls="products-menu"
                  onClick={() => (drop ? setDropAt(null) : openDrop())}
                  className="flex h-7 w-5 items-center justify-center text-paper/70 hover:text-paper-bright">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" className={`transition-transform duration-300 ${drop ? "rotate-180" : ""}`}>
                    <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className="navlink" aria-current={active(n.href) ? "page" : undefined}>
                {t(`nav.${n.key}`)}
              </Link>
            ),
          )}
        </nav>
        <div className="ms-auto hidden items-center gap-[22px] lg:flex">
          <LangSwitch />
          <Link href="/request-a-quote" aria-current={active("/request-a-quote") ? "page" : undefined} className="btn btn-ghost !min-h-0 !px-[22px] !py-[13px] aria-[current=page]:border-gold aria-[current=page]:text-gold-light">{t("cta.quote")}</Link>
        </div>
        <button
          ref={menuBtn}
          type="button"
          className="ms-auto flex h-[46px] w-[46px] flex-col items-center justify-center gap-[5px] border border-paper/25 lg:hidden"
          aria-label={open ? t("nav.close") : t("nav.menu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-[1.5px] w-[17px] bg-paper transition-transform ${open ? "translate-y-[3.25px] rotate-45" : ""}`} />
          <span className={`block h-[1.5px] w-[17px] bg-paper transition-transform ${open ? "-translate-y-[3.25px] -rotate-45" : ""}`} />
        </button>
      </div>
      {overlay && (
        <div className="wrap"><div className="flip-rtl h-px bg-gradient-to-r from-paper/20 to-paper/5" /></div>
      )}

      <div id="products-menu" hidden={!drop} onMouseEnter={openDrop} onMouseLeave={closeDropSoon}
        className="absolute inset-x-0 top-full z-40 border-y border-paper/10 bg-ink shadow-[0_24px_48px_-12px_rgba(0,0,0,.45)] max-lg:!hidden">
        <div className="wrap grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 py-10">
          <Col title={t("header.food")} links={menu.food} />
          <Col title={t("header.nonFood")} links={menu.nonFood} />
          <Col title={t("header.abuKoora")} links={menu.abuKoora} href="/brands/abu-koora" />
          <Col title={t("header.boon")} links={menu.boon} href="/brands/boon" />
        </div>
        <div className="wrap flex items-center justify-between border-t border-paper/10 py-5">
          <span className="text-[12.5px] font-light text-paper/55">{t("header.prices")}</span>
          <Link href="/products" className="text-[13px] font-semibold text-gold hover:text-gold-light">{t("header.allProducts")} <span aria-hidden="true" className="flip-rtl inline-block">&rarr;</span></Link>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-ink px-5 pb-10 pt-6 lg:hidden"
      >
        <nav aria-label={t("header.mobile")} className="flex flex-col">
          {NAV.map((n) =>
            n.key === "products" ? (
              <details key={n.href} className="group border-b border-paper/12">
                <summary className={`flex cursor-pointer list-none items-center justify-between py-5 text-[26px] font-semibold tracking-[-0.03em] [&::-webkit-details-marker]:hidden ${active(n.href) ? "text-gold" : "text-paper-bright"}`}>
                  {t(`nav.${n.key}`)}
                  <svg width="14" height="8" viewBox="0 0 10 6" fill="none" aria-hidden="true" className="transition-transform group-open:rotate-180">
                    <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </summary>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 pb-7">
                  <Col title={t("header.food")} links={menu.food} />
                  <div className="flex flex-col gap-8">
                    <Col title={t("header.nonFood")} links={menu.nonFood} />
                    <Col title={t("header.abuKoora")} links={menu.abuKoora} href="/brands/abu-koora" />
                  </div>
                  <Col title={t("header.boon")} links={menu.boon} href="/brands/boon" />
                  <div className="self-end"><Link href="/products" className="text-[13px] font-semibold text-gold">{t("header.allProducts")} <span aria-hidden="true" className="flip-rtl inline-block">&rarr;</span></Link></div>
                </div>
              </details>
            ) : (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
                className="border-b border-paper/12 py-5 text-[26px] font-semibold tracking-[-0.03em] text-paper-bright aria-[current=page]:text-gold">
                {t(`nav.${n.key}`)}
              </Link>
            ),
          )}
          <Link href="/contact" aria-current={active("/contact") ? "page" : undefined} className="border-b border-paper/12 py-5 text-[26px] font-semibold tracking-[-0.03em] text-paper-bright aria-[current=page]:text-gold">
            {t("nav.contact")}
          </Link>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Link href="/request-a-quote" className="btn btn-gold">{t("cta.quote")}</Link>
          <Link href="/partner-with-us" className="btn btn-ghost">{t("cta.partner")}</Link>
        </div>
        <div className="mt-8"><LangSwitch /></div>
      </div>
    </header>
  );
}
