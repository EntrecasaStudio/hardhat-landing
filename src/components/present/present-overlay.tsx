import type { StepTheme } from "./sequence";

/** Minimal presentation control — a bottom floating pill that sits clear of the
 *  release slot. Follows the active theme (glass, like the header). */
export function PresentOverlay({
  optionLabel,
  optionNumber,
  optionTotal,
  theme,
  onPrev,
  onNext,
  onToggleTheme,
  onHide,
}: {
  optionLabel: string;
  optionNumber: number;
  optionTotal: number;
  theme: StepTheme;
  onPrev: () => void;
  onNext: () => void;
  onToggleTheme: () => void;
  onHide: () => void;
}) {
  const btn =
    "flex h-9 min-w-9 items-center justify-center rounded-full px-3 transition-colors hover:bg-[color-mix(in_srgb,var(--fg)_10%,transparent)]";
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div
        className="flex items-center gap-1 rounded-full border px-1.5 py-1 font-mono text-sm shadow-xl backdrop-blur"
        style={{
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderColor: "var(--border)",
          color: "var(--fg)",
        }}
      >
        <button onClick={onPrev} aria-label="Previous" className={btn}>
          ‹
        </button>

        <div className="flex items-center gap-2 px-2">
          <span className="font-medium">{optionLabel}</span>
          <span className="opacity-50">
            {optionNumber}/{optionTotal}
          </span>
          <button onClick={onToggleTheme} aria-label="Toggle light/dark" className="flex size-7 items-center justify-center rounded-full transition-colors hover:bg-[color-mix(in_srgb,var(--fg)_10%,transparent)]">
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>

        <button onClick={onNext} aria-label="Next" className={btn}>
          ›
        </button>

        <span className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />

        <button onClick={onHide} aria-label="Hide controls" className={btn}>
          ✕
        </button>
      </div>
    </div>
  );
}
