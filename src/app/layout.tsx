import type { Metadata } from "next";
import { Roboto, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const TITLE = "Hardhat | Ethereum development environment for professionals";
const DESCRIPTION =
  "Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software.";
// Absolute, basePath-aware URLs so link-preview scrapers resolve the OG image
// on the deployed GitHub Pages site (static export bakes these into the HTML).
const SITE = `https://entrecasastudio.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;
const OG_IMAGE = `${SITE}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE}/`),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Hardhat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${sourceCodePro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
