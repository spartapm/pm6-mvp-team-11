const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() ?? "";
const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

export const posthogConfig = {
  key: posthogKey,
  host: posthogHost,
} as const;

export function isPostHogEnabled() {
  return posthogConfig.key.length > 0;
}
