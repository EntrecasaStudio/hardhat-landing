import { RELEASE_OPTIONS } from "@/release-options/registry";

export type StepTheme = "light" | "dark";
export type Step = { optionId: string; theme: StepTheme };

/** The presentation walk: every option in light then dark, option-major.
 *  Op1·light → Op1·dark → Op2·light → Op2·dark → … (derived from the registry,
 *  so adding options just grows the sequence). */
export const SEQUENCE: Step[] = RELEASE_OPTIONS.flatMap((o) => [
  { optionId: o.id, theme: "light" as const },
  { optionId: o.id, theme: "dark" as const },
]);

export const stepIndex = (optionId: string, theme: StepTheme): number => {
  const i = SEQUENCE.findIndex((s) => s.optionId === optionId && s.theme === theme);
  return i === -1 ? 0 : i;
};
