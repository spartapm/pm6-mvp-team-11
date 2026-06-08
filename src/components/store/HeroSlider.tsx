"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type HeroSliderProps = {
  images: string[];
  alt: string;
};

export default function HeroSlider({ images, alt }: HeroSliderProps) {
  const slides = images.length > 0 ? images : ["/images/logo.png"];
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || slides.length <= 1) return;
    const delta = event.changedTouches[0]?.clientX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative h-[260px] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={slides[index]}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="390px"
      />
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="이전 사진"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white"
          >
            ⟨
          </button>
          <button
            type="button"
            aria-label="다음 사진"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white"
          >
            ⟩
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {slides.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`size-1.5 rounded-full ${
                  dotIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
