"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/data/figma-assets";
import { FARM_INFO_MAP_LOCATION, hasKakaoMapApiKey } from "@/lib/kakao/constants";
import { resolveMapLocation } from "@/lib/kakao/geocode";
import type { KakaoMap, KakaoRoadview } from "@/types/kakao";
import { createLatLng, loadKakaoMapSdk } from "@/lib/kakao/load-script";
import { useMapRelayout } from "@/lib/kakao/use-map-relayout";

type KakaoFarmMapViewProps = {
  lat: number;
  lng: number;
  address?: string;
  farmName: string;
  fallbackImageUrl: string;
};

export default function KakaoFarmMapView({
  lat,
  lng,
  address = FARM_INFO_MAP_LOCATION.address,
  farmName,
  fallbackImageUrl,
}: KakaoFarmMapViewProps) {
  const roadviewRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMapRef = useRef<KakaoMap | null>(null);
  const kakaoMarkerRef = useRef<import("@/types/kakao").KakaoMarker | null>(null);
  const kakaoRoadviewRef = useRef<KakaoRoadview | null>(null);
  const mapPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  const [mode, setMode] = useState<"roadview" | "map">("roadview");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useMapRelayout(kakaoMapRef, status === "ready" && mode === "map");

  useEffect(() => {
    if (!hasKakaoMapApiKey()) {
      setStatus("error");
      setErrorMessage("NEXT_PUBLIC_KAKAO_MAP_API_KEY를 .env.local에 설정해주세요.");
      return;
    }

    let cancelled = false;

    loadKakaoMapSdk()
      .then(async (kakao) => {
        if (cancelled) return;

        const resolved = await resolveMapLocation(kakao, address, { lat, lng });
        const position = createLatLng(kakao, resolved.lat, resolved.lng);
        mapPositionRef.current = { lat: resolved.lat, lng: resolved.lng };

        if (roadviewRef.current) {
          const roadview = new kakao.maps.Roadview(roadviewRef.current);
          const roadviewClient = new kakao.maps.RoadviewClient();
          kakaoRoadviewRef.current = roadview;

          roadviewClient.getNearestPanoId(position, 200, (panoId) => {
            if (cancelled) return;
            if (panoId) {
              roadview.setPanoId(panoId, position);
              setStatus("ready");
            } else {
              setMode("map");
              setStatus("ready");
            }
          });
        } else {
          setStatus("ready");
        }
      })
      .catch((error: Error) => {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(error.message);
        }
      });

    return () => {
      cancelled = true;
      kakaoMapRef.current = null;
      kakaoMarkerRef.current = null;
      kakaoRoadviewRef.current = null;
      mapPositionRef.current = null;
    };
  }, [address, lat, lng, farmName]);

  useEffect(() => {
    if (status !== "ready") return;

    if (mode === "roadview") {
      kakaoRoadviewRef.current?.relayout();
      return;
    }

    const mapPosition = mapPositionRef.current;
    if (!mapPosition || !mapRef.current) return;

    let cancelled = false;

    loadKakaoMapSdk().then((kakao) => {
      if (cancelled || !mapRef.current || !mapPositionRef.current) return;

      const mapEl = mapRef.current;
      const position = createLatLng(kakao, mapPosition.lat, mapPosition.lng);
      let map = kakaoMapRef.current;

      if (!map) {
        map = new kakao.maps.Map(mapEl, {
          center: position,
          level: 3,
        });
        const marker = new kakao.maps.Marker({ map, position, title: farmName });
        kakaoMapRef.current = map;
        kakaoMarkerRef.current = marker;
      } else {
        map.relayout();
        map.setCenter(position);
        const marker = kakaoMarkerRef.current;
        if (marker) {
          marker.setMap(null);
          marker.setMap(map);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [mode, status, farmName]);

  if (status === "error") {
    return (
      <div className="relative h-[265px] w-full overflow-hidden">
        <Image
          src={fallbackImageUrl || assets.logo}
          alt={`${farmName} 대표 이미지`}
          fill
          className="object-cover"
          sizes="390px"
        />
        <div className="absolute inset-0 flex items-end justify-center bg-black/20 px-6 pb-4 text-center text-xs text-white">
          {errorMessage}
        </div>
        <div className="absolute bottom-3 right-3 z-10 flex overflow-hidden rounded-full bg-white shadow-md">
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

  return (
    <div className="relative h-[265px] w-full">
      <div
        ref={roadviewRef}
        className={`absolute inset-0 ${mode === "roadview" ? "block" : "hidden"}`}
      />
      <div
        ref={mapRef}
        className={`absolute inset-0 ${mode === "map" ? "block" : "hidden"}`}
      />

      {status === "loading" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-[#808080]">
          로드뷰 불러오는 중...
        </div>
      ) : null}

      <div className="absolute bottom-3 right-3 z-10 flex overflow-hidden rounded-full bg-white shadow-md">
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
