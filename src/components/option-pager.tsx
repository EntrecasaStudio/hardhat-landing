"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

  // Centred "Op N / 8" toast that flashes for ~1.6s — shown after a touch swipe
  // while the pager is collapsed, so the reviewer knows which variant they
  // landed on (when expanded, the pill already shows the number).
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const flashToast = useCallback(() => {
    setToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(false), 1600);
  }, []);

  // Touch swipe (mobile/tablet, where there are no arrow keys): a committed
  // horizontal drag over the hero flips to the prev/next option. `touch-action:
  // pan-y pinch-zoom` keeps vertical scroll and zoom native, so we only see
  // horizontal gestures; we ignore edge swipes (iOS back), near-vertical drags
  // and taps. Left → next, right → prev.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.pointerType !== "touch") return;
    const edge = 24;
    if (e.clientX < edge || e.clientX > window.innerWidth - edge) {
      swipeStart.current = null;
      return;
    }
    swipeStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    const s = swipeStart.current;
    swipeStart.current = null;
    if (!s || e.pointerType !== "touch") return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) < 64 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    nav(idxRef.current + (dx < 0 ? 1 : -1));
    if (!open) flashToast();
  };
  const onPointerCancel = () => {
    swipeStart.current = null;
  };

  const option = RELEASE_OPTIONS[index];

  return (
    <>
      {/* Hero is also the touch-swipe surface (see onPointer* above). */}
      <div
        className="[touch-action:pan-y_pinch-zoom]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <Hero option={option} />
      </div>

      {/* Current-option toast: a brief centred confirmation after a touch swipe
          while the pager is collapsed. Always present + aria-live so every option
          change (swipe, arrows, pill) is announced to screen readers; the visual
          fade only fires on swipe-while-collapsed. */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={`pointer-events-none fixed inset-x-0 top-1/2 z-50 flex -translate-y-1/2 justify-center px-4 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          toast ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="rounded-full bg-[#16181d]/95 px-4 py-2 font-mono text-sm tabular-nums tracking-[0.05em] text-white shadow-lg ring-1 ring-white/10 backdrop-blur">
          Op {index + 1} / {COUNT}
        </span>
      </div>

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
          <span className="whitespace-nowrap px-1 text-center tabular-nums tracking-[0.05em]">
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
