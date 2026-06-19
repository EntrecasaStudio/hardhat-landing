"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { useTheme } from "@/components/theme-provider";
import { RELEASE_OPTIONS, getOptionIndex } from "@/release-options/registry";
import { SEQUENCE, stepIndex } from "./sequence";
import { PresentOverlay } from "./present-overlay";

/** Presentation mode: renders the REAL landing at the device's genuine viewport
 *  (no iframe) and lets the client walk the release-slot options × light/dark
 *  with one "next". State is in the URL for shareable deep-links. */
export function PresentShell() {
  const { set } = useTheme();
  const [index, setIndex] = useState(0);
  const [chrome, setChrome] = useState(true);
  const [ready, setReady] = useState(false);
  const touch = useRef({ x: 0, y: 0 });

  // Read the deep-link on mount.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("theme");
    const theme = t === "dark" || t === "light" ? t : "light";
    const oid = RELEASE_OPTIONS[getOptionIndex(p.get("option"))].id;
    setIndex(stepIndex(oid, theme));
    if (p.get("chrome") === "off") setChrome(false);
    setReady(true);
  }, []);

  const step = SEQUENCE[index];
  const optionIndex = getOptionIndex(step.optionId);
  const option = RELEASE_OPTIONS[optionIndex];

  // Apply theme + mirror the state into the URL on every step.
  useEffect(() => {
    if (!ready) return;
    set(step.theme);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?option=${step.optionId}&theme=${step.theme}`,
    );
  }, [index, ready, set, step.optionId, step.theme]);

  const go = useCallback(
    (d: number) => setIndex((i) => (i + d + SEQUENCE.length) % SEQUENCE.length),
    [],
  );
  // Jump to the same option's other theme without advancing options.
  const flipTheme = useCallback(
    () =>
      setIndex((i) =>
        stepIndex(SEQUENCE[i].optionId, SEQUENCE[i].theme === "light" ? "dark" : "light"),
      ),
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key.toLowerCase() === "t") flipTheme();
      else if (e.key.toLowerCase() === "h") setChrome((c) => !c);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, flipTheme]);

  // Swipe to navigate on touch devices.
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touch.current.x;
      const dy = e.changedTouches[0].clientY - touch.current.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero option={option} />
      </main>
      {chrome ? (
        <PresentOverlay
          optionLabel={option.label}
          optionNumber={optionIndex + 1}
          optionTotal={RELEASE_OPTIONS.length}
          theme={step.theme}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onToggleTheme={flipTheme}
          onHide={() => setChrome(false)}
        />
      ) : (
        <button
          onClick={() => setChrome(true)}
          className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[11px] opacity-50 backdrop-blur transition hover:opacity-100"
          style={{ background: "color-mix(in srgb, var(--bg) 70%, transparent)", color: "var(--fg)" }}
        >
          show controls · H
        </button>
      )}
    </>
  );
}
