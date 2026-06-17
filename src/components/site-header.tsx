"use client";

import { asset } from "@/lib/asset";
import { useTheme } from "./theme-provider";

const NAV = ["home", "tools", "plugins", "documentation", "tutorial"];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50">
      <BannerTop />
      <Nav />
    </header>
  );
}

function BannerTop() {
  return (
    <div
      className="flex h-10 items-center justify-center gap-6 font-mono text-[13px] tracking-wide"
      style={{ background: "var(--banner-bg)", color: "var(--banner-fg)" }}
    >
      <span className="text-yellow-4">{"<<<<<"}</span>
      <span>join the Hardhat team! Nomic Labs is hiring</span>
      <span className="text-yellow-4">{">>>>>"}</span>
    </div>
  );
}

function Nav() {
  return (
    <div
      className="h-[90px] backdrop-blur"
      style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}
    >
      <div className="mx-auto flex h-full max-w-[1920px] items-center justify-between px-8">
        <a href="#" aria-label="Hardhat" className="flex items-center">
          <img src={asset("/hardhat-logotype.svg")} alt="Hardhat" className="h-[35px] w-auto select-none dark:hidden" draggable={false} />
          <img src={asset("/hardhat-logotype-dark.svg")} alt="Hardhat" className="hidden h-[35px] w-auto select-none dark:block" draggable={false} />
        </a>

        {/* Menu Items — Figma spacing: sections 32 · 64 to social · social 24 ·
            40 + 32 (theme pl) to the theme selector. */}
        <nav className="hidden items-center gap-10 lg:flex">
          <div className="flex items-center gap-16">
            {/* Sections */}
            <div className="flex items-center gap-8 font-mono text-base font-medium tracking-[0.05em]">
              {NAV.map((item) =>
                item === "home" ? (
                  <a
                    key={item}
                    href="#"
                    className="rounded-[3px] bg-[#6c6f74] px-2 py-[1.5px] text-[#fbfbfb] dark:bg-[#b0b2b5] dark:text-[#16181d]"
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="px-2 py-[1.5px] text-[#4a4d54] transition-colors hover:text-[var(--fg)] dark:text-[#b0b2b5]"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* Social */}
            <div className="flex items-center gap-6">
              <a href="#" aria-label="GitHub" className="text-[#b0b2b5] transition-colors hover:text-[var(--fg)]">
                <GitHubIcon />
              </a>
              <a href="#" aria-label="X" className="text-[#b0b2b5] transition-colors hover:text-[var(--fg)]">
                <XIcon />
              </a>
              <a href="#" aria-label="Discord" className="text-[#b0b2b5] transition-colors hover:text-[var(--fg)]">
                <DiscordIcon />
              </a>
            </div>
          </div>

          <ThemeToggle className="pl-8" />
        </nav>

        {/* Mobile: theme toggle + menu */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button aria-label="Menu" className="text-[#4a4d54] transition-colors hover:text-[var(--fg)]">
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`flex items-center gap-2 text-[#6c6f74] transition-colors hover:text-[var(--fg)] dark:text-[#fbfbfb] ${className}`}
    >
      <span className="font-mono text-[18px] tracking-[0.05em]">A</span>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

/* Social marks — exported from Figma (32×32 frame, mark sized per design). */
function GitHubIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0574 5.00001C13.2785 4.99728 10.5894 5.94907 8.47202 7.68481C6.35464 9.42055 4.94739 11.8268 4.50245 14.4723C4.05752 17.1178 4.60397 19.8297 6.0439 22.1219C7.48383 24.4141 9.7231 26.1369 12.3604 26.9815C12.9491 27.0853 13.1573 26.7322 13.1573 26.4345C13.1573 26.1368 13.1573 25.4583 13.1573 24.5168C9.89099 25.2022 9.20185 23.0006 9.20185 23.0006C8.98516 22.3182 8.52482 21.732 7.90252 21.3459C6.84727 20.6536 7.98867 20.6536 7.98867 20.6536C8.35858 20.704 8.71175 20.8349 9.02144 21.0364C9.33112 21.2379 9.5892 21.5047 9.77614 21.8167C9.93497 22.0944 10.1491 22.3392 10.4063 22.537C10.6634 22.7347 10.9586 22.8816 11.2747 22.969C11.5908 23.0565 11.9218 23.0829 12.2485 23.0468C12.5753 23.0106 12.8914 22.9125 13.1788 22.7583C13.2238 22.1887 13.4784 21.6534 13.8967 21.249C11.298 20.9651 8.57013 19.9959 8.57013 15.7103C8.55229 14.5908 8.98152 13.5076 9.76896 12.6849C9.41825 11.7115 9.45924 10.6466 9.88381 9.70092C9.88381 9.70092 10.8673 9.3963 13.0998 10.8571C15.0169 10.3495 17.0405 10.3495 18.9576 10.8571C21.1901 9.3963 22.1664 9.70092 22.1664 9.70092C22.5969 10.6366 22.6481 11.6938 22.31 12.6641C23.0974 13.4868 23.5266 14.5701 23.5088 15.6896C23.5088 20.0236 20.7737 20.972 18.1679 21.2282C18.4473 21.4991 18.6631 21.8248 18.8006 22.1831C18.9381 22.5415 18.994 22.9241 18.9647 23.3052C18.9647 24.8145 18.9647 26.033 18.9647 26.3999C18.9647 26.7668 19.1729 27.0507 19.7687 26.9399C22.376 26.0731 24.5818 24.3454 25.9963 22.0621C27.4108 19.7788 27.943 17.0868 27.499 14.4617C27.0549 11.8366 25.6631 9.44737 23.5695 7.71603C21.4759 5.9847 18.8152 5.02271 16.0574 5.00001Z"
        fill="currentColor"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M21.5677 7.25H24.5365L18.0507 14.6628L25.6807 24.75H19.7065L15.0272 18.6322L9.67313 24.75H6.70262L13.6398 16.8212L6.32031 7.25H12.4462L16.6758 12.8419L21.5677 7.25ZM20.5258 22.9731H22.1708L11.5524 8.93359H9.78711L20.5258 22.9731Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M24.4056 8.28589C22.861 7.57508 21.2036 7.05223 19.4676 6.75151C19.4368 6.74467 19.406 6.76176 19.389 6.7891C19.1771 7.16842 18.9379 7.66393 18.7738 8.05351C16.908 7.77329 15.0524 7.77329 13.2275 8.05351C13.0635 7.6571 12.8174 7.16842 12.6021 6.7891C12.5851 6.76176 12.5543 6.74809 12.5235 6.75151C10.791 7.04881 9.13355 7.57167 7.5855 8.28247C7.57183 8.28931 7.56158 8.29956 7.55133 8.30981C4.40739 13.0121 3.54622 17.5947 3.96655 22.1227C3.96655 22.1432 3.98022 22.1671 3.99731 22.1808C6.07162 23.7049 8.08443 24.631 10.0562 25.2427C10.087 25.2529 10.1212 25.2427 10.1417 25.2153C10.6098 24.5763 11.0233 23.9065 11.3822 23.1991C11.4027 23.1581 11.3822 23.1103 11.3411 23.0932C10.6816 22.8437 10.0528 22.5362 9.44795 22.191C9.4001 22.1637 9.39669 22.0953 9.44111 22.0611C9.56755 21.9655 9.69399 21.8664 9.81702 21.7673C9.83752 21.7502 9.86828 21.7468 9.89562 21.757C13.8666 23.5716 18.1656 23.5716 22.0887 21.757C22.116 21.7433 22.1467 21.7468 22.1672 21.7673C22.2903 21.8664 22.4167 21.9689 22.5432 22.0611C22.5876 22.0953 22.5842 22.1637 22.5363 22.191C21.9315 22.543 21.3027 22.8437 20.6431 23.0932C20.5987 23.1103 20.5816 23.1581 20.6021 23.2025C20.9678 23.9099 21.3813 24.5797 21.8392 25.2188C21.8597 25.2461 21.8939 25.2564 21.9246 25.2461C23.9067 24.6344 25.9161 23.7083 27.9938 22.1842C28.0109 22.1705 28.0246 22.15 28.0246 22.1295C28.5303 16.8941 27.1771 12.3491 24.4364 8.32006C24.4295 8.30639 24.4193 8.29614 24.4056 8.29272V8.28589ZM11.9768 19.3649C10.7807 19.3649 9.79651 18.2679 9.79651 16.9181C9.79651 15.5682 10.7636 14.4713 11.9768 14.4713C13.1899 14.4713 14.1775 15.5785 14.157 16.9181C14.157 18.2645 13.1899 19.3649 11.9768 19.3649ZM20.0383 19.3649C18.8422 19.3649 17.858 18.2679 17.858 16.9181C17.858 15.5682 18.8251 14.4713 20.0383 14.4713C21.2514 14.4713 22.239 15.5785 22.2185 16.9181C22.2185 18.2645 21.2617 19.3649 20.0383 19.3649Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Theme toggle marks — exported from Figma (30×30). */
function SunIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M15 6C16.78 6 18.5201 6.52784 20.0001 7.51677C21.4802 8.50571 22.6337 9.91131 23.3149 11.5558C23.9961 13.2004 24.1743 15.01 23.8271 16.7558C23.4798 18.5016 22.6226 20.1053 21.364 21.364C20.1053 22.6226 18.5016 23.4798 16.7558 23.8271C15.01 24.1743 13.2004 23.9961 11.5558 23.3149C9.91131 22.6337 8.50571 21.4802 7.51677 20.0001C6.52784 18.5201 6 16.78 6 15C6.00283 12.6139 6.95195 10.3264 8.63917 8.63917C10.3264 6.95195 12.6139 6.00283 15 6Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path d="M15.0117 0.648682V3.91089" stroke="currentColor" strokeLinecap="round" />
      <path d="M15.0117 26.0891V29.3513" stroke="currentColor" strokeLinecap="round" />
      <path d="M4.86328 4.85181L7.17001 7.15854" stroke="currentColor" strokeLinecap="round" />
      <path d="M22.8516 22.8413L25.1583 25.148" stroke="currentColor" strokeLinecap="round" />
      <path d="M0.660156 15L3.92236 15" stroke="currentColor" strokeLinecap="round" />
      <path d="M26.1016 15L29.3638 15" stroke="currentColor" strokeLinecap="round" />
      <path d="M4.86328 25.1479L7.17001 22.8412" stroke="currentColor" strokeLinecap="round" />
      <path d="M22.8516 7.15894L25.1583 4.85221" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
      <path
        d="M16.0361 27.6013C8.51612 27.6013 2.39844 21.4847 2.39844 13.9637C2.39844 9.19331 4.81298 4.88572 8.79393 2.4043C8.21923 3.99724 7.92631 5.66414 7.92631 7.38964C7.92631 15.4885 14.5143 22.0764 22.6131 22.0764C24.3344 22.0764 26.0055 21.7877 27.5984 21.2088C25.1169 25.1872 20.8094 27.6043 16.0391 27.6043L16.0361 27.6013Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}
