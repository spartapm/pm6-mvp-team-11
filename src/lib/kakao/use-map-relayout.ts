"use client";

import { useEffect, type RefObject } from "react";
import type { KakaoMap } from "@/types/kakao";

export function useMapRelayout(
  mapRef: RefObject<KakaoMap | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const relayout = () => {
      mapRef.current?.relayout();
    };

    window.addEventListener("resize", relayout);
    window.visualViewport?.addEventListener("resize", relayout);
    window.visualViewport?.addEventListener("scroll", relayout);

    return () => {
      window.removeEventListener("resize", relayout);
      window.visualViewport?.removeEventListener("resize", relayout);
      window.visualViewport?.removeEventListener("scroll", relayout);
    };
  }, [enabled, mapRef]);
}
