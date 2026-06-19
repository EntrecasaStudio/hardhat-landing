import type { SlotTone } from "./types";

/* The 8 release-slot options from Figma ("v2 released slot"), specced at 1700 and
   scaled down to 1280/768/360 following Option 1's reduction ladder. Each option
   is a thin layout shell over the shared sizing tokens below — only layout, color
   and decoration differ. `copy`/`note` are the hero's theme-aware text tones. */

/* ── Shared per-break sizing ladder (single source of truth, from Option 1) ──
   breakpoints: base=360 · md=768 · xl=1280 · min-[1700px]=1700 */
const MONO = "font-mono tracking-[0.05em]";
// Link is a single line with no descenders → leading-none trims the extra
// line-box height (mirrors Figma's text-box-trim) so it doesn't push the note
// away. Note keeps leading-[1.5] (it can have descenders / wraps in op2).
const LINK_BASE = `${MONO} shrink-0 whitespace-nowrap font-bold leading-none`;
const NOTE_BASE = `${MONO} font-medium leading-[1.5]`;

// Link font-size ladders (by 1700 size): 13@1700 and 16@1700 (Classic). All steps
// use arbitrary min-[] variants so Tailwind orders them by value (mixing named
// md:/xl: with min-[1700px] lets the named one win and breaks the 1700 tier).
const LINK_13 = "text-[10px] min-[768px]:text-[12px] min-[1280px]:text-[13px] min-[1700px]:text-[13px]";
const LINK_16 = "text-[10px] min-[768px]:text-[12px] min-[1280px]:text-[13px] min-[1700px]:text-[16px]";
// Note / kicker font-size ladders.
const NOTE_SIZE = "text-[8px] min-[768px]:text-[10px] min-[1280px]:text-[10px] min-[1700px]:text-[13px]";
const KICKER_SIZE = "text-[7px] min-[768px]:text-[8px] min-[1280px]:text-[8px] min-[1700px]:text-[10px]";
// Inter-element gap ladder (4/4/8/16).
const GAP = "gap-1 min-[1280px]:gap-2 min-[1700px]:gap-4";

// Single-line behaviour: the note shrinks to its content (capped at max-width)
// so the parent's items-center/justify-center keeps it centred; text-left only
// governs the ellipsis side when it does overflow (clean left-anchored cut).
const NOTE_TRUNC = "min-w-0 max-w-full truncate text-left";
// Note max-width ladders by 1700 width (≈0.55× @768, 0.65× @1280).
const NW_724 = "min-[768px]:max-w-[400px] min-[1280px]:max-w-[472px] min-[1700px]:max-w-[724px]";
const NW_508 = "min-[768px]:max-w-[280px] min-[1280px]:max-w-[330px] min-[1700px]:max-w-[508px]";

// Link decoration + accent colour.
const DEC_UNDERLINE = "underline decoration-from-font";
const DEC_DOTTED = "underline decoration-dotted decoration-violet-5";
const VIOLET = "text-violet-5 dark:text-violet-4";

// Chip (pill) — theme-correct: violet-1 tint in light, #20232a in dark (NOT
// violet). Padding/radius scaled per break (px-8 py-4 rounded-32 @1700).
const CHIP =
  "rounded-[16px] bg-violet-1 px-3 py-1.5 dark:bg-[#20232a] min-[768px]:rounded-[20px] min-[768px]:px-4 min-[768px]:py-2 min-[1280px]:px-6 min-[1280px]:py-3 min-[1700px]:rounded-[32px] min-[1700px]:px-8 min-[1700px]:py-4";

/** Release link "Hardhat v3.7.0". */
function Link({ size = LINK_13, dec = DEC_UNDERLINE, tone }: { size?: string; dec?: string; tone: string }) {
  return (
    <a href="#" className={`${LINK_BASE} ${size} ${dec} ${tone}`}>
      Hardhat v3.7.0
    </a>
  );
}

/** Muted, single-line truncated note. `w` overrides the 1700 max-width ladder. */
function Note({ note, w = NW_724, children }: { note: string; w?: string; children?: React.ReactNode }) {
  return (
    <p className={`${NOTE_BASE} ${NOTE_SIZE} ${NOTE_TRUNC} ${w} ${note}`}>
      {children ?? "Released 5 days ago: Hardhat 3 has moved out of beta and is now stable"}
    </p>
  );
}

/** 1 — Classic: bold link (16@1700) + single muted truncated line below. */
export function ClassicRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex w-full flex-col items-center text-center ${GAP}`}>
      <Link size={LINK_16} tone={copy} />
      <Note note={note} />
    </div>
  );
}

/** 2 — Inline note: link + "Released 5 days ago" muted on line 1, rest below. */
export function InlineNoteRelease({ note }: SlotTone) {
  return (
    <div className={`flex flex-col items-center text-center ${GAP} ${NOTE_BASE} ${NOTE_SIZE} ${note}`}>
      <p>
        <a href="#" className="whitespace-nowrap underline decoration-from-font">Hardhat v3.7.0</a> Released 5 days ago
      </p>
      <p className="w-full min-w-0 truncate">Hardhat 3 has moved out of beta and is now stable</p>
    </div>
  );
}

/** 3 — Inverted kicker: tiny "Released 5 days ago" eyebrow, then link + note
    together on one truncated row beneath it. */
export function VioletLinkRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex flex-col items-center text-center ${GAP}`}>
      <p className={`${NOTE_BASE} ${KICKER_SIZE} opacity-80 ${note}`}>Released 5 days ago</p>
      <div className={`flex w-full items-center justify-center ${GAP}`}>
        <Link size={LINK_13} tone={copy} />
        <Note note={note} w={NW_508}>Hardhat 3 has moved out of beta and is now stable</Note>
      </div>
    </div>
  );
}

/** 4 — Label + row: violet link + muted description on one truncated row, tiny
    "Released" kicker above. */
export function LabelRelease({ note }: SlotTone) {
  return (
    <div className={`flex flex-col items-center text-center ${GAP}`}>
      <p className={`${NOTE_BASE} ${KICKER_SIZE} opacity-80 ${note}`}>Released 5 days ago</p>
      <div className={`flex w-full items-center justify-center ${GAP}`}>
        <Link size={LINK_13} dec="" tone={VIOLET} />
        <Note note={note} w={NW_508}>Hardhat 3 has moved out of beta and is now stable</Note>
      </div>
    </div>
  );
}

/** 5 — Violet pill: chip (violet-1 / #20232a), dotted violet link inline-first,
    truncated note. Figma 1700: note width 508. Single line. */
export function VioletPillRelease({ note }: SlotTone) {
  return (
    <div className={`flex items-center justify-center ${GAP} ${CHIP}`}>
      <Link size={LINK_13} dec={DEC_DOTTED} tone={VIOLET} />
      <Note note={note} w={NW_508} />
    </div>
  );
}

/** 6 — Light pill: same chip, neutral underlined link inline-first, truncated note. */
export function LightPillRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex items-center justify-center ${GAP} ${CHIP}`}>
      <Link size={LINK_13} tone={copy} />
      <Note note={note} w={NW_508} />
    </div>
  );
}

/** 7 — Inline row: neutral underlined link inline-first + truncated note, no chip. */
export function InlineRowRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex w-full items-center justify-center ${GAP}`}>
      <Link size={LINK_13} tone={copy} />
      <Note note={note} />
    </div>
  );
}

/** 8 — Violet row: dotted violet link inline-first + truncated note, no chip. */
export function VioletRowRelease({ note }: SlotTone) {
  return (
    <div className={`flex w-full items-center justify-center ${GAP}`}>
      <Link size={LINK_13} dec={DEC_DOTTED} tone={VIOLET} />
      <Note note={note} />
    </div>
  );
}
