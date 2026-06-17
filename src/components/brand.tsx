import { asset } from "@/lib/asset";

/* Hero illustration marks. Exported per theme as a flattened raster because the
   source art relies on raster textures and layer blurs. */

/* Wide hero illustration for tablet/desktop. Two flattened renders swapped by
   theme: light = subtle pale diamonds, dark = bold dark diamonds, both with the
   mascots baked in at the correct positions. */
export function HeroDiamondBg({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <img
        src={asset("/hero/hero-bg-light.png")}
        alt=""
        className="block w-full max-w-none select-none dark:hidden"
        draggable={false}
      />
      <img
        src={asset("/hero/hero-bg-dark.png")}
        alt=""
        className="hidden w-full max-w-none select-none dark:block"
        draggable={false}
      />
    </div>
  );
}

/* Compact, near-square hero illustration for small screens: both mascots
   centred inside the diamond stack. */
export function HeroMobileIllustration({ className }: { className?: string }) {
  return (
    <img
      src={asset("/hero/hero-bg-mobile-light.png")}
      alt=""
      className={className}
      draggable={false}
      aria-hidden
    />
  );
}
