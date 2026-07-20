"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Exact port of the Framer "Pixels Bar" component: a 24×2 grid of square
// flicker cells bounded by 1px rules, cycling through the component's six
// variant patterns every 4 seconds,
// with the section's script-lettering title overlaid inside the band.
// Mains title sits right: 260px; Sides title sits left: 260px.
const RULE = "rgb(37, 37, 51)";
const TILE_FRAME_INTERVAL_MS = 4000;

const CELL_COLORS: Record<string, string> = {
  H: "rgb(76, 20, 56)",
  M: "rgb(38, 10, 28)",
  L: "rgb(28, 7, 21)",
};

// Row-major 24×2 intensity maps lifted from the six Pixels Bar variants.
const PATTERNS = [
  "M.H...M.....M......L...M" + ".L...M..H....M....M...M.",
  "....L...M..H.....M...H.." + "M......H.L..M..L...M...M",
  "...M.M...M....H.M...L..." + "..H.L.M....M.....M...H..",
  ".L......M..H..M.M..H...M" + "...H...........M.M...L..",
  "M......M.....L..H...M..." + ".M....H..M.M.......M...L",
  "....M...M..L.....H...L.." + "M......M.H..M..L...M...H",
];

export default function PixelsBar({ title }: { title: "mains" | "sides" }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % PATTERNS.length),
      TILE_FRAME_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  const pattern = PATTERNS[frame];

  return (
    <div
      className="absolute inset-x-0 top-[140px] border-y"
      style={{ borderColor: RULE }}
      aria-hidden="true"
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
      >
        {Array.from({ length: 48 }, (_, i) => (
          <div
            key={i}
            className="aspect-square"
            style={{
              backgroundColor: CELL_COLORS[pattern[i]] ?? "transparent",
            }}
          />
        ))}
      </div>
      {title === "mains" ? (
        <Image
          src="/work/mains-title-v2.png"
          alt=""
          width={387}
          height={155}
          className="absolute top-1/2 right-[260px] z-[3] h-auto w-[189.5px] -translate-y-1/2"
        />
      ) : (
        <Image
          src="/work/sides-title-v2.png"
          alt=""
          width={377}
          height={180}
          className="absolute top-1/2 left-[260px] z-[3] h-auto w-[180px] -translate-y-1/2"
        />
      )}
    </div>
  );
}
