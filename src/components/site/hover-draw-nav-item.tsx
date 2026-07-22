"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { playCardHoverSound } from "@/components/site-sound";
import { requestWorkReturn } from "@/lib/work-return-position";

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
  restoreWorkPosition = false,
}: {
  label: string;
  href: string;
  scrollMotion?: boolean;
  restoreWorkPosition?: boolean;
}) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (scrollMotion) scrollToPageAnchor(event);

    if (
      event.defaultPrevented ||
      !restoreWorkPosition ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !requestWorkReturn()
    ) {
      return;
    }

    event.preventDefault();
    router.push("/", { scroll: false });
  };

  return (
    <Link
      href={href}
      className="inline-flex no-underline"
      aria-label={label}
      onPointerEnter={playCardHoverSound}
      onClick={handleClick}
    >
      <span className="type-chrome chrome-primary relative inline-flex h-[42px] w-[108px] shrink-0 items-center justify-center whitespace-nowrap">
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
