"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import { use, useEffect, useRef } from "react";
import OverlayHeader from "@/components/layout/OverlayHeader";
import HeroSlider from "@/components/store/HeroSlider";
import ProductCard from "@/components/store/ProductCard";
import ReviewCard from "@/components/store/ReviewCard";
import { useCart } from "@/context/cart-context";
import { assets } from "@/data/figma-assets";
import { getFarmById } from "@/data/mock-data";
import { formatReviewCount, formatReviewTitle } from "@/lib/format";
import { routes } from "@/lib/routes";

type StorePageProps = {
  params: Promise<{ farmId: string }>;
};

export default function StorePageClient({ params }: StorePageProps) {
  const { farmId } = use(params);
  const farm = getFarmById(farmId);
  const { addItem, totalCount } = useCart();
  const searchParams = useSearchParams();
  const reviewsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (searchParams.get("focus") === "reviews") {
      reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  if (!farm) notFound();

  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[max(6rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))]">
      <div className="relative">
        <HeroSlider images={farm.heroImages} alt={farm.name} />
        <OverlayHeader backHref={routes.home} cartCount={totalCount} />
      </div>

      <section className="relative -mt-4 bg-white px-4 pb-4 pt-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
            <Image
              src={farm.profileImageUrl || assets.logo}
              alt={`${farm.name} 프로필`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h1 className="truncate text-lg font-bold text-[#1a1a1a]">{farm.name}</h1>
              <Link
                href={routes.storeInfo(farm.id)}
                className="shrink-0 text-[13px] font-medium text-[#8e8e93]"
              >
                농장 정보 {">"}
              </Link>
            </div>
            <p className="mt-1 text-sm font-semibold text-[#f2b21a]">
              ★ {farm.rating}{" "}
              <span className="font-normal text-[#808080]">
                ({formatReviewCount(farm.reviewCount)})
              </span>
            </p>
            <p className="mt-1 truncate text-xs text-[#808080]">
              픽업 장소: {farm.pickupLocation}
            </p>
            {farm.isOrganic ? (
              <Image
                src={assets.organicBadge}
                alt="유기농"
                width={54}
                height={16}
                className="mt-2"
              />
            ) : null}
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#f5f5f5]" />

      <section className="px-4 py-5">
        <h2 className="text-base font-bold text-[#1a1a1a]">상품 정보</h2>
        <div className="mt-4 space-y-3">
          {farm.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addItem(product.id, farm.id)}
            />
          ))}
        </div>
      </section>

      <div className="h-2 bg-[#f5f5f5]" />

      <section ref={reviewsRef} id="reviews" className="scroll-mt-4 px-4 py-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1a1a1a]">
            {formatReviewTitle(farm.reviewCount)}
          </h2>
          {farm.reviews.length > 0 ? (
            <Link
              href={routes.storeReviews(farm.id)}
              className="text-[13px] font-medium text-[#8e8e93]"
            >
              전체 보기 {">"}
            </Link>
          ) : null}
        </div>
        {farm.reviews.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto pb-1">
            {farm.reviews.slice(0, 2).map((review) => (
              <ReviewCard key={review.id} review={review} compact />
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-[#808080]">
            첫번째 후기를 남겨보세요
          </p>
        )}
      </section>

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[390px] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2">
        <Link
          href={routes.cart}
          className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#33b266] text-[17px] font-bold text-white transition-transform active:scale-95"
        >
          구매하기
        </Link>
      </div>
    </div>
  );
}
