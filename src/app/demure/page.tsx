import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demure",
  description:
    "Demure is a typeface with soft curves and delicate serifs, balancing warmth and refinement.",
};

// Type-specimen page mirrored from the Framer /demure tree: a stack of
// 1420x800 crimson boards with white settings of the Demure typeface.
// The original page uses the custom "Demure" font (not publicly hosted);
// a serif fallback stands in until the font file is added.
const CANVAS = { width: 1420, height: 800 };

function pct(x: number, axis: "x" | "y") {
  return `${(x / (axis === "x" ? CANVAS.width : CANVAS.height)) * 100}%`;
}

function vw(px: number) {
  return `${((px / CANVAS.width) * 100).toFixed(2)}vw`;
}

function Board({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="relative aspect-[1420/800] w-full overflow-hidden bg-[#C20100] [font-family:Demure,ui-serif,Georgia,serif] text-white"
      data-theme="dark"
    >
      {children}
    </section>
  );
}

function Text({
  text,
  left,
  top,
  size,
  className,
}: {
  text: string;
  left: number;
  top: number;
  size: number;
  className?: string;
}) {
  return (
    <p
      className={`absolute leading-[1.156] whitespace-nowrap ${className ?? ""}`}
      style={{
        left: pct(left, "x"),
        top: pct(top, "y"),
        fontSize: vw(size),
      }}
    >
      {text}
    </p>
  );
}

const SPECIMEN =
  "the quick brown fox jumps over the lazy dog while a dozen quirky zebras " +
  "vibe a glowing jackfruit frogs quietly sip warm nectar and bright clouds " +
  "drift above the horizon nearby a playful kitten chases an agile squirrel " +
  "through the grassy meadow. jars of honey sit beside loaves of fresh";

export default function DemurePage() {
  return (
    <main className="flex min-h-dvh flex-col bg-white" data-theme="light">
      <Board>
        <Text text="demure" left={397} top={273} size={193.97} />
      </Board>
      <Board>
        <Text text={SPECIMEN} left={397} top={273} size={48} />
        <Text text="h" left={124} top={591} size={500} className="opacity-10" />
      </Board>
      <Board>
        <Text text="snow on the beach" left={204} top={452} size={128} />
        <Text
          text="h"
          left={124}
          top={-209}
          size={500}
          className="opacity-10"
        />
      </Board>
      <Board>
        <Text text="momentary" left={78} top={589} size={128} />
        <Text
          text="i"
          left={1160}
          top={-32}
          size={500}
          className="opacity-10"
        />
      </Board>
      <Board>
        <Text text="love" left={180} top={179} size={630.74} />
      </Board>
      <Board>
        <Text text="abcd efgh" left={843} top={358} size={120} />
        <Text text="ijkl mnop" left={857} top={481} size={120} />
        <Text text="qrst uvw xyz" left={611} top={604} size={120} />
      </Board>
    </main>
  );
}
