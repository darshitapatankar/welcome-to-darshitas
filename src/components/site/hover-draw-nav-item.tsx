"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import { playCardHoverSound } from "@/components/site-sound";

// Static oval chrome around the independently animated signal-decode label.

function scrollToPageAnchor(event: MouseEvent<HTMLAnchorElement>) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const destination = new URL(event.currentTarget.href);
  const isCurrentPage =
    destination.origin === window.location.origin &&
    destination.pathname === window.location.pathname;
  const target = destination.hash
    ? document.getElementById(destination.hash.slice(1))
    : null;

  if (!isCurrentPage || !target) return;

  event.preventDefault();
  window.history.pushState(
    null,
    "",
    `${destination.pathname}${destination.search}${destination.hash}`,
  );

  const shouldJump =
    event.detail === 0 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({
    behavior: shouldJump ? "auto" : "smooth",
    block: "start",
  });
}

export default function HoverDrawNavItem({
  label,
  href,
  scrollMotion = false,
}: {
  label: string;
  href: string;
  scrollMotion?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex no-underline"
      aria-label={label}
      onPointerEnter={playCardHoverSound}
      onClick={scrollMotion ? scrollToPageAnchor : undefined}
    >
      <span className="type-chrome chrome-primary relative inline-flex items-center justify-center px-[33px] py-[13px] whitespace-nowrap">
        <svg
          aria-hidden="true"
          viewBox="0 0 122 42"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <ellipse
            cx="61"
            cy="21"
            rx="59"
            ry="19"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className="inline-block"
          aria-hidden="true"
          data-signal-decode
          data-signal-group="nav"
          data-signal-hover
        >
          {label}
        </span>
      </span>
    </Link>
  );
}
