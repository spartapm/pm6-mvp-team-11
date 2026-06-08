import type { KakaoNamespace } from "@/types/kakao";
import { getKakaoMapApiKey } from "./constants";

let loadPromise: Promise<KakaoNamespace> | null = null;

export function loadKakaoMapSdk(): Promise<KakaoNamespace> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Kakao Map SDK는 브라우저에서만 로드할 수 있습니다."));
  }

  const appKey = getKakaoMapApiKey();
  if (!appKey) {
    return Promise.reject(new Error("NEXT_PUBLIC_KAKAO_MAP_API_KEY가 설정되지 않았습니다."));
  }

  if (window.kakao?.maps) {
    return new Promise((resolve) => {
      window.kakao!.maps.load(() => resolve(window.kakao!));
    });
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (!window.kakao?.maps) {
          reject(new Error("Kakao Map SDK 로드에 실패했습니다."));
          return;
        }
        window.kakao.maps.load(() => resolve(window.kakao!));
      };
      script.onerror = () => {
        loadPromise = null;
        reject(new Error("Kakao Map SDK 스크립트를 불러오지 못했습니다."));
      };
      document.head.appendChild(script);
    });
  }

  return loadPromise;
}

export function createLatLng(kakao: KakaoNamespace, lat: number, lng: number) {
  return new kakao.maps.LatLng(lat, lng);
}
