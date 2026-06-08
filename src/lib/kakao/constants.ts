/** 경복궁 좌표 (현재 위치 고정) */
export const GYEONGBOKGUNG = {
  lat: 37.579617,
  lng: 126.977041,
  label: "경복궁",
} as const;

/** 픽업 가능 반경 (기능명세서: 7km) */
export const PICKUP_RADIUS_M = 7000;

/** 농장 정보 페이지 로드뷰/지도 위치 (텍스트 주소와 별도) */
export const FARM_INFO_MAP_LOCATION = {
  address: "경기 파주시 상지석동 1377",
  /** 지오코딩 실패 시 상지석동 대표 좌표 */
  lat: 37.73341,
  lng: 126.77082,
} as const;

/** 홈 지도 초기 줌 (와이어프레임 7km 반경 노출) */
export const HOME_MAP_INITIAL_LEVEL = 4;

/** 와이어프레임 마커 크기 */
export const FARM_MARKER_SIZE_PX = 45;
export const USER_MARKER_WIDTH_PX = 40;
export const USER_MARKER_HEIGHT_PX = 60;

export function getKakaoMapApiKey() {
  return process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY?.trim() ?? "";
}

export function hasKakaoMapApiKey() {
  return getKakaoMapApiKey().length > 0;
}
