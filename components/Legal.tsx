import { Breadcrumbs } from "./Page";

export function Legal({ name, path, sections }: { name: string; path: string; sections: [string, string][] }) {
  return (
    <>
      <Breadcrumbs items={[{ name, path }]} />
      <section className="bg-white pb-24 pt-10 lg:pb-32 lg:pt-14">
        <div className="wrap">
          <h1 className="t-h2">{name}</h1>
          <div className="mt-12 max-w-[720px] border-b border-ink-3/11">
            {sections.map(([h, p]) => (
              <div key={h} className="border-t border-ink-3/11 py-7">
                <h2 className="text-[19px] tracking-[-0.022em]">{h}</h2>
                <p className="mt-3 text-[15px] font-light leading-[1.74] text-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
