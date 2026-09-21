import { getTranslations } from "next-intl/server";
import { Header } from "./Header";
import { Footer, MobileBar } from "./Footer";
import { getMenu } from "@/lib/menu";

export async function Shell({ children, overlay = false }: { children: React.ReactNode; overlay?: boolean }) {
  const t = await getTranslations("nav");
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-3 focus:text-ink">
        {t("skip")}
      </a>
      <Header overlay={overlay} menu={getMenu()} />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
