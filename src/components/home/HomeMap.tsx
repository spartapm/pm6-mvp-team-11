"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import KakaoHomeMap from "@/components/map/KakaoHomeMap";
import { assets } from "@/data/figma-assets";
import { hasKakaoMapApiKey } from "@/lib/kakao/constants";
import type { Farm } from "@/lib/types";
import { routes } from "@/lib/routes";

type HomeMapProps = {
  farms: Farm[];
  onMapError?: () => void;
};

function StaticHomeMap({ farms }: HomeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const moveToCurrentLocation = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div ref={mapRef} className="relative h-[clamp(200px,38dvh,386px)] w-full shrink-0 overflow-hidden">
      <Image
        src={assets.map}
        alt="내 주변 농부 지도 (반경 7km)"
        fill
        className="object-cover"
        priority
        sizes="390px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-28 rounded-full border-2 border-[#33b266]/40 bg-[#33b266]/10" />
      </div>

      <div
        className="absolute z-10 size-[60px] -translate-x-1/2 -translate-y-full"
        style={{ top: "40.2%", left: "41.6%" }}
      >
        <Image
          src={assets.mapUserPin}
          alt="현재 위치"
          width={60}
          height={60}
          className="size-[60px] object-contain"
        />
      </div>

      {farms.map((farm) => (
        <Link
          key={farm.id}
          href={routes.store(farm.id)}
          aria-label={`${farm.name} 상점 보기`}
          className="absolute z-[1] size-[45px] -translate-x-1/2 -translate-y-full"
          style={{ top: farm.mapMarker.top, left: farm.mapMarker.left }}
        >
          <Image
            src={farm.mapMarkerUrl}
            alt={farm.name}
            width={45}
            height={45}
            className="size-[45px] object-contain"
          />
        </Link>
      ))}

      <button
        type="button"
        aria-label="현재 위치로 이동"
        onClick={moveToCurrentLocation}
        className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-white text-lg shadow-md"
      >
        📍
      </button>
    </div>
  );
}

export default function HomeMap({ farms, onMapError }: HomeMapProps) {
  if (hasKakaoMapApiKey()) {
    return <KakaoHomeMap farms={farms} onError={onMapError} />;
  }

  return <StaticHomeMap farms={farms} />;
}
