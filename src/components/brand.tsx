import { asset } from "@/lib/asset";

/* Hero illustration marks. Exported per theme as a flattened raster because the
   source art relies on raster textures and layer blurs. */

/* Wide hero illustration for tablet/desktop. Two flattened renders swapped by
   theme: light = subtle pale diamonds, dark = bold dark diamonds, both with the
   mascots baked in at the correct positions. */
export function HeroDiamondBg() {
  // Per-breakpoint diamond+mascot artwork, theme-swapped, all transparent so the
  // diamonds sit faint on the page's themed background. Tablet (768–1279): the
  // 1920px "Tablet" Bg (mascots ±295), seated with its top at the page top so the
  // mascots flank the copy. Desktop (≥1280): the wider 2100px "DesktopBig" Bg.
  const base =
    "pointer-events-none absolute left-1/2 -z-10 max-w-none -translate-x-1/2 select-none";
  return (
    <div aria-hidden>
      <div className="dark:hidden">
        <img src={asset("/hero/hero-bg-tablet-light.png")} alt="" draggable={false} className={`${base} top-[-120px] hidden w-[1920px] md:block xl:hidden`} />
        <img src={asset("/hero/hero-bg-light.png")} alt="" draggable={false} className={`${base} top-[-131px] hidden w-[2100px] xl:block`} />
      </div>
      <div className="hidden dark:block">
        <img src={asset("/hero/hero-bg-tablet-dark.png")} alt="" draggable={false} className={`${base} top-[-120px] hidden w-[1920px] md:block xl:hidden`} />
        <img src={asset("/hero/hero-bg-dark.png")} alt="" draggable={false} className={`${base} top-[-131px] hidden w-[2100px] xl:block`} />
      </div>
    </div>
  );
}

/* Compact, near-square hero illustration for small screens: both mascots seated
   inside the faint diamond stack. Theme-swapped like the wide artwork — light =
   pale diamonds, dark = dark diamonds — both transparent so they sit on the
   page's themed background (the mobile hero is NOT a forced dark panel). */
export function HeroMobileIllustration({ className }: { className?: string }) {
  return (
    <span aria-hidden className="contents">
      <img
        src={asset("/hero/hero-bg-mobile-light.png")}
        alt=""
        draggable={false}
        className={`${className ?? ""} dark:hidden`}
      />
      <img
        src={asset("/hero/hero-bg-mobile-dark.png")}
        alt=""
        draggable={false}
        className={`${className ?? ""} hidden dark:block`}
      />
    </span>
  );
}
