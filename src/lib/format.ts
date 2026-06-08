export function formatReviewCount(count: number) {
  return count >= 100 ? "100+" : String(count);
}

export function formatReviewTitle(count: number) {
  return count >= 100 ? "구매 후기 (100+)" : `구매 후기 (${count})`;
}

export function formatDistanceKm(distanceKm: number) {
  return `${distanceKm.toFixed(1)}km`;
}
