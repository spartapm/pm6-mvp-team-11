import { Suspense } from "react";
import StorePage from "./StorePageClient";

type PageProps = {
  params: Promise<{ farmId: string }>;
};

export default function StorePageWrapper({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-white text-sm text-[#808080]">
          수확중
        </div>
      }
    >
      <StorePage params={params} />
    </Suspense>
  );
}
