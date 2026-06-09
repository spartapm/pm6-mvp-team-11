"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroSliderProps = {
  images: string[];
  alt: string;
};

function isCertificateSlide(src: string) {
  return src.includes("/certificates/");
}

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

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(goNext, 4000);
    return () => window.clearInterval(timer);
  }, [goNext, slides.length]);

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
      className="relative h-[260px] w-full overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, slideIndex) => {
          const isCertificate = isCertificateSlide(slide);

          return (
            <div
              key={`${slide}-${slideIndex}`}
              className={`relative h-full w-full shrink-0 ${
                isCertificate ? "bg-[#f5f5f5]" : "bg-black"
              }`}
            >
              <Image
                src={slide}
                alt={
                  isCertificate ? `${alt} 사업자등록증` : `${alt} ${slideIndex + 1}`
                }
                fill
                className={
                  isCertificate ? "object-contain p-3" : "object-cover"
                }
                priority={slideIndex === 0}
                sizes="390px"
              />
            </div>
          );
        })}
      </div>
      {slides.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`${dotIndex + 1}번째 사진`}
              onClick={() => setIndex(dotIndex)}
              className={`size-1.5 rounded-full ${
                dotIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
