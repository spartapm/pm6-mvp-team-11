"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/data/figma-assets";
import {
  FARM_MARKER_SIZE_PX,
  GYEONGBOKGUNG,
  HOME_MAP_INITIAL_LEVEL,
  PICKUP_RADIUS_M,
  USER_MARKER_WIDTH_PX,
  USER_MARKER_HEIGHT_PX,
  hasKakaoMapApiKey,
} from "@/lib/kakao/constants";
import { getHomeMapGeoBounds } from "@/lib/kakao/geo";
import {
  attachHomeMapPanRestriction,
  createKakaoBoundsFromGeo,
} from "@/lib/kakao/home-map-restrict";
import type { KakaoMap, KakaoMarker } from "@/types/kakao";
import { createLatLng, loadKakaoMapSdk } from "@/lib/kakao/load-script";
import { useMapRelayout } from "@/lib/kakao/use-map-relayout";
import { routes } from "@/lib/routes";
import type { Farm } from "@/lib/types";

type KakaoHomeMapProps = {
  farms: Farm[];
  onError?: () => void;
};

function resolveAssetUrl(url: string) {
  if (url.startsWith("http")) return url;
  if (typeof window === "undefined") return url;
  return `${window.location.origin}${url}`;
}

function fitHomeMapView(
  kakao: import("@/types/kakao").KakaoNamespace,
  map: KakaoMap,
  farms: Farm[],
) {
  const geoBounds = getHomeMapGeoBounds(
    GYEONGBOKGUNG.lat,
    GYEONGBOKGUNG.lng,
    PICKUP_RADIUS_M,
    farms.map((farm) => farm.location),
  );
  const bounds = createKakaoBoundsFromGeo(kakao, geoBounds);
  map.setBounds(bounds);
  map.setMaxLevel(map.getLevel());
  return bounds;
}

export default function KakaoHomeMap({ farms, onError }: KakaoHomeMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMap | null>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useMapRelayout(mapRef, status === "ready");

  useEffect(() => {
    if (!hasKakaoMapApiKey() || !mapContainerRef.current) {
      setStatus("error");
      setErrorMessage("NEXT_PUBLIC_KAKAO_MAP_API_KEY를 .env.local에 설정해주세요.");
      return;
    }

    let cancelled = false;
    const markers: KakaoMarker[] = [];
    let detachPanRestriction: (() => void) | undefined;

    loadKakaoMapSdk()
      .then((kakao) => {
        if (cancelled || !mapContainerRef.current) return;

        const center = createLatLng(
          kakao,
          GYEONGBOKGUNG.lat,
          GYEONGBOKGUNG.lng,
        );

        const map = new kakao.maps.Map(mapContainerRef.current, {
          center,
          level: HOME_MAP_INITIAL_LEVEL,
        });
        mapRef.current = map;

        new kakao.maps.Circle({
          map,
          center,
          radius: PICKUP_RADIUS_M,
          strokeWeight: 2,
          strokeColor: "#33b266",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
          fillColor: "#33b266",
          fillOpacity: 0.12,
        });

        const userMarkerImage = new kakao.maps.MarkerImage(
          resolveAssetUrl(assets.mapUserPin),
          new kakao.maps.Size(USER_MARKER_WIDTH_PX, USER_MARKER_HEIGHT_PX),
          {
            offset: new kakao.maps.Point(
              USER_MARKER_WIDTH_PX / 2,
              USER_MARKER_HEIGHT_PX,
            ),
            alt: GYEONGBOKGUNG.label,
          },
        );

        new kakao.maps.Marker({
          map,
          position: center,
          image: userMarkerImage,
          title: GYEONGBOKGUNG.label,
          zIndex: 2,
        });

        farms.forEach((farm) => {
          const position = createLatLng(
            kakao,
            farm.location.lat,
            farm.location.lng,
          );

          const markerImage = new kakao.maps.MarkerImage(
            resolveAssetUrl(farm.mapMarkerUrl),
            new kakao.maps.Size(FARM_MARKER_SIZE_PX, FARM_MARKER_SIZE_PX),
            {
              offset: new kakao.maps.Point(
                FARM_MARKER_SIZE_PX / 2,
                FARM_MARKER_SIZE_PX,
              ),
              alt: farm.name,
            },
          );

          const marker = new kakao.maps.Marker({
            map,
            position,
            image: markerImage,
            title: farm.name,
            zIndex: 1,
          });

          kakao.maps.event.addListener(marker, "click", () => {
            router.push(routes.store(farm.id));
          });

          markers.push(marker);
        });

        const panBounds = fitHomeMapView(kakao, map, farms);
        detachPanRestriction = attachHomeMapPanRestriction(kakao, map, panBounds);
        setStatus("ready");
      })
      .catch((error: Error) => {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(error.message);
          onError?.();
        }
      });

    return () => {
      cancelled = true;
      detachPanRestriction?.();
      markers.forEach((marker) => marker.setMap(null));
      mapRef.current = null;
    };
  }, [farms, router, onError]);

  const moveToCurrentLocation = () => {
    if (!mapRef.current) return;
    loadKakaoMapSdk().then((kakao) => {
      fitHomeMapView(kakao, mapRef.current!, farms);
    });
  };

  return (
    <div className="relative h-[clamp(200px,38dvh,386px)] w-full shrink-0">
      <div ref={mapContainerRef} className="h-full w-full" />

      {status === "loading" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-[#808080]">
          지도 불러오는 중...
        </div>
      ) : null}

      {status === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 px-6 text-center text-xs leading-relaxed text-[#808080]">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="button"
        aria-label="현재 위치(경복궁)로 이동"
        onClick={moveToCurrentLocation}
        disabled={status !== "ready"}
        className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full bg-white text-lg shadow-md disabled:opacity-50"
      >
        📍
      </button>
    </div>
  );
}
