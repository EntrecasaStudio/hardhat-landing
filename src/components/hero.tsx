import { HeroDiamondBg, HeroMobileIllustration } from "./brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Wide desktop (≥xl): the diamond/mascot artwork is a FIXED 2100px-wide
          composition centred on the viewport — exactly as in Figma, where the Bg
          stays 1920/2100px and only the side margins grow with the viewport
          (1280 → x=-320, 1700 → x=-110, 1920 → x=0). The PNG's texture spans 2100px
          (Figma's line width) and carries a 131px transparent band above its first
          line, so we seat it at a fixed 2100px and pull it up by that band to meet
          the navbar's lower edge. */}
      <div className="relative hidden xl:block">
        <HeroDiamondBg className="pointer-events-none absolute left-1/2 top-[-131px] -z-10 w-[2100px] -translate-x-1/2" />

        <div className="mx-auto flex min-h-[1016px] max-w-[804px] flex-col items-center px-6 pt-[126px] text-center">
          <HeroCopy />
        </div>
      </div>

      {/* Mobile / tablet (< xl): dark hero panel. The copy sits on top, the
          diamond illustration (mascots baked in its centre) sits below the
          button. Content caps at 500px and gains side margins up to 767px,
          per the Figma 360 / 500 / 767 frames. The panel is dark in both
          themes — the diamond fill is dark by design. */}
      <div className="relative flex flex-col items-center overflow-hidden pt-10 text-center text-white xl:hidden" style={{ background: "var(--hero-panel)" }}>
        <div className="relative z-10 mx-auto w-full max-w-[500px] px-4">
          <HeroCopy dark />
        </div>
        {/* Diamond is a fixed-size backdrop: pulled up so its centre (where the
            mascots sit) lands just below the button, with its faint upper half
            rising behind the copy — mirroring the Figma overlay. */}
        <HeroMobileIllustration className="pointer-events-none relative z-0 -mt-[150px] w-[92%] max-w-[400px] select-none" />
      </div>
    </section>
  );
}

function HeroCopy({ dark = false }: { dark?: boolean }) {
  // On the mobile dark panel (dark=true) the palette is fixed (always on dark).
  // On desktop (dark=false) the colour follows the active theme via `dark:`.
  // Values mirror the Figma 1700px hero (light #181a1f / dark #e5e6e7 for copy,
  // #4a4d54 / #b0b2b5 for the muted release line).
  const copy = dark ? "text-[#e5e6e7]" : "text-[#181a1f] dark:text-[#e5e6e7]";
  const note = dark ? "text-[#b0b2b5]" : "text-[#4a4d54] dark:text-[#b0b2b5]";
  return (
    <>
      {/* Eyebrow — Source Code Pro. Stacked two lines @ 360 (bold 18 / regular 16),
          collapses to a single inline line @ desktop (both 31px). */}
      <p
        className={`flex flex-col items-center gap-4 font-mono leading-[1.5] tracking-[0.05em] xl:block xl:gap-0 xl:leading-[1.4] xl:whitespace-nowrap ${copy}`}
      >
        <span className="font-bold text-[18px] xl:text-[31px]">Hardhat 3:</span>
        <span className="font-normal text-[16px] xl:text-[31px]">{" Rearchitected & Rust-powered."}</span>
      </p>

      {/* Headline — Roboto Bold. 39px/0.05em @ 360 → 95px/0.02em @ 1700, leading 1.0 */}
      <h1
        className={`mx-auto mt-6 max-w-[732px] font-sans text-[39px] font-bold leading-none tracking-[0.05em] xl:mt-10 xl:text-[95px] xl:tracking-[0.02em] ${copy}`}
      >
        Ethereum development environment for professionals
      </h1>

      {/* Button — Roboto SemiBold. 12px/h42/px20 @ 360 → 16px/h56/px28 @ desktop */}
      <a
        href="#"
        className="mt-6 inline-flex h-[42px] items-center rounded-md bg-yellow-4 px-5 font-sans text-xs font-semibold tracking-[0.02em] text-gray-9 transition-colors hover:bg-yellow-8 xl:mt-10 xl:h-14 xl:px-7 xl:text-base"
      >
        Get started
      </a>

      {/* Release note — 88px below the button on desktop */}
      <div className="mt-12 flex flex-col items-center gap-4 px-4 xl:mt-[88px]">
        <a
          href="#"
          className={`font-mono text-base font-bold tracking-[0.05em] underline decoration-from-font ${copy}`}
        >
          Hardhat v3.7.0
        </a>
        <p className={`font-mono text-[13px] font-medium leading-[1.5] tracking-[0.05em] ${note}`}>
          Released 5 days ago: Hardhat 3 has moved out of beta and is now stable
        </p>
      </div>
    </>
  );
}
