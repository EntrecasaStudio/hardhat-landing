import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { OptionPager } from "@/components/option-pager";
import { ReadyToUse } from "@/components/ready-to-use";

// Internal review route — the real landing rendered full-page with a floating
// "‹ Op N / 8 ›" pill to flip through the release-slot options. Kept out of
// search engines; reached only via its direct URL (/review[?op=N]).
export const metadata: Metadata = {
  title: "Review · Release slot options — Hardhat landing",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <OptionPager />
        <ReadyToUse />
      </main>
    </>
  );
}
