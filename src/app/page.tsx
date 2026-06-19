import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ReadyToUse } from "@/components/ready-to-use";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <ReadyToUse />
        {/* Remaining sections (Why Hardhat, news, newsletter, footer) intentionally
            hidden — first pass focuses on the hero in both themes. */}
      </main>
    </>
  );
}
