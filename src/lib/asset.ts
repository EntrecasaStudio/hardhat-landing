/** Prefix a public asset path with the deploy basePath (empty in dev, the repo
 *  subpath on GitHub Pages). Use for raw <img>/<link> srcs, which Next does not
 *  auto-prefix the way it does next/link and next/image. */
export const asset = (path: string): string =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
