"use client";

import Image from "next/image";
import Link from "next/link";
import BackHeader from "@/components/layout/BackHeader";
import { useCart } from "@/context/cart-context";
import { formatPrice, getFarmById, getProductById } from "@/data/mock-data";
import { routes } from "@/lib/routes";

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, clear, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-white text-sm text-[#808080]">
        장바구니 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white pb-[max(7rem,calc(env(safe-area-inset-bottom,0px)+5rem))]">
      <BackHeader title="장바구니" backHref={routes.home} />

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-base font-semibold text-[#1a1a1a]">장바구니가 비어 있어요</p>
          <p className="text-sm text-[#808080]">상품을 담고 대면 거래를 예약해 보세요.</p>
          <Link
            href={routes.home}
            className="rounded-[14px] bg-[#33b266] px-6 py-3 text-sm font-bold text-white"
          >
            농부 둘러보기
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-[#f2f2f2]">
            {items.map((item) => {
              const product = getProductById(item.productId);
              const farm = getFarmById(item.farmId);
              if (!product || !farm) return null;

              return (
                <div key={item.productId} className="flex items-center gap-3 px-4 py-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-[10px]">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[#808080]">{farm.name}</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{product.name}</p>
                    <p className="text-sm font-bold text-[#1a8033]">
                      {formatPrice(product.price)} · {item.quantity}개
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="text-xs text-[#808080] underline"
                  >
                    삭제
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-auto px-4 pt-6">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-[#808080]">총 {totalCount}개</span>
              <span className="text-lg font-bold text-[#1a8033]">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              type="button"
              onClick={clear}
              className="mb-3 w-full text-sm text-[#808080] underline"
            >
              장바구니 비우기
            </button>
            <button
              type="button"
              className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-[#33b266] text-[17px] font-bold text-white"
            >
              대면 거래 예약하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
