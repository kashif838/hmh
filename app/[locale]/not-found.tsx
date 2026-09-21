import { Link } from "@/i18n/navigation";
import { Header } from "@/components/Header";
import { getMenu } from "@/lib/menu";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header menu={getMenu()} />
      <main className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="t-label text-gold-deep">404</p>
        <h1 className="t-h2 mt-4">This page isn&rsquo;t on the manifest.</h1>
        <p className="t-lead mt-5 max-w-[520px] text-muted">
          The page may have moved. Start again from the homepage, or go straight to what we trade.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-dark">Homepage</Link>
          <Link href="/products" className="btn btn-line">Products</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
