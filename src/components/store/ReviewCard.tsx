import Image from "next/image";
import type { Review } from "@/lib/types";

type ReviewCardProps = {
  review: Review;
  compact?: boolean;
};

export default function ReviewCard({ review, compact = false }: ReviewCardProps) {
  return (
    <article
      className={`flex shrink-0 flex-col overflow-hidden rounded-[15px] border border-[#e5ede5] bg-white ${
        compact ? "h-[100px] w-[175px]" : "w-full"
      }`}
    >
      <p className="px-2 pt-2 text-[9px] font-medium text-[#f2b21a]">
        {"★".repeat(5)} <span className="text-black">{review.rating.toFixed(1)}</span>
      </p>

      <div className={`flex flex-1 gap-2 px-2 ${compact ? "pb-1" : "pb-2"}`}>
        <div className="relative h-[50px] w-[62px] shrink-0 overflow-hidden rounded-[5px] bg-[#f5f5f5]">
          {review.imageUrl ? (
            <Image
              src={review.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="62px"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center border border-[#a59e9e] text-[9px] text-[#aea8a8]">
              <span>No</span>
              <span>Image</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-medium text-black">{review.author} 님</p>
          <p className="mt-0.5 line-clamp-3 whitespace-pre-line text-[9px] font-medium leading-snug text-black">
            {review.content}
          </p>
        </div>
      </div>

      <p className="px-3 pb-2 text-[8px] text-[#8e8e93]">{review.date}</p>
    </article>
  );
}
