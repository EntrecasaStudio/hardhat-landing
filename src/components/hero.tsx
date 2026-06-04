import { HeroDiamondBg, HeroMobileIllustration } from "./brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Wide desktop: diamond banner with mascots flanking the copy. Only kicks
          in once the viewport is wide enough that the mascots clear the headline. */}
      <div className="relative hidden xl:block">
        <HeroDiamondBg className="pointer-events-none absolute inset-x-0 top-0 -z-10 w-full" />

        <div className="mx-auto flex min-h-[clamp(700px,56vw,1016px)] max-w-[760px] flex-col items-center justify-center px-6 text-center">
          <HeroCopy />
        </div>
      </div>

      {/* Mobile / tablet: stacked illustration above the copy */}
      <div className="flex flex-col items-center px-6 pb-20 pt-8 text-center xl:hidden">
        <HeroMobileIllustration className="pointer-events-none mb-4 w-[88%] max-w-[460px] select-none" />
        <HeroCopy />
      </div>
    </section>
  );
}

function HeroCopy() {
  return (
    <>
      <p className="font-mono text-sm tracking-wide sm:text-base" style={{ color: "var(--fg-muted)" }}>
        <span className="font-semibold" style={{ color: "var(--fg)" }}>
          Hardhat 3:
        </span>{" "}
        Rearchitected &amp; Rust-powered.
      </p>

      <h1 className="mx-auto mt-6 max-w-[640px] text-[40px] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[72px] lg:leading-[1.02]">
        Ethereum development environment for professionals
      </h1>

      <a
        href="#"
        className="mt-10 inline-flex items-center rounded-md bg-yellow-4 px-6 py-3 font-mono text-sm font-medium text-gray-10 transition-colors hover:bg-yellow-8"
      >
        Get started
      </a>
    </>
  );
}
