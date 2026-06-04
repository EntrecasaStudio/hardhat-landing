"use client";

import { useTheme } from "./theme-provider";
import { HardhatLogo } from "./brand";

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
      className="h-[90px] border-b backdrop-blur"
      style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}
    >
      <div className="mx-auto flex h-full max-w-[1392px] items-center justify-between px-8">
        <a href="#" className="flex items-center gap-3">
          <HardhatLogo className="h-9 w-auto" />
          <span className="text-2xl font-bold tracking-tight">Hardhat</span>
        </a>

        <nav className="hidden items-center gap-7 font-mono text-[15px] lg:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href="#"
              className={
                item === "home"
                  ? "rounded-md px-3 py-1.5"
                  : "px-1 transition-colors hover:text-[var(--fg)]"
              }
              style={
                item === "home"
                  ? { background: "var(--nav-pill)" }
                  : { color: "var(--fg-muted)" }
              }
            >
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4 pl-2" style={{ color: "var(--fg-muted)" }}>
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-[var(--fg)]">
              <GitHubIcon />
            </a>
            <a href="#" aria-label="X" className="transition-colors hover:text-[var(--fg)]">
              <XIcon />
            </a>
            <a href="#" aria-label="Discord" className="transition-colors hover:text-[var(--fg)]">
              <DiscordIcon />
            </a>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile: theme toggle + menu */}
        <div className="flex items-center gap-4 lg:hidden" style={{ color: "var(--fg-muted)" }}>
          <ThemeToggle />
          <button aria-label="Menu" className="transition-colors hover:text-[var(--fg)]">
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center gap-1 transition-colors hover:text-[var(--fg)]"
    >
      <span className="font-mono text-sm">A</span>
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

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817-5.966 6.817H1.683l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.2.358-.43.84-.59 1.226a18.27 18.27 0 0 0-5.487 0A12.6 12.6 0 0 0 9.21 3a19.7 19.7 0 0 0-4.432 1.37C1.708 8.98.886 13.482 1.292 17.92a19.9 19.9 0 0 0 6.064 3.06c.49-.668.927-1.378 1.302-2.124a12.9 12.9 0 0 1-2.05-.984c.172-.126.34-.258.503-.392a14.2 14.2 0 0 0 12.18 0c.164.14.332.27.504.392-.654.388-1.343.72-2.052.985.375.745.81 1.456 1.3 2.124a19.8 19.8 0 0 0 6.066-3.06c.476-5.143-.812-9.604-3.41-13.552zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.952-2.42 2.156-2.42 1.213 0 2.176 1.097 2.156 2.42 0 1.334-.953 2.419-2.156 2.419zm7.974 0c-1.183 0-2.155-1.085-2.155-2.419 0-1.333.95-2.42 2.155-2.42 1.214 0 2.176 1.097 2.156 2.42 0 1.334-.942 2.419-2.156 2.419z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-13a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm14 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1zM6.34 6.34a1 1 0 0 1 1.41 0l.71.71A1 1 0 0 1 7.05 8.46l-.71-.71a1 1 0 0 1 0-1.41zm9.49 9.49a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41zM6.34 17.66a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0zm9.49-9.49a1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1-1.41 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
