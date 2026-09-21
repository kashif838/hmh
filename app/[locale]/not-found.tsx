import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { getMenu } from "@/lib/menu";
import { Footer } from "@/components/Footer";
import { useLocale } from "next-intl";
import { translate } from "@/lib/copy";

export default function NotFound() {
  const locale = useLocale();
  const tr = translate(locale);
  return (
    <>
      <Header menu={getMenu(locale)} />
      <main className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="t-label text-gold-deep">404</p>
        <h1 className="t-h2 mt-4">{tr("This page isn’t on the manifest.")}</h1>
        <p className="t-lead mt-5 max-w-[520px] text-muted">
          {tr("The page may have moved. Start again from the homepage, or go straight to what we trade.")}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-dark">{tr("Homepage")}</Link>
          <Link href="/products" className="btn btn-line">{tr("Products")}</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
