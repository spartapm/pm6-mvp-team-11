"use client";

import dynamic from "next/dynamic";
import { isPostHogEnabled } from "@/lib/posthog/config";

const PostHogProviderInner = dynamic(() => import("./PostHogProviderInner"), {
  ssr: false,
});

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isPostHogEnabled()) {
    return <>{children}</>;
  }

  return <PostHogProviderInner>{children}</PostHogProviderInner>;
}
