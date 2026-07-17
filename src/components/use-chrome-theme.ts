"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type ChromeTheme = "dark" | "light";

export function useChromeTheme<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const pathname = usePathname();
  const [theme, setTheme] = useState<ChromeTheme>("dark");

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      observer?.disconnect();

      const chrome = ref.current;
      if (!chrome) return;

      const chromeRect = chrome.getBoundingClientRect();
      const bandY = Math.min(
        window.innerHeight - 1,
        Math.max(0, Math.floor(chromeRect.top + chromeRect.height / 2)),
      );
      const themedRegions = Array.from(
        document.querySelectorAll<HTMLElement>("[data-theme]"),
      );

      const updateTheme = () => {
        let activeTheme: ChromeTheme = "dark";

        // The last matching node wins, so a themed region nested inside a
        // broader page/section theme can override it at the observation band.
        for (const region of themedRegions) {
          const rect = region.getBoundingClientRect();
          if (rect.top <= bandY && rect.bottom > bandY) {
            activeTheme = region.dataset.theme === "light" ? "light" : "dark";
          }
        }

        setTheme(activeTheme);
      };

      const bottomMargin = Math.max(0, window.innerHeight - bandY - 1);
      observer = new IntersectionObserver(updateTheme, {
        root: null,
        rootMargin: `-${bandY}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      });

      themedRegions.forEach((region) => observer?.observe(region));
      updateTheme();
    };

    setupObserver();
    window.addEventListener("resize", setupObserver);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", setupObserver);
    };
  }, [pathname]);

  return { ref, theme };
}
