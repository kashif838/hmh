import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { company } from "@/content/company";
import { Lockup } from "./Header";
import { FooterLink } from "./FooterLink";

type Row = [href: string, label: string, match?: string[]];

export async function Footer() {
  const t = await getTranslations();
  const cols = [
    { title: t("footer.company"), links: [["/about", "About HMH"], ["/markets", "Markets We Serve"], ["/contact", t("nav.contact")]] as Row[] },
    {
      title: t("footer.services"),
      links: [
        ["/services/import-export", "Import & Export"],
        ["/services/import-export", "Cross Trading"],
        ["/services/distribution", "Wholesale & Distribution"],
        ["/services/private-label", "Private Label"],
        ["/services", "Global Sourcing"],
      ] as Row[],
    },
    {
      title: t("footer.products"),
      links: [
        ["/products/dairy", "Dairy & Beverages", ["/products/dairy", "/products/beverages", "/products/mineral-water"]],
        ["/products/grains-commodities", "Grains & Commodities", ["/products/grains-commodities", "/products/agricultural-produce"]],
        ["/products/oils-fats", "Oils, Honey & Spices", ["/products/oils-fats", "/products/honey", "/products/spices"]],
        ["/products/canned-foods", "Canned & Confectionery", ["/products/canned-foods", "/products/biscuits-confectionery"]],
        ["/products#non-food", "Non-Food", ["/products/cosmetics-personal-care", "/products/chemicals", "/products/industrial-products"]],
      ] as Row[],
    },
  ];

  return (
    <footer className="bg-[#08090a] pb-[88px] pt-[72px] text-paper/70 lg:pb-0">
      <div className="wrap">
        <div className="flex flex-col gap-12 pb-14 lg:flex-row lg:gap-[70px]">
          <div className="lg:w-[330px] lg:shrink-0">
            <Lockup size={27} />
            <p className="mt-[22px] max-w-[288px] text-[13px] font-light leading-[1.74] text-paper/60">
              Import, export, cross-trading, wholesale distribution and private label, food and non-food, from Dubai.
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-10 md:grid-cols-4 md:gap-14">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="t-label mb-[18px] text-gold">{c.title}</h2>
                <ul className="flex flex-col gap-[11px] text-[13px] font-light">
                  {c.links.map(([href, label, match]) => (
                    <li key={label}><FooterLink href={href} match={match} className="text-paper/75">{label}</FooterLink></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h2 className="t-label mb-[18px] text-gold">{t("footer.brands")}</h2>
              <ul className="flex flex-col gap-[11px] text-[13px] font-light">
                <li><FooterLink href="/brands/boon" match={["/brands/boon", "/products/beverages/boon-"]} className="text-paper/75">Boon</FooterLink></li>
                <li><FooterLink href="/brands/abu-koora" match={["/brands/abu-koora", "/products/biscuits-confectionery/abu-koora-"]} className="text-paper/75">Abu Koora</FooterLink></li>
                <li><FooterLink href="/brands" className="text-paper/75">Bonfood</FooterLink></li>
                <li><FooterLink href="/brands" className="text-paper/75">Baba Cook</FooterLink></li>
              </ul>
              <h2 className="t-label mb-[15px] mt-7 text-gold">{t("footer.contact")}</h2>
              <p className="text-[13px] font-light leading-[1.72]">
                <a href={company.phoneHref} className="text-paper/75 hover:text-gold-light" dir="ltr">{company.phone}</a><br />
                <a href={`mailto:${company.email}`} className="text-paper/75 hover:text-gold-light">{company.email}</a>
              </p>
            </div>
          </div>
        </div>
        <div className="h-px bg-paper/12" />
        <div className="flex flex-col gap-4 py-6 text-[12.5px] font-light text-paper/45 md:flex-row md:items-center md:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {company.legalName} &middot; {company.city}, {company.country}
            <span className="mx-2">|</span>
            {t("footer.poweredBy")}{" "}
            <a href={company.saabify} target="_blank" rel="noopener" className="font-medium text-gold hover:text-gold-light">Saabify</a>
          </span>
          <span className="flex gap-6">
            <FooterLink href="/privacy-policy" className="text-paper/55">{t("footer.privacy")}</FooterLink>
            <FooterLink href="/terms" className="text-paper/55">{t("footer.terms")}</FooterLink>
            <a href="#top" className="text-paper/55 hover:text-gold-light">{t("footer.top")}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export async function MobileBar() {
  const t = await getTranslations();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-center gap-[9px] border-t border-paper/14 bg-ink/92 px-4 backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <a href={company.phoneHref} className="btn btn-ghost flex-1 !px-2 !text-[11px]" data-track="tel_click">{t("cta.call")}</a>
      <a href={`mailto:${company.email}`} className="btn btn-ghost flex-1 !px-2 !text-[11px]" data-track="mailto_click">{t("cta.email")}</a>
      <Link href="/request-a-quote" className="btn btn-gold flex-[1.5] !px-2 !text-[11px]">{t("cta.quote")}</Link>
    </div>
  );
}
