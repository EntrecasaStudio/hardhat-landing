import type { Metadata } from "next";
import { PresentShell } from "@/components/present/present-shell";

// Client-facing presentation mode — the real landing at the device's genuine
// viewport, with a minimal control to walk release-slot options × light/dark.
// Not indexed; reached only via its direct URL (/present).
export const metadata: Metadata = {
  title: "Present · Hardhat landing",
  robots: { index: false, follow: false },
};

export default function PresentPage() {
  return <PresentShell />;
}
