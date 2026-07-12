"use client";

import { useEffect, useRef, useState } from "react";

// Port of the Framer PixelReveal code override: a grid of black cells covers
// the children and pops away cell-by-cell in random order once in view.
const GRID_COLUMNS = 20;
const TOTAL_DURATION_MS = 1600;
const CELL_POP_MS = 30;

export default function PixelReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Delays are randomized, so compute them only on the client after mount to
  // keep server and client markup identical (avoids hydration mismatches).
  const [delays, setDelays] = useState<number[] | null>(null);
  const [triggered, setTriggered] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Intentional pre-paint state sync: can't be initial state (server
      // markup must match), and reduced-motion users must never see the cover.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTriggered(true);
      setRemoved(true);
      return;
    }

    const rect = node.getBoundingClientRect();
    const rows = Math.max(
      1,
      Math.ceil(rect.height / (rect.width / GRID_COLUMNS)),
    );
    const count = GRID_COLUMNS * rows;
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setDelays(
      order.map((o) => (o / Math.max(1, count - 1)) * TOTAL_DURATION_MS),
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setTriggered(true);
        observer.disconnect();
        window.setTimeout(
          () => setRemoved(true),
          TOTAL_DURATION_MS + CELL_POP_MS + 60,
        );
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const covered = !removed;
  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {children}
      {covered && delays === null && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-black"
        />
      )}
      {covered && delays !== null && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 grid overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${Math.ceil(delays.length / GRID_COLUMNS)}, 1fr)`,
          }}
        >
          {delays.map((delay, i) => (
            <div
              key={i}
              className="bg-black"
              style={{
                opacity: triggered ? 0 : 1,
                transition: `opacity ${CELL_POP_MS}ms steps(1, end) ${delay}ms`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
