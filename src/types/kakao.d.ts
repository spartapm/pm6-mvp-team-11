declare global {
  interface Window {
    kakao?: KakaoNamespace;
  }
}

export interface KakaoNamespace {
  maps: KakaoMaps;
}

export interface KakaoMaps {
  load(callback: () => void): void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  LatLngBounds: new () => KakaoLatLngBounds;
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
  MarkerImage: new (
    src: string,
    size: KakaoSize,
    options?: KakaoMarkerImageOptions,
  ) => KakaoMarkerImage;
  Size: new (width: number, height: number) => KakaoSize;
  Point: new (x: number, y: number) => KakaoPoint;
  Circle: new (options: KakaoCircleOptions) => KakaoCircle;
  Roadview: new (container: HTMLElement) => KakaoRoadview;
  RoadviewClient: new () => KakaoRoadviewClient;
  services: KakaoServices;
  event: {
    addListener(
      target: KakaoMap | KakaoMarker | KakaoRoadview,
      type: string,
      handler: () => void,
    ): void;
    removeListener(
      target: KakaoMap | KakaoMarker | KakaoRoadview,
      type: string,
      handler: () => void,
    ): void;
  };
}

interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
}

export interface KakaoLatLngBounds {
  extend(latlng: KakaoLatLng): void;
  getSouthWest(): KakaoLatLng;
  getNorthEast(): KakaoLatLng;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
}

export interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number, options?: { animate?: boolean }): void;
  setBounds(bounds: KakaoLatLngBounds): void;
  getCenter(): KakaoLatLng;
  getBounds(): KakaoLatLngBounds;
  getLevel(): number;
  setMaxLevel(level: number): void;
  relayout(): void;
}

interface KakaoMarkerOptions {
  map?: KakaoMap;
  position: KakaoLatLng;
  image?: KakaoMarkerImage;
  title?: string;
  zIndex?: number;
}

export interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
}

interface KakaoMarkerImage {}

interface KakaoMarkerImageOptions {
  offset?: KakaoPoint;
  alt?: string;
}

interface KakaoSize {}

interface KakaoPoint {}

interface KakaoCircleOptions {
  map?: KakaoMap;
  center: KakaoLatLng;
  radius: number;
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: string;
  fillColor?: string;
  fillOpacity?: number;
}

interface KakaoCircle {
  setMap(map: KakaoMap | null): void;
}

export interface KakaoRoadview {
  setPanoId(panoId: number, position: KakaoLatLng): void;
  relayout(): void;
}

interface KakaoRoadviewClient {
  getNearestPanoId(
    position: KakaoLatLng,
    radius: number,
    callback: (panoId: number | null) => void,
  ): void;
}

interface KakaoGeocoderResult {
  y: string;
  x: string;
  address_name?: string;
}

interface KakaoServices {
  Geocoder: new () => {
    addressSearch(
      address: string,
      callback: (result: KakaoGeocoderResult[], status: string) => void,
    ): void;
  };
  Status: {
    OK: string;
  };
}

export {};
