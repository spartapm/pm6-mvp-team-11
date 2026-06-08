import type { KakaoNamespace } from "@/types/kakao";

type GeocodedLocation = {
  lat: number;
  lng: number;
};

export function geocodeAddress(
  kakao: KakaoNamespace,
  address: string,
): Promise<GeocodedLocation> {
  return new Promise((resolve, reject) => {
    if (!kakao.maps.services?.Geocoder) {
      reject(new Error("Kakao Geocoder를 사용할 수 없습니다."));
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        resolve({
          lat: Number.parseFloat(result[0].y),
          lng: Number.parseFloat(result[0].x),
        });
        return;
      }

      reject(new Error("주소 좌표를 찾지 못했습니다."));
    });
  });
}

export async function resolveMapLocation(
  kakao: KakaoNamespace,
  address: string,
  fallback: GeocodedLocation,
): Promise<GeocodedLocation> {
  try {
    return await geocodeAddress(kakao, address);
  } catch {
    return fallback;
  }
}
