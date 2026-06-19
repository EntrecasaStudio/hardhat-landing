import type { ReleaseOption } from "./types";
import {
  ClassicRelease,
  InlineNoteRelease,
  VioletLinkRelease,
  LabelRelease,
  VioletPillRelease,
  LightPillRelease,
  InlineRowRelease,
  VioletRowRelease,
} from "./variants";

/** The 8 release-slot options presented to the client (Figma "v2 released slot").
 *  Shared by `/` (default = index 0), `/present` (cycles all × light/dark) and
 *  `/review`. */
export const RELEASE_OPTIONS: ReleaseOption[] = [
  { id: "classic", label: "Classic", Component: ClassicRelease },
  { id: "violet-link", label: "Violet link", Component: VioletLinkRelease },
  { id: "label", label: "Label + row", Component: LabelRelease },
  { id: "inline-note", label: "Inline note", Component: InlineNoteRelease },
  { id: "violet-pill", label: "Violet pill", Component: VioletPillRelease },
  { id: "light-pill", label: "Light pill", Component: LightPillRelease },
  { id: "inline-row", label: "Inline row", Component: InlineRowRelease },
  { id: "violet-row", label: "Violet row", Component: VioletRowRelease },
];

export const getOptionIndex = (id: string | null): number => {
  const i = RELEASE_OPTIONS.findIndex((o) => o.id === id);
  return i === -1 ? 0 : i;
};
