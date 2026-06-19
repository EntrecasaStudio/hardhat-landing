import type { ComponentType } from "react";
import { HeroDiamondBg, HeroMobileIllustration } from "./brand";
import { RELEASE_OPTIONS } from "@/release-options/registry";
import type { ReleaseOption, SlotTone } from "@/release-options/types";

export function Hero({ option = RELEASE_OPTIONS[0] }: { option?: ReleaseOption }) {
  const Slot = option.Component;
  return (
    <section className="relative overflow-hidden">
      {/* Flank layout (≥768): mascots flank the centred copy, diamond artwork
          behind. A fixed-size composition centred on the viewport — the Tablet Bg
          (1920px) @ 768–1279, the DesktopBig Bg (2100px) @ ≥1280 — only the side
          margins grow with the viewport. */}
      <div className="relative hidden md:block">
        <HeroDiamondBg />

        {/* Vertical model (per Figma frames): content sits a fixed offset below
            the header — 79px @ 768, 66px @ 1280, 126px @ 1700 — top-aligned, with
            a fixed bottom gap before the next section. No 100dvh clamp (that broke
            on mobile browser chrome) — the hero is its natural design height. */}
        <div className="mx-auto flex max-w-[732px] flex-col items-center px-6 pt-[79px] pb-[120px] text-center xl:pt-[66px] min-[1700px]:max-w-[804px] min-[1700px]:pt-[126px]">
          <HeroCopy Slot={Slot} />
        </div>
      </div>

      {/* Mobile (< xl, interim — the 768 band is still TBD): theme-driven hero,
          NOT a dark panel. Copy on top, the seated-mascots illustration below the
          button with the faint diamond rising behind the copy. Content fills to
          500px (16px gutters → 328px @ 360, 468px @ 500) then holds at 468px as
          the margins grow to 767, per the Figma 360 / 500 / 767 frames. */}
      <div className="relative flex flex-col items-center overflow-hidden pt-10 text-center md:hidden">
        <div className="relative z-10 mx-auto w-full max-w-[500px] px-4">
          <HeroCopy Slot={Slot} slot={false} />
        </div>
        {/* Diamond illustration: a bleeding background sized exactly as the Figma
            "Bg" (993px wide @ 360 → 276% of the viewport, capped past 500px),
            centred and seated 32px above the hero top so the seated mascots land
            mid-section and the faint diamond rises behind the copy. */}
        {/* Mascot zone: an in-flow band right below the button, so the seated
            mascots always sit just under the CTA regardless of how tall the copy
            renders (robust across mobile browsers). The oversized illustration is
            centred in the band and bleeds up behind the copy and down behind the
            note; the section's overflow-hidden clips the far diamond tips. */}
        <div className="relative mt-3 flex h-[240px] w-full items-center justify-center">
          {/* Fixed native size (993px) so the mascots + diamond do NOT scale
              between 360 and 767 — only the bleed/margins change with the viewport. */}
          <HeroMobileIllustration className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[993px] max-w-none -translate-x-1/2 -translate-y-[52.6%] select-none" />
        </div>
        {/* Release note sits BELOW the mascots (per the 360 frame), never over them,
            with 40px of breathing room beneath it. */}
        <div className="relative z-10 mx-auto mt-5 w-full max-w-[408px] px-6 pb-10">
          <Slot copy="text-[#181a1f] dark:text-[#e5e6e7]" note="text-[#4a4d54] dark:text-[#b0b2b5]" />
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ dark = false, slot = true, Slot }: { dark?: boolean; slot?: boolean; Slot: ComponentType<SlotTone> }) {
  // On the mobile dark panel (dark=true) the palette is fixed (always on dark).
  // On desktop (dark=false) the colour follows the active theme via `dark:`.
  // Values mirror the Figma 1700px hero (light #181a1f / dark #e5e6e7 for copy,
  // #4a4d54 / #b0b2b5 for the muted release line).
  const copy = dark ? "text-[#e5e6e7]" : "text-[#181a1f] dark:text-[#e5e6e7]";
  const note = dark ? "text-[#b0b2b5]" : "text-[#4a4d54] dark:text-[#b0b2b5]";
  return (
    <>
      {/* Eyebrow — Source Code Pro. Stacked two lines @ 360 (bold 16 / regular 14),
          collapses to a single inline line @ ≥768: 20px @ 768, 25px @ 1280, 31px @ 1700. */}
      <p
        className={`flex flex-col items-center gap-1 font-mono leading-[1.3] tracking-[0.05em] md:block md:gap-0 md:leading-[1.4] md:whitespace-nowrap ${copy}`}
      >
        <span className="font-bold text-[16px] md:text-[20px] min-[1280px]:text-[25px] min-[1700px]:text-[31px]">Hardhat 3:</span>
        <span className="font-normal text-[14px] md:text-[20px] min-[1280px]:text-[25px] min-[1700px]:text-[31px]">{" Rearchitected & Rust-powered."}</span>
      </p>

      {/* Headline — Roboto Bold. 39px @ 360 → 61px @ 768 (4 lines, Figma wrap) → 76px @ 1280 → 95px @ 1700, leading ~1.0 */}
      <h1
        className={`mx-auto mt-4 max-w-[520px] font-sans text-[39px] font-bold leading-none tracking-[0.05em] md:mt-10 min-[768px]:text-[61px] min-[1280px]:max-w-[732px] min-[1280px]:text-[76px] min-[1280px]:tracking-[0.02em] min-[1700px]:text-[95px] ${copy}`}
      >
        Ethereum development environment for professionals
      </h1>

      {/* Button — Roboto SemiBold. 12px/h42/px20 @ 360 → 16px/h56/px28 @ desktop */}
      <a
        href="#"
        className="mt-6 inline-flex h-[42px] items-center rounded-md bg-yellow-4 px-5 font-sans text-xs font-semibold tracking-[0.02em] text-gray-9 transition-colors hover:bg-yellow-8 md:h-[44px] xl:mt-10 xl:h-14 xl:px-7 xl:text-base"
      >
        Get started
      </a>

      {/* Release slot — swappable option (default = Classic: the v3.7.0 note).
          48px below the button @ 1280, 88px @ 1700. On mobile it's rendered
          separately (below the mascots), so it's omitted here via `slot={false}`. */}
      {slot && (
        <div className="mt-12 flex w-full flex-col items-center px-4 min-[1700px]:mt-[88px]">
          <Slot copy={copy} note={note} />
        </div>
      )}
    </>
  );
}
