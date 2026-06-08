import Image from "next/image";
import Link from "next/link";
import { assets } from "@/data/figma-assets";
import { formatDistanceKm, formatReviewCount } from "@/lib/format";
import type { Farm } from "@/lib/types";
import { routes } from "@/lib/routes";

type FarmListItemProps = {
  farm: Farm;
};

export default function FarmListItem({ farm }: FarmListItemProps) {
  return (
    <div className="flex min-h-[72px] items-center gap-3 border-b border-[#f2f2f2] px-3 py-3">
      <Link href={routes.store(farm.id)} className="flex min-w-0 flex-1 items-center gap-3">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-[10px] bg-[#edf2eb]">
          {farm.thumbnailUrl ? (
            <Image
              src={farm.thumbnailUrl}
              alt={farm.name}
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            <Image
              src={assets.logo}
              alt=""
              fill
              className="object-contain p-2"
              sizes="56px"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[#999]">{formatDistanceKm(farm.distanceKm)}</p>
          <p className="truncate text-sm font-semibold text-[#1a1a1a]">{farm.name}</p>
          {farm.isOrganic ? (
            <Image
              src={assets.organicBadge}
              alt="유기농"
              width={54}
              height={16}
              className="mt-1"
            />
          ) : null}
        </div>
      </Link>
      <Link
        href={routes.store(farm.id, { focus: "reviews" })}
        className="flex shrink-0 items-center gap-2"
      >
        <p className="text-xs font-medium text-[#f2b21a]">
          ★ {farm.rating} ({formatReviewCount(farm.reviewCount)})
        </p>
        <span className="text-sm text-[#b3b3b3]">{">"}</span>
      </Link>
    </div>
  );
}
