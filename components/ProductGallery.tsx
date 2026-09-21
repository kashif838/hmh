"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Img = { src: string; alt: string; label: string };

export function ProductGallery({ images, brand, name }: { images: Img[]; brand: string; name: string }) {
  const t = useTranslations("gallery");
  const [i, setI] = useState(0);

  if (images.length === 0) {
    // Varieties without a packshot get a typographic stage, never a stand-in photo.
    return (
      <div className="relative flex h-[380px] flex-col items-center justify-center gap-3 bg-off-white md:h-[520px] lg:h-[640px]">
        <span className="text-[44px] font-bold tracking-[0.04em] text-ink-3 lg:text-[64px]">{brand.toUpperCase()}</span>
        <span className="text-[16px] font-light text-muted">{name}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[380px] overflow-hidden bg-off-white md:h-[520px] lg:h-[640px]">
        {images.map((img, n) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={n === 0}
            sizes="(min-width:1024px) 58vw, 100vw"
            aria-hidden={n !== i}
            className="object-contain p-8 transition-opacity duration-[450ms] lg:p-14"
            style={{ opacity: n === i ? 1 : 0 }}
          />
        ))}
        <span className="t-label absolute bottom-[22px] start-6 text-muted" aria-live="polite">{images[i].label}</span>
        <span className="absolute bottom-[22px] end-6 text-[12.5px] font-medium text-muted">{i + 1} / {images.length}</span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-[10px] overflow-x-auto">
          {images.map((img, n) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={t("show", { label: img.label })}
              aria-pressed={n === i}
              className={`relative h-[84px] w-[84px] shrink-0 cursor-pointer border bg-off-white p-[10px] transition-colors lg:h-[104px] lg:w-[104px] ${n === i ? "border-ink-3" : "border-transparent hover:border-ink-3/25"}`}
            >
              <Image src={img.src} alt="" fill sizes="104px" className="object-contain p-[10px]" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
