import Link from "next/link";
import Image from "next/image";
import { assets } from "@/data/figma-assets";
import { routes } from "@/lib/routes";

type OverlayHeaderProps = {
  backHref?: string;
  cartCount?: number;
};

export default function OverlayHeader({
  backHref = routes.home,
  cartCount = 0,
}: OverlayHeaderProps) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-2 pb-2 pt-[max(0.75rem,env(safe-area-inset-top,0px))]">
      <Link
        href={backHref}
        aria-label="뒤로가기"
        className="flex size-11 items-center justify-center rounded-full bg-white/90 text-sm font-extrabold text-black shadow-sm"
      >
        ⟨
      </Link>
      <Link href={routes.cart} aria-label="장바구니" className="relative flex size-11 items-center justify-center">
        <Image src={assets.cartIcon} alt="" width={38} height={38} />
        {cartCount > 0 ? (
          <span className="absolute -right-1 -top-1 flex size-[17px] items-center justify-center rounded-full bg-[#33b266] text-[11px] font-bold text-white">
            {cartCount}
          </span>
        ) : null}
      </Link>
    </div>
  );
}
