import FlickerGrid from "@/components/flicker-grid";

// Port of the Framer "sides" background component: a full-viewport black
// panel with five vertical hairline columns (Grid BG), an optional flicker
// pixel band, and a bottom rule 140px above the panel's lower edge.
const LINE = "rgb(37, 37, 51)";

type Gradient = "up" | "down" | "none";

const MASKS: Record<Gradient, string | undefined> = {
  up: "linear-gradient(0deg, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)",
  down: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%)",
  none: undefined,
};

export default function GridBg({
  gradient = "none",
  flicker = false,
}: {
  gradient?: Gradient;
  flicker?: boolean;
}) {
  const mask = MASKS[gradient];
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {flicker && (
        <FlickerGrid className="absolute inset-x-0 top-[140px] h-[520px] w-full" />
      )}
      <div
        className="absolute inset-0 z-[2] flex"
        style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
      >
        <div className="w-[12.5%]" />
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex-1 border-l"
            style={{ borderColor: LINE }}
          />
        ))}
        <div className="w-[12.5%] border-l" style={{ borderColor: LINE }} />
      </div>
      <div
        className="absolute inset-x-0 bottom-0 z-[3] h-[140px] border-t"
        style={{ borderColor: LINE }}
      />
    </div>
  );
}
