"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

type Slide = { src: string; alt: string; label: string };

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = matchMedia(QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Full-bleed crossfading hero backdrop with slow drift and progress-bar controls (PRD §7 motion). */
export function HeroCarousel({ slides, children }: { slides: Slide[]; children: React.ReactNode }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useSyncExternalStore(subscribe, () => matchMedia(QUERY).matches, () => false);
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 6800);
    return () => clearInterval(id);
  }, [reduce, paused, slides.length]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="HMH trade operations"
      className="relative h-[100svh] max-h-[860px] min-h-[640px] overflow-hidden bg-ink lg:h-[884px] lg:max-h-none lg:min-h-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, n) => (
        <div key={s.src} className="hero-slide absolute inset-0" style={{ opacity: n === i ? 1 : 0 }} aria-hidden={n !== i}>
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={n === 0}
            sizes="100vw"
            className="object-cover"
            style={{ transform: `scale(${n === i && !reduce ? 1.075 : 1})` }}
          />
        </div>
      ))}
      <div className="flip-rtl absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,8,.78)_0%,rgba(6,7,8,.6)_30%,rgba(6,7,8,.86)_52%,rgba(6,7,8,.95)_100%)] lg:bg-[linear-gradient(100deg,rgba(6,7,8,.95)_0%,rgba(6,7,8,.86)_40%,rgba(6,7,8,.3)_72%,rgba(6,7,8,.46)_100%)]" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(180deg,rgba(6,7,8,.6)_0%,rgba(6,7,8,0)_22%,rgba(6,7,8,0)_58%,rgba(6,7,8,.84)_100%)] lg:block" />

      <div className="wrap relative flex h-full flex-col justify-end pb-[120px] lg:justify-center lg:pb-0">{children}</div>

      <div className="absolute inset-x-0 bottom-0 z-[5]">
        <div className="wrap flex items-end justify-between pb-8 lg:pb-[38px]">
          <div className="flex items-center gap-6">
            <span className="hidden text-[13px] font-semibold tracking-[0.04em] text-gold lg:inline" aria-hidden="true">
              0{i + 1} / 0{slides.length}
            </span>
            <span className="hidden min-w-[252px] text-[12.5px] font-medium tracking-[0.14em] text-paper/85 lg:inline" aria-live="polite">
              {slides[i].label}
            </span>
            <span className="flex gap-[7px]">
              {slides.map((s, n) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show slide ${n + 1}: ${s.label}`}
                  aria-current={n === i}
                  className="relative h-[22px] w-12 cursor-pointer"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-paper/25" />
                  <span className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 bg-gold transition-transform duration-500 rtl:origin-right" style={{ transform: `scaleX(${n === i ? 1 : 0})` }} />
                </button>
              ))}
            </span>
          </div>
          <div className="hidden items-center gap-[11px] text-[11px] font-medium tracking-[0.14em] text-paper/50 lg:flex" aria-hidden="true">
            <span>SCROLL</span>
            <svg width="11" height="26" viewBox="0 0 11 26" fill="none"><path d="M5.5 0v22M1 17.6l4.5 4.6 4.5-4.6" stroke="currentColor" strokeWidth="1.1" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
