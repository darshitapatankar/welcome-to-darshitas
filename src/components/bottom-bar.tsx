"use client";

import NavOvalLink from "@/components/nav-oval-link";
import { useChromeTheme } from "@/components/use-chrome-theme";
import { useEffect, useState } from "react";

// Fixed bottom bar from the Framer home page: email link + "CONTACT" oval.
// Keep this container visually transparent; safe-area styles position it only.
export default function BottomBar() {
  const { ref, theme } = useChromeTheme<HTMLDivElement>();
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const mobile = window.matchMedia("(max-width: 767px)");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsHiddenOnMobile(mobile.matches && !entry.isIntersecting);
    });
    const handleBreakpointChange = () => {
      if (!mobile.matches) setIsHiddenOnMobile(false);
    };

    observer.observe(hero);
    mobile.addEventListener("change", handleBreakpointChange);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`chrome-blend pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-0 md:pb-0 ${
        isHiddenOnMobile
          ? "translate-y-full opacity-0 md:translate-y-0 md:opacity-100"
          : ""
      }`}
      data-crt-safe-bottom
      data-chrome-theme={theme}
      data-mobile-hidden={isHiddenOnMobile ? "" : undefined}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-2.5">
        <a
          href="mailto:dpatankar21@gmail.com"
          aria-label="dpatankar21@gmail.com →"
          className="type-chrome chrome-primary whitespace-nowrap no-underline"
        >
          <span
            className="hidden min-[360px]:inline-block"
            aria-hidden="true"
            data-signal-decode
            data-signal-group="footer"
          >
            dpatankar21@gmail.com →
          </span>
          <span
            className="inline-block min-[360px]:hidden"
            aria-hidden="true"
            data-signal-decode
            data-signal-group="footer"
          >
            EMAIL →
          </span>
        </a>
        <NavOvalLink
          href="mailto:dpatankar21@gmail.com"
          label="CONTACT"
          signalDecode
        />
      </div>
    </div>
  );
}
