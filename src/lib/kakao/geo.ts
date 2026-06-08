/** 경복궁 기준 거리·방위각으로 좌표 계산 (와이어프레임 핀 배치용) */
export function locationFromDistanceBearing(
  lat: number,
  lng: number,
  distanceKm: number,
  bearingDeg: number,
) {
  const earthRadiusKm = 6371;
  const angularDistance = distanceKm / earthRadiusKm;
  const bearing = (bearingDeg * Math.PI) / 180;
  const lat1 = (lat * Math.PI) / 180;
  const lng1 = (lng * Math.PI) / 180;

  const lat2 = Math.asin(
    Math.sin(lat1) * Math.cos(angularDistance) +
      Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(bearing),
  );
  const lng2 =
    lng1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(lat1),
      Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2),
    );

  return {
    lat: (lat2 * 180) / Math.PI,
    lng: (lng2 * 180) / Math.PI,
  };
}

/** 와이어프레임(389×386) 핀 방위각 — 경복궁 중심 기준 */
export const WIREFRAME_FARM_BEARINGS = {
  potato: 322,
  corn: 5,
  grape: 272,
  strawberry: 97,
  carrot: 169,
} as const;

export function offsetLatLngByMeters(
  lat: number,
  lng: number,
  northMeters: number,
  eastMeters: number,
) {
  const dLat = northMeters / 111_320;
  const dLng = eastMeters / (111_320 * Math.cos((lat * Math.PI) / 180));
  return { lat: lat + dLat, lng: lng + dLng };
}

export function getPickupCircleBounds(
  lat: number,
  lng: number,
  radiusM: number,
) {
  const north = offsetLatLngByMeters(lat, lng, radiusM, 0);
  const south = offsetLatLngByMeters(lat, lng, -radiusM, 0);
  const east = offsetLatLngByMeters(lat, lng, 0, radiusM);
  const west = offsetLatLngByMeters(lat, lng, 0, -radiusM);

  return { north, south, east, west };
}

export type GeoBounds = {
  south: number;
  north: number;
  west: number;
  east: number;
};

/** 홈 지도 초기 setBounds와 동일한 위·경도 범위 */
export function getHomeMapGeoBounds(
  centerLat: number,
  centerLng: number,
  radiusM: number,
  farmLocations: { lat: number; lng: number }[],
): GeoBounds {
  const circleBounds = getPickupCircleBounds(centerLat, centerLng, radiusM);
  let south = Math.min(centerLat, circleBounds.south.lat);
  let north = Math.max(centerLat, circleBounds.north.lat);
  let west = Math.min(centerLng, circleBounds.west.lng);
  let east = Math.max(centerLng, circleBounds.east.lng);

  for (const { lat, lng } of farmLocations) {
    south = Math.min(south, lat);
    north = Math.max(north, lat);
    west = Math.min(west, lng);
    east = Math.max(east, lng);
  }

  return { south, north, west, east };
}
