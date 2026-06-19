import type { ComponentType } from "react";

/** Colour classes the hero hands to a slot for the surface it's rendered on
 *  (light-on-dark in the <768 panel and the 768–1023 dark band; theme-driven
 *  from 1024 up). Text-style options use them; options with their own surface
 *  can ignore them. */
export type SlotTone = { copy: string; note: string };

/** A design option for the hero's "release slot". Each is presented to the
 *  client in both light and dark via the /present sequence. */
export type ReleaseOption = {
  id: string;
  label: string;
  Component: ComponentType<SlotTone>;
};
