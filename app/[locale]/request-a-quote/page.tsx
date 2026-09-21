import { setRequestLocale } from "next-intl/server";
import { Shell } from "@/components/Shell";
import { FormPage } from "@/components/FormPage";
import { Icon } from "@/components/Icons";
import { pageMeta } from "@/lib/seo";
import { translate } from "@/lib/copy";

export async function generateMetadata({ params }: PageProps<"/[locale]/request-a-quote">) {
  const { locale } = await params;
  const tr = translate(locale);
  return pageMeta({ title: tr("Request a Quote"), description: tr("Request a quotation from HMH General Trading: send the product, volume, destination port and Incoterm."), path: "/request-a-quote", locale });
}

export default async function QuotePage({ params }: PageProps<"/[locale]/request-a-quote">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tr = translate(locale);
  return (
    <Shell>
      <FormPage
        kind="quote"
        path="/request-a-quote"
        name={tr("Request a Quote")}
        title={tr("Request a")}
        highlight={tr("quotation")}
        lead={tr("Send the category or product, the volume, the destination and the Incoterm you trade on. We come back with a quotation, not a brochure.")}
        aside={
          <ul data-reveal className="mt-8 list-none border-b border-ink-3/11 p-0">
            {[["moq", "Minimum order", "Quoted per order"], ["clock", "Lead time", "Confirmed on quotation"], ["doc", "Incoterms", "EXW, FOB, CFR, CIF or DAP"]].map(([i, t, b]) => (
              <li key={t} className="flex items-start gap-4 border-t border-ink-3/11 py-4">
                <span className="shrink-0 text-gold-deep"><Icon name={i as "moq"} size={22} /></span>
                <span><span className="block text-[14.5px] font-semibold">{tr(t)}</span><span className="block text-[13px] font-light text-muted">{tr(b)}</span></span>
              </li>
            ))}
          </ul>
        }
      />
    </Shell>
  );
}
