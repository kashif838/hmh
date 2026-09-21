import { Breadcrumbs } from "./Page";
import { EnquiryForm } from "./EnquiryForm";
import { Hl } from "./Sections";
import { company } from "@/content/company";
import type { EnquiryKind } from "@/app/actions/enquiry";

/** T5: title, form and direct contact routes. */
export function FormPage({
  kind, path, name, title, highlight, lead, aside,
}: {
  kind: EnquiryKind; path: string; name: string; title: string; highlight: string; lead: string; aside?: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ name, path }]} />
      <section className="bg-white pb-24 pt-10 lg:pb-32 lg:pt-14">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5 lg:pe-10">
            <h1 data-reveal className="t-h2">{title} <Hl>{highlight}</Hl></h1>
            <p data-reveal className="t-lead mt-6 text-body">{lead}</p>
            {aside}
            <div data-reveal className="mt-10 border-t border-ink-3/11 pt-8">
              <p className="t-label m-0 text-gold-deep">Direct</p>
              <p className="mt-4"><a href={company.phoneHref} dir="ltr" className="text-[22px] font-semibold tracking-[-0.024em] hover:text-gold-deep">{company.phone}</a></p>
              <p className="mt-[6px]"><a href={`mailto:${company.email}`} className="text-[14px] text-gold-deep hover:text-ink-3">{company.email}</a></p>
              <p className="mt-4 text-[13px] font-light leading-[1.6] text-muted">{company.legalName}<br />{company.city}, {company.country}</p>
            </div>
          </div>
          <div data-reveal className="lg:col-span-7 lg:col-start-6"><EnquiryForm kind={kind} /></div>
        </div>
      </section>
    </>
  );
}
