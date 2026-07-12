import PixelsBar from "@/components/pixels-bar";

// Port of the Framer "sides" background component: a full-viewport black
// panel with four vertical hairlines (Grid BG: 181px | 1fr | 1fr | 1fr |
// 180px columns), an optional two-row pixels bar with the section title,
// and a bottom rule 140px above the panel's lower edge.
const COLUMN_LINE = "rgb(47, 47, 64)";
const RULE = "rgb(37, 37, 51)";

type Gradient = "up" | "down" | "none";

const MASKS: Record<Gradient, string | undefined> = {
  up: "linear-gradient(0deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
  down: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%)",
  none: undefined,
};

export default function GridBg({
  gradient = "none",
  pixels,
}: {
  gradient?: Gradient;
  pixels?: "mains" | "sides";
}) {
  const mask = MASKS[gradient];
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {pixels && <PixelsBar title={pixels} />}
      <div
        className="pointer-events-none absolute inset-0 z-[2] flex"
        style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
      >
        <div className="w-[181px] shrink-0" />
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="flex-1 border-l"
            style={{ borderColor: COLUMN_LINE }}
          />
        ))}
        <div
          className="w-[180px] shrink-0 border-l"
          style={{ borderColor: COLUMN_LINE }}
        />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 z-[3] h-[140px] border-t"
        style={{ borderColor: RULE }}
      />
    </div>
  );
}
