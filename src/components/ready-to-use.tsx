/* "Ready to use out of the box" intro — the two-column block that follows the
   hero. Pixel-perfect to the Figma 768 frame (content wrapper 680, heading 194 +
   gap 24 + paragraph flex-1), shown only in the tablet band (768–1279) for now;
   the other breakpoints get their own pass later. */
export function ReadyToUse() {
  const heading = "text-[#181a1f] dark:text-[#e5e6e7]";
  const para = "text-[#4a4d54] dark:text-[#b0b2b5]";
  return (
    <section className="mx-auto hidden w-full max-w-[680px] items-center gap-6 md:flex xl:hidden">
      <h2 className={`shrink-0 font-mono text-[20px] font-semibold leading-[1.5] tracking-[0.05em] ${heading}`}>
        Ready to use <br />
        out of the box<span className="text-yellow-8">_</span>
      </h2>
      <p className={`min-w-0 flex-1 font-sans text-[16px] font-normal leading-[1.5] tracking-[0.05em] ${para}`}>
        Hardhat includes everything you need for Solidity smart contract
        development. Testing, deployment, gas analysis, code coverage, code
        verification, and more.
      </p>
    </section>
  );
}
