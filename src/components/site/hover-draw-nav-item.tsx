"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

// Port of the Framer "HoverDrawNavItem" code component: a nav link wrapped in
// a hand-drawn SVG ellipse that redraws itself (pathLength 0 → 1) and glows
// brighter while hovered, then resets for replay.
const REST_GLOW = "drop-shadow(0 0 8px #ffffff)";
const HOVER_GLOW =
  "drop-shadow(0 0 15.2px #ffffff) drop-shadow(0 0 7.2px #ffffff)";

export default function HoverDrawNavItem({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} className="inline-flex no-underline">
      <motion.span
        className="relative inline-flex items-center justify-center px-[33px] py-[13px] text-[15px] leading-none whitespace-nowrap text-white"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 122 42"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <motion.ellipse
            cx="61"
            cy="21"
            rx="59"
            ry="19"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={
              hovered
                ? { pathLength: [0, 1], filter: HOVER_GLOW }
                : { pathLength: 1, filter: REST_GLOW }
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </svg>
        {label}
      </motion.span>
    </Link>
  );
}
