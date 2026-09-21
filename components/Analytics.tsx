"use client";

import { useEffect } from "react";

type Gtag = (cmd: "event", name: string, params?: Record<string, string>) => void;

export function track(name: string, params?: Record<string, string>) {
  (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
}

/** Sends tel/mailto clicks and anything marked data-track to GA4, when GA is configured. */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name = a.dataset.track ?? (href.startsWith("tel:") ? "tel_click" : href.startsWith("mailto:") ? "mailto_click" : "");
      if (name) track(name, { page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
