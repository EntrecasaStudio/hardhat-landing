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
// Inter-element gap ladder (4/4/8/16) — for stacked layouts.
const GAP = "gap-1 min-[1280px]:gap-2 min-[1700px]:gap-4";
// Inline link↔note gap (10/12/12/16) — scales proportionally so it stays visible
// at the small breaks instead of collapsing to 4px when both sit on one line.
const GAP_INLINE = "gap-[10px] min-[768px]:gap-[12px] min-[1700px]:gap-4";

// Single-line behaviour: the note shrinks to its content (capped at max-width)
// so the parent's items-center/justify-center keeps it centred; text-left only
// governs the ellipsis side when it does overflow (clean left-anchored cut).
const NOTE_TRUNC = "min-w-0 max-w-full truncate text-left";
// Note max-width ladders by 1700 width (≈0.55× @768, 0.65× @1280).
const NW_724 = "min-[768px]:max-w-[400px] min-[1280px]:max-w-[472px] min-[1700px]:max-w-[724px]";
const NW_508 = "min-[768px]:max-w-[280px] min-[1280px]:max-w-[330px] min-[1700px]:max-w-[508px]";

// Link decoration + accent colour. All underlines sit 25% (of the font size)
// below the text and skip ink (break around glyph descenders).
const UL = "underline-offset-[25%] [text-decoration-skip-ink:auto]";
const DEC_UNDERLINE = `underline decoration-from-font ${UL}`;
const DEC_DOTTED = `underline decoration-dotted decoration-violet-5 ${UL}`;
// Accent violet link (exact Figma): #5E21FF light, #7A5EFF dark.
const VIOLET = "text-[#5e21ff] dark:text-[#7a5eff]";

// Chip (pill) — theme-correct: violet-1 tint in light, #20232a in dark (NOT
// violet). Padding/radius scaled per break (px-8 py-4 rounded-32 @1700).
const CHIP =
  "max-w-full rounded-[16px] bg-violet-1 px-3 py-1.5 dark:bg-[#20232a] md:max-w-none min-[768px]:rounded-[20px] min-[768px]:px-4 min-[768px]:py-2 min-[1280px]:px-6 min-[1280px]:py-3 min-[1700px]:rounded-[32px] min-[1700px]:px-8 min-[1700px]:py-4";

/** Release link "Hardhat v3.7.0". */
function Link({ size = LINK_13, dec = DEC_UNDERLINE, tone }: { size?: string; dec?: string; tone: string }) {
  return (
    <a href="#" className={`${LINK_BASE} ${size} ${dec} ${tone}`}>
      Hardhat v3.7.0
    </a>
  );
}

/** Muted, single-line truncated note. `w` overrides the 1700 max-width ladder.
    `pad` adds an 8px mobile side gutter so it doesn't sit flush to the margins. */
function Note({ note, w = NW_724, pad, children }: { note: string; w?: string; pad?: boolean; children?: React.ReactNode }) {
  return (
    <p className={`${NOTE_BASE} ${NOTE_SIZE} ${NOTE_TRUNC} ${w} ${pad ? "px-2 min-[768px]:px-0" : ""} ${note}`}>
      {children ?? "Released 5 days ago: Hardhat 3 has moved out of beta and is now stable"}
    </p>
  );
}

/** 1 — Classic: bold link (16@1700) + single muted truncated line below. */
export function ClassicRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex w-full flex-col items-center text-center ${GAP}`}>
      <Link size={LINK_16} tone={copy} />
      <Note note={note} pad />
    </div>
  );
}

/** 4 — Inline note (Figma 1700): bold underlined link + "Released 5 days ago"
    (regular) inline on line 1, then the description (regular) truncated below.
    Everything the note tone, 13px, leading 1.5. gap 8px, px-40 — scaled per break. */
export function InlineNoteRelease({ note }: SlotTone) {
  return (
    <div className={`flex w-full flex-col items-center text-center font-mono font-normal leading-[1.5] tracking-[0.05em] ${NOTE_SIZE} gap-[5px] px-2 min-[768px]:gap-[6px] min-[768px]:px-4 min-[1280px]:px-6 min-[1700px]:gap-2 min-[1700px]:px-10 ${note}`}>
      <p className="whitespace-nowrap">
        <a href="#" className={`font-bold underline decoration-from-font ${UL}`}>Hardhat v3.7.0</a> Released 5 days ago
      </p>
      <p className="w-full min-w-0 truncate">Hardhat 3 has moved out of beta and is now stable</p>
    </div>
  );
}

/** 2 — Violet link: identical to Classic but the link is violet
    (#5E21FF light / #7A5EFF dark). */
export function VioletLinkRelease({ note }: SlotTone) {
  return (
    <div className={`flex w-full flex-col items-center text-center ${GAP}`}>
      <Link size={LINK_16} tone={VIOLET} />
      <Note note={note} pad />
    </div>
  );
}

/** 3 — Label + row (Figma 1700): tiny "Released 5 days ago" kicker (10px) over a
    [violet link + muted note] row (13px). Link #7A5EFF both themes, underlined;
    kicker #B0B2B5 / #6C6F74, note #6C6F74 / #B0B2B5. Kicker→row 4px, link↔note
    16px, container px-40 — all scaled down per Op1's ladders. */
export function LabelRelease({}: SlotTone) {
  return (
    <div className="flex w-full flex-col items-center gap-0.5 px-2 min-[768px]:gap-1 min-[768px]:px-4 min-[1280px]:px-6 min-[1700px]:px-10">
      <p className={`${NOTE_BASE} ${NOTE_SIZE} truncate text-center text-[#b0b2b5] dark:text-[#6c6f74]`}>
        Released 5 days ago
      </p>
      {/* Op3 link↔note gap scales proportionally (10/12/12/16) so it stays
          visible at the smaller breaks, unlike the shared GAP (4/4/8/16). */}
      <div className={`flex w-full min-w-0 items-center justify-center ${GAP_INLINE}`}>
        {/* Link and note share NOTE_SIZE so they stay the same size at every break. */}
        <Link size={NOTE_SIZE} tone={VIOLET} />
        <Note note="text-[#6c6f74] dark:text-[#b0b2b5]" w="">
          Hardhat 3 has moved out of beta and is now stable
        </Note>
      </div>
    </div>
  );
}

/** 5 — Violet pill: chip (violet-1 / #20232a), dotted violet link inline-first,
    truncated note. Figma 1700: note width 508. Single line. */
export function VioletPillRelease({ note }: SlotTone) {
  return (
    <div className={`flex items-center justify-center ${GAP_INLINE} ${CHIP}`}>
      <Link size={NOTE_SIZE} dec={DEC_UNDERLINE} tone={VIOLET} />
      <Note note={note} w={NW_508} />
    </div>
  );
}

/** 6 — Light pill: identical to Op5 (Violet pill) but the link takes the copy
    tone (#181a1f light / #e5e6e7 dark) instead of violet; underline from-font. */
export function LightPillRelease({ copy, note }: SlotTone) {
  return (
    <div className={`flex items-center justify-center ${GAP_INLINE} ${CHIP}`}>
      <Link size={NOTE_SIZE} dec={DEC_UNDERLINE} tone={copy} />
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
