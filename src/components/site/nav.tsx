"use client";

import HoverDrawNavItem from "@/components/site/hover-draw-nav-item";
import SoundToggle from "@/components/site/sound-toggle";
import { useChromeTheme } from "@/components/use-chrome-theme";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Site nav from the Framer canvas redesign: short bio on the left, three
// oval-outlined links on the right (Geist Mono, white).
// Section themes keep it legible over both light and dark content.
const LINKS = [
  { label: "WORK", href: "/#mains" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

const HERO_INTRO =
  "Darshita Patankar is a visual designer crafting distinctive brands, digital experiences and illustrations.";
const EMAIL_LABEL = "dpatankar21@gmail.com →";

const TOP_LOCK_PX = 100;
const HIDE_DISTANCE_PX = 96;
const HIDE_SECTION_ID = "work";

export default function Nav() {
  const pathname = usePathname();
  const { ref, theme } = useChromeTheme<HTMLElement>();
  const [isHidden, setIsHidden] = useState(false);
  const isProjectPage = pathname.startsWith("/projects/");

  useEffect(() => {
    const hideSection = document.getElementById(HIDE_SECTION_ID);
    let previousY = Math.max(window.scrollY, 0);
    let downwardTravel = 0;
    let hidden = false;
    let scrollFrame = 0;

    const updateVisibility = () => {
      scrollFrame = 0;

      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - previousY;
      previousY = currentY;

      if (currentY < TOP_LOCK_PX) {
        downwardTravel = 0;
        if (hidden) {
          hidden = false;
          setIsHidden(false);
        }
        return;
      }

      if (delta < 0) {
        downwardTravel = 0;
        if (hidden) {
          hidden = false;
          setIsHidden(false);
        }
        return;
      }

      const hasReachedHideSection = hideSection
        ? hideSection.getBoundingClientRect().top <= window.innerHeight
        : true;

      if (!hasReachedHideSection) {
        downwardTravel = 0;
        if (hidden) {
          hidden = false;
          setIsHidden(false);
        }
        return;
      }

      if (delta > 0 && !hidden) {
        downwardTravel += delta;
        if (downwardTravel >= HIDE_DISTANCE_PX) {
          hidden = true;
          downwardTravel = 0;
          setIsHidden(true);
        }
      }
    };

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="crt-top-chrome chrome-blend fixed inset-x-0 top-0 z-40"
      data-crt-safe-nav
      data-chrome-theme={theme}
      data-nav-hidden={isHidden ? "" : undefined}
    >
      <div className="flex flex-col items-center gap-6 px-8 pt-8 pb-4 md:flex-row md:items-center md:justify-between md:gap-2.5">
        {isProjectPage ? (
          <a
            href="mailto:dpatankar21@gmail.com"
            aria-label={EMAIL_LABEL}
            className="type-intro chrome-intro max-w-[815px] text-center no-underline md:text-left"
          >
            <span
              className="inline-block"
              aria-hidden="true"
              data-signal-decode
              data-signal-group="hero"
            >
              {EMAIL_LABEL}
            </span>
          </a>
        ) : (
          <p className="type-intro chrome-intro max-w-[815px] text-center md:text-left">
            <span className="sr-only">{HERO_INTRO}</span>
            <span
              className="inline-block"
              aria-hidden="true"
              data-signal-decode
              data-signal-group="hero"
            >
              Darshita Patankar is a visual designer crafting{" "}
              <span className="md:block">
                distinctive brands, digital experiences and illustrations.
              </span>
            </span>
          </p>
        )}
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {LINKS.map((link) => (
            <HoverDrawNavItem
              key={link.label}
              label={link.label}
              href={link.href}
              scrollMotion={link.label === "WORK"}
            />
          ))}
          <SoundToggle />
        </nav>
      </div>
    </header>
  );
}
