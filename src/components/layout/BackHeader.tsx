import Link from "next/link";
import Image from "next/image";
import { assets } from "@/data/figma-assets";
import { routes } from "@/lib/routes";

type BackHeaderProps = {
  title?: string;
  backHref?: string;
  showCart?: boolean;
  cartCount?: number;
};

export default function BackHeader({
  title,
  backHref = routes.home,
  showCart = false,
  cartCount = 0,
}: BackHeaderProps) {
  return (
    <header className="relative flex min-h-[55px] shrink-0 items-center border-b border-black/10 bg-white px-4 pt-[env(safe-area-inset-top,0px)]">
      <Link
        href={backHref}
        aria-label="뒤로가기"
        className="absolute left-2 flex size-11 items-center justify-center rounded-full bg-white/90 text-lg font-extrabold text-black shadow-sm"
      >
        ⟨
      </Link>
      {title ? (
        <h1 className="mx-auto text-xl font-bold text-[#1a1a1a]">{title}</h1>
      ) : null}
      {showCart ? (
        <Link href={routes.cart} className="absolute right-2 flex size-11 items-center justify-center" aria-label="장바구니">
          <div className="relative">
            <Image src={assets.cartIcon} alt="" width={38} height={38} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex size-[17px] items-center justify-center rounded-full bg-[#33b266] text-[11px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </div>
        </Link>
      ) : null}
    </header>
  );
}
