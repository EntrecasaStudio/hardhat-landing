"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Hero } from "./hero";
import { RELEASE_OPTIONS, getOptionIndex } from "@/release-options/registry";

const COUNT = RELEASE_OPTIONS.length;

/* Client review surface: renders the hero with a swappable release-slot option
   plus one floating "‹ Op N / 8 ›" pill to cycle through all options. Deep-links
   the current option via ?op=N (1-based). Theme is handled by the nav toggle. */
export function OptionPager() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const idxRef = useRef(0);

  // Pure state move (used on mount too — never writes the URL).
  const go = useCallback((to: number) => {
    const next = ((to % COUNT) + COUNT) % COUNT;
    idxRef.current = next;
    setIndex(next);
  }, []);

  // User-driven move: also deep-links via ?op=N. Only ever called from event
  // handlers (click / keydown), never during render or the mount effect — Next
  // patches history.replaceState into a router update that would fight React's
  // render if called inside the render/commit cycle.
  const nav = useCallback(
    (to: number) => {
      go(to);
      window.history.replaceState(null, "", `${window.location.pathname}?op=${idxRef.current + 1}`);
    },
    [go],
  );

  // Restore the option from the URL on mount (?op= is 1-based).
  useEffect(() => {
    const op = new URLSearchParams(window.location.search).get("op");
    if (op) go(getOptionIndex(RELEASE_OPTIONS[Number(op) - 1]?.id ?? null));
  }, [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setOpen(true);
        nav(idxRef.current + 1);
      } else if (e.key === "ArrowLeft") {
        setOpen(true);
        nav(idxRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  const option = RELEASE_OPTIONS[index];

  return (
    <>
      <Hero option={option} />

      {/* Review pager: a centred pill that collapses to a half-circle tab docked
          at the right edge. CSS-only crossfade (transform/opacity, 250ms). */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50">
        {/* Expanded pill */}
        <div
          aria-hidden={!open}
          className={`absolute bottom-0 left-1/2 flex -translate-x-1/2 select-none items-center gap-1 rounded-full bg-[#16181d]/95 p-1 font-mono text-sm text-white shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-[250ms] ease-out motion-reduce:transition-none ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none translate-x-[calc(50vw+100%)] opacity-0"
          }`}
        >
          <PagerButton label={`Previous option (${option.label})`} onClick={() => nav(idxRef.current - 1)} disabled={!open}>
            ‹
          </PagerButton>
          <span className="whitespace-nowrap px-1 text-center tabular-nums tracking-[0.05em]" aria-live="polite">
            Op {index + 1} / {COUNT}
          </span>
          <PagerButton label={`Next option (${option.label})`} onClick={() => nav(idxRef.current + 1)} disabled={!open}>
            ›
          </PagerButton>
          <button
            type="button"
            aria-label="Collapse option pager"
            aria-expanded={open}
            aria-controls="pager-tab"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-base leading-none text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Collapsed tab (right-edge half-circle) */}
        <button
          id="pager-tab"
          type="button"
          aria-label={`Expand option pager (Op ${index + 1} of ${COUNT})`}
          aria-expanded={open}
          tabIndex={open ? -1 : 0}
          onClick={() => setOpen(true)}
          className={`absolute bottom-0 right-0 flex h-11 w-7 items-center justify-center rounded-l-full bg-[#16181d]/95 text-lg leading-none text-white/70 shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-[250ms] ease-out hover:text-white motion-reduce:transition-none ${
            open ? "pointer-events-none translate-x-full opacity-0" : "pointer-events-auto translate-x-0 opacity-100"
          }`}
        >
          ‹
        </button>
      </div>
    </>
  );
}

function PagerButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
