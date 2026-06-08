import { notFound } from "next/navigation";
import { use } from "react";
import BackHeader from "@/components/layout/BackHeader";
import FarmMapView from "@/components/store/FarmMapView";
import { getFarmById } from "@/data/mock-data";
import { FARM_INFO_MAP_LOCATION } from "@/lib/kakao/constants";
import { routes } from "@/lib/routes";

type FarmInfoPageProps = {
  params: Promise<{ farmId: string }>;
};

export default function FarmInfoPage({ params }: FarmInfoPageProps) {
  const { farmId } = use(params);
  const farm = getFarmById(farmId);

  if (!farm) notFound();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <BackHeader title="농장 정보" backHref={routes.store(farm.id)} />

      <FarmMapView
        lat={FARM_INFO_MAP_LOCATION.lat}
        lng={FARM_INFO_MAP_LOCATION.lng}
        address={FARM_INFO_MAP_LOCATION.address}
        farmName={farm.name}
        roadviewImageUrl={farm.roadviewImageUrl}
        alt={`${farm.name} 로드뷰`}
      />

      <div className="h-2 bg-[#f5f5f5]" />

      <section className="px-6 py-7 sm:px-9">
        <p className="text-base leading-[1.6] text-[#1a1a1a]">
          <span className="font-bold">{farm.name}</span>
          <br />
          농장 주소: {farm.address}
          <br />
          전화번호: {farm.phone}
        </p>
      </section>

      <div className="h-2 bg-[#f5f5f5]" />

      <section className="px-6 py-7 sm:px-9">
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-black">
          {farm.description}
        </p>
      </section>
    </div>
  );
}
