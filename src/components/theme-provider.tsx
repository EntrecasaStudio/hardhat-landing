"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
  set: (next: Theme) => void;
}>({ theme: "light", toggle: () => {}, set: () => {} });

function applyTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  localStorage.setItem("theme", next);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    if (typeof document.startViewTransition !== "function") {
      applyTheme(next);
      setTheme(next);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        applyTheme(next);
        setTheme(next);
      });
    });
  }, [theme]);

  // Set a specific theme (used by the /present sequence). Instant — no crossfade
  // — so it doesn't overlap with the slot option swapping.
  const set = useCallback((next: Theme) => {
    applyTheme(next);
    setTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, set }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
