import Image from "next/image";
import { assets } from "@/data/figma-assets";
import { formatPrice } from "@/data/mock-data";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  onAddToCart?: () => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex h-[68px] items-center gap-3 rounded-[10px] bg-[#fcfcfc] px-2 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      <div className="relative size-14 shrink-0 overflow-hidden rounded-[10px] bg-[#e5ede5]">
        <Image
          src={product.imageUrl || assets.logo}
          alt={product.name}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-[#1a1a1a]">{product.name}</p>
        <p className="text-sm font-bold text-[#1a8033]">{formatPrice(product.price)}</p>
      </div>
      <button
        type="button"
        aria-label={`${product.name} 장바구니 담기`}
        onClick={onAddToCart}
        className="shrink-0 transition-transform active:scale-95"
      >
        <Image src={assets.cartIcon} alt="" width={38} height={38} />
      </button>
    </div>
  );
}
