"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { assets } from "@/data/figma-assets";
import { FARMS } from "@/data/mock-data";
import FarmListItem from "@/components/home/FarmListItem";
import HomeMap from "@/components/home/HomeMap";

export default function HomeContent() {
  const [reloadKey, setReloadKey] = useState(0);
  const [resolvedKey, setResolvedKey] = useState(-1);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setResolvedKey(reloadKey);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [reloadKey]);

  const isLoading = resolvedKey !== reloadKey;

  if (hasError) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <p className="text-sm text-[#808080]">데이터를 불러오지 못했습니다</p>
        <button
          type="button"
          onClick={() => {
            setHasError(false);
            setReloadKey((prev) => prev + 1);
          }}
          className="rounded-[14px] bg-[#33b266] px-6 py-3 text-sm font-bold text-white transition-transform active:scale-95"
        >
          재시도
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-white">
        <Image src={assets.logo} alt="우리동네 농부" width={120} height={46} priority />
        <p className="text-sm font-medium text-[#808080]">수확중</p>
      </div>
    );
  }

  if (FARMS.length === 0) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 text-center">
        <p className="text-sm text-[#808080]">
          주변 7km 내 판매 중인 농산물이 없습니다
        </p>
      </div>
    );
  }

  const farms = [...FARMS].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <div className="flex h-[55px] shrink-0 items-center overflow-hidden pl-1 pt-[env(safe-area-inset-top,0px)]">
        <Image
          src={assets.logo}
          alt="우리동네 농부"
          width={134}
          height={51}
          priority
          className="h-[51px] w-auto origin-left -translate-x-[32%] scale-[2.7]"
        />
      </div>

      <div className="px-4 pb-3">
        <button
          type="button"
          className="relative flex h-[34px] w-full items-center rounded-full border border-[#33b266] bg-white px-4 text-left"
        >
          <span className="truncate text-[13px] font-medium text-[#abafad]">
            상품 검색 (테스트버전에서는 작동 안됩니다.)
          </span>
          <span className="absolute right-4 text-lg">🔍</span>
        </button>
      </div>

      <HomeMap
        key={reloadKey}
        farms={farms}
        onMapError={() => setHasError(true)}
      />

      <section className="-mt-4 min-h-0 flex-1 overflow-y-auto rounded-t-[15px] bg-white shadow-[inset_0_1px_1px_rgba(0,0,0,0.25)]">
        <h2 className="sticky top-0 z-10 bg-white px-2.5 pb-2 pt-4 text-base font-bold text-[#1a1a1a]">
          내 주변 농부
        </h2>
        <div>
          {farms.map((farm) => (
            <FarmListItem key={farm.id} farm={farm} />
          ))}
        </div>
      </section>
    </div>
  );
}
