import { notFound } from "next/navigation";
import { use } from "react";
import BackHeader from "@/components/layout/BackHeader";
import ReviewCard from "@/components/store/ReviewCard";
import { getFarmById } from "@/data/mock-data";
import { formatReviewTitle } from "@/lib/format";
import { routes } from "@/lib/routes";

type ReviewsPageProps = {
  params: Promise<{ farmId: string }>;
};

export default function ReviewsPage({ params }: ReviewsPageProps) {
  const { farmId } = use(params);
  const farm = getFarmById(farmId);

  if (!farm) notFound();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BackHeader
        title={formatReviewTitle(farm.reviewCount)}
        backHref={routes.store(farm.id)}
      />

      <div className="space-y-3 px-4 py-5">
        {farm.reviews.length > 0 ? (
          farm.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p className="py-10 text-center text-sm text-[#808080]">
            첫번째 후기를 남겨보세요
          </p>
        )}
      </div>
    </div>
  );
}
