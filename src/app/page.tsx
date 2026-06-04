import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        {/* Remaining sections (Why Hardhat, news, newsletter, footer) intentionally
            hidden — first pass focuses on the hero in both themes. */}
      </main>
    </>
  );
}
