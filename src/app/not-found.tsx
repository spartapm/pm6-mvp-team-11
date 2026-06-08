import Link from "next/link";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <h1 className="text-xl font-bold text-[#1a1a1a]">페이지를 찾을 수 없어요</h1>
      <p className="text-sm text-[#808080]">요청하신 농장 또는 페이지가 존재하지 않습니다.</p>
      <Link
        href={routes.home}
        className="rounded-[14px] bg-[#33b266] px-6 py-3 text-sm font-bold text-white"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
