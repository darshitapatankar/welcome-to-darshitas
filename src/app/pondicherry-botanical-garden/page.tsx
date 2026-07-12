import type { Metadata } from "next";
import { ProjectImage } from "@/components/project/media";

export const metadata: Metadata = {
  title: "Pondicherry Botanical Garden",
  description:
    "A reimagining of the Pondicherry Botanical Garden, drawing inspiration from its depiction in Life of Pi.",
};

const IMAGES = [
  "https://framerusercontent.com/images/qV4qiJTlQDszZgRInMJjKHw55kM.png",
  "https://framerusercontent.com/images/TvRCvTSCejQd4DlzlJ418t2OtU.png",
  "https://framerusercontent.com/images/65p7uPUmrP8CV3XjFfUSwH6NdQo.png",
  "https://framerusercontent.com/images/J2tWRnGX1magyfAXHHRWcrsND9M.png",
  "https://framerusercontent.com/images/dYFvQjWt1qJcgrHQuLwSg5NskNk.png",
  "https://framerusercontent.com/images/4fCvym3a8dadYwwPFA1I4okM9o.png",
  "https://framerusercontent.com/images/ffvrR8LpBKKYqaPPdTCe19l7tQ.png",
];

// Case-study showcase page, mirrored from the Framer
// /pondicherry-botanical-garden page tree: a vertical stack of boards.
export default function PondicherryBotanicalGardenPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-white">
      {IMAGES.map((src, i) => (
        <ProjectImage
          key={src}
          src={src}
          alt={`Pondicherry Botanical Garden board ${i + 1}`}
        />
      ))}
    </main>
  );
}
