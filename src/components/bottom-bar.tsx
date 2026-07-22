"use client";

import NavOvalLink from "@/components/nav-oval-link";
import { useChromeTheme } from "@/components/use-chrome-theme";

// Fixed bottom bar from the Framer home page: email link + "CONTACT" oval.
// Keep this container visually transparent; safe-area styles position it only.
export default function BottomBar() {
  const { ref, theme } = useChromeTheme<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="chrome-blend pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 md:px-0 md:pb-0"
      data-crt-safe-bottom
      data-chrome-theme={theme}
    >
      <div className="pointer-events-auto flex items-center justify-between gap-2.5">
        <a
          href="mailto:dpatankar21@gmail.com"
          aria-label="dpatankar21@gmail.com →"
          className="type-chrome chrome-primary whitespace-nowrap no-underline"
        >
          <span
            className="inline-block"
            aria-hidden="true"
            data-signal-decode
            data-signal-group="footer"
          >
            dpatankar21@gmail.com →
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
