import type { GeoBounds } from "@/lib/kakao/geo";
import type { KakaoLatLngBounds, KakaoMap, KakaoNamespace } from "@/types/kakao";
import { createLatLng } from "@/lib/kakao/load-script";

export function createKakaoBoundsFromGeo(
  kakao: KakaoNamespace,
  bounds: GeoBounds,
): KakaoLatLngBounds {
  const latLngBounds = new kakao.maps.LatLngBounds();
  latLngBounds.extend(createLatLng(kakao, bounds.south, bounds.west));
  latLngBounds.extend(createLatLng(kakao, bounds.north, bounds.east));
  return latLngBounds;
}

export function clampMapCenterToBounds(
  kakao: KakaoNamespace,
  map: KakaoMap,
  maxBounds: KakaoLatLngBounds,
) {
  const center = map.getCenter();
  const viewBounds = map.getBounds();
  const viewSouthWest = viewBounds.getSouthWest();
  const viewNorthEast = viewBounds.getNorthEast();
  const maxSouthWest = maxBounds.getSouthWest();
  const maxNorthEast = maxBounds.getNorthEast();

  const latSpan = viewNorthEast.getLat() - viewSouthWest.getLat();
  const lngSpan = viewNorthEast.getLng() - viewSouthWest.getLng();
  const maxLatSpan = maxNorthEast.getLat() - maxSouthWest.getLat();
  const maxLngSpan = maxNorthEast.getLng() - maxSouthWest.getLng();

  let lat = center.getLat();
  let lng = center.getLng();

  if (latSpan >= maxLatSpan) {
    lat = (maxSouthWest.getLat() + maxNorthEast.getLat()) / 2;
  } else {
    const minLat = maxSouthWest.getLat() + latSpan / 2;
    const maxLat = maxNorthEast.getLat() - latSpan / 2;
    lat = Math.min(maxLat, Math.max(minLat, lat));
  }

  if (lngSpan >= maxLngSpan) {
    lng = (maxSouthWest.getLng() + maxNorthEast.getLng()) / 2;
  } else {
    const minLng = maxSouthWest.getLng() + lngSpan / 2;
    const maxLng = maxNorthEast.getLng() - lngSpan / 2;
    lng = Math.min(maxLng, Math.max(minLng, lng));
  }

  if (lat !== center.getLat() || lng !== center.getLng()) {
    map.setCenter(createLatLng(kakao, lat, lng));
  }
}

export function attachHomeMapPanRestriction(
  kakao: KakaoNamespace,
  map: KakaoMap,
  maxBounds: KakaoLatLngBounds,
) {
  const handler = () => clampMapCenterToBounds(kakao, map, maxBounds);

  kakao.maps.event.addListener(map, "center_changed", handler);
  kakao.maps.event.addListener(map, "zoom_changed", handler);

  return () => {
    kakao.maps.event.removeListener(map, "center_changed", handler);
    kakao.maps.event.removeListener(map, "zoom_changed", handler);
  };
}
