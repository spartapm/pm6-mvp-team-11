"use client";

import Image from "next/image";
import { useState } from "react";
import KakaoFarmMapView from "@/components/map/KakaoFarmMapView";
import { assets } from "@/data/figma-assets";
import { hasKakaoMapApiKey } from "@/lib/kakao/constants";

type FarmMapViewProps = {
  lat: number;
  lng: number;
  address?: string;
  farmName: string;
  roadviewImageUrl: string;
  mapImageUrl?: string;
  alt: string;
};

function StaticFarmMapView({
  roadviewImageUrl,
  mapImageUrl = assets.map,
  alt,
}: Omit<FarmMapViewProps, "lat" | "lng" | "farmName">) {
  const [mode, setMode] = useState<"roadview" | "map">("roadview");

  return (
    <div className="relative">
      <div className="relative h-[265px] w-full">
        <Image
          src={mode === "roadview" ? roadviewImageUrl : mapImageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="402px"
        />
      </div>
      <div className="absolute bottom-3 right-3 flex overflow-hidden rounded-full bg-white shadow-md">
        <button
          type="button"
          onClick={() => setMode("roadview")}
          className={`px-3 py-1.5 text-xs font-semibold ${
            mode === "roadview" ? "bg-[#33b266] text-white" : "text-[#1a1a1a]"
          }`}
        >
          로드뷰
        </button>
        <button
          type="button"
          onClick={() => setMode("map")}
          className={`px-3 py-1.5 text-xs font-semibold ${
            mode === "map" ? "bg-[#33b266] text-white" : "text-[#1a1a1a]"
          }`}
        >
          지도
        </button>
      </div>
    </div>
  );
}

export default function FarmMapView({
  lat,
  lng,
  address,
  farmName,
  roadviewImageUrl,
  mapImageUrl,
  alt,
}: FarmMapViewProps) {
  if (hasKakaoMapApiKey()) {
    return (
      <KakaoFarmMapView
        lat={lat}
        lng={lng}
        address={address}
        farmName={farmName}
        fallbackImageUrl={roadviewImageUrl}
      />
    );
  }

  return (
    <StaticFarmMapView
      roadviewImageUrl={roadviewImageUrl}
      mapImageUrl={mapImageUrl}
      alt={alt}
    />
  );
}
