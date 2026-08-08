import type { Metadata } from "next";
import { FreeformCanvas, FreeformImage } from "@/components/project/freeform";

export const metadata: Metadata = {
  title: "Custom Type",
  description:
    "A deep dive into custom type design experimenting with different styles, textures, and cultural influences.",
  alternates: { canonical: "/projects/custom-type" },
};

// Freeform collage mirrored from the Framer /custom-type page tree
// (a 1420x3085 black canvas with scattered type experiments).
const CANVAS = { width: 1420, height: 3085 };

const PIECES = [
  {
    name: "Veer Zara",
    src: "https://framerusercontent.com/images/iXgV46Vly162Q4o18mTfRBUXBdU.png",
    left: 65.5,
    top: 1039,
    width: 580,
    height: 580,
  },
  {
    name: "Rose",
    src: "https://framerusercontent.com/images/e9If0bjkewWRd7XQWY79o3Q5wIc.png",
    left: 793.5,
    top: 1105,
    width: 524,
    height: 524,
    rotation: -11,
  },
  {
    name: "Lover",
    src: "https://framerusercontent.com/images/vM2rRkXFywWmv7Aw6Ux5WR7yCuw.png",
    left: 733.5,
    top: 1920,
    width: 568,
    height: 568,
    rotation: 5,
  },
  {
    name: "Apple",
    src: "https://framerusercontent.com/images/zqNeBIlkqDzErPiSLeGTCVoO1nM.png",
    left: 89.5,
    top: 1733,
    width: 532,
    height: 532,
  },
  {
    name: "BRAT",
    src: "https://framerusercontent.com/images/OpfYu06EToWNJyAFQDarLMcPpy8.png",
    left: 113,
    top: 519.5,
    width: 321,
    height: 321,
    rotation: -8,
  },
  {
    name: "Pyaasa",
    src: "https://framerusercontent.com/images/MrXjJn7Pmd2RY4moyjLF0iYxrs.jpg",
    left: 152.49,
    top: 2452.5,
    width: 486,
    height: 451,
    rotation: -2,
  },
  {
    name: "Barbie",
    src: "https://framerusercontent.com/images/fjlHK8E7fy7ONVPdE24KWPrrU.png",
    left: 509,
    top: 46,
    width: 854,
    height: 854,
  },
];

export default function CustomTypePage() {
  return (
    <main className="min-h-dvh bg-black" data-theme="dark">
      <FreeformCanvas designWidth={CANVAS.width} designHeight={CANVAS.height}>
        {PIECES.map(({ name, ...piece }) => (
          <FreeformImage
            key={name}
            alt={`Custom type — ${name}`}
            canvas={CANVAS}
            {...piece}
          />
        ))}
      </FreeformCanvas>
    </main>
  );
}
