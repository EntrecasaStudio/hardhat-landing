import type { NextConfig } from "next";

// GitHub Pages serves the site under /hardhat-landing (project page), so we need
// a basePath in production. In dev we keep it empty so the local server stays at
// localhost:3000/. The basePath is also exposed as NEXT_PUBLIC_BASE_PATH so we
// can prefix raw <img> srcs (Next only auto-prefixes next/link & next/image).
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/hardhat-landing" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
