"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** One observer for the whole page: fades [data-reveal] / [data-rise] elements in as they enter view. */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in]),[data-rise]:not([data-in])");
    const show = (el: Element) => el.setAttribute("data-in", "");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      nodes.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
