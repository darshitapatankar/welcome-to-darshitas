import type { Metadata } from "next";
import { ProjectImage } from "@/components/project/media";

export const metadata: Metadata = {
  title: "36 Days of Type",
  description:
    "Explorations of Latin letterforms with bold colors, fluid shapes, and playful compositions for the annual 36 Days of Type challenge.",
};

// Letter boards in page order, mirrored from the Framer /36-days-of-type tree.
const LETTERS: Array<{ letter: string; src: string }> = [
  {
    letter: "L",
    src: "https://framerusercontent.com/images/ACtc7zfAb5CxB39rymdklqtUIu8.png",
  },
  {
    letter: "E",
    src: "https://framerusercontent.com/images/CTNyMjhBtrQmn8vjBRpC2NaG4ss.png",
  },
  {
    letter: "Q",
    src: "https://framerusercontent.com/images/xBcCaQ6782COhj0e20OA9PRck0.png",
  },
  {
    letter: "I",
    src: "https://framerusercontent.com/images/Gd9wxoEd2K6hXGenl6UrSMnWg4.png",
  },
  {
    letter: "U",
    src: "https://framerusercontent.com/images/M7oe0uw56XNTEuLdS3lObCssZk.png",
  },
  {
    letter: "R",
    src: "https://framerusercontent.com/images/A3Cdzazj8KKIucWSacGD7gmClk.png",
  },
  {
    letter: "S",
    src: "https://framerusercontent.com/images/XMCop598gFHYyDAMAN63Bqjluo4.png",
  },
  {
    letter: "D",
    src: "https://framerusercontent.com/images/HpF7mv6JkxGqf298974kXwxA.png",
  },
  {
    letter: "G",
    src: "https://framerusercontent.com/images/xomo0dICDtDftm3kItIrHV4IxRw.png",
  },
  {
    letter: "K",
    src: "https://framerusercontent.com/images/qZQ4HM7QFQ1MISryL9N1EbxZ8.png",
  },
  {
    letter: "P",
    src: "https://framerusercontent.com/images/Nd1eIZfkijRAcfTIRuRdNOVszqA.png",
  },
  {
    letter: "O",
    src: "https://framerusercontent.com/images/uxLaYNY6gkuKGUnAF8iRch1Yf3g.png",
  },
];

export default function ThirtySixDaysOfTypePage() {
  return (
    <main className="flex min-h-dvh flex-col bg-white">
      {LETTERS.map(({ letter, src }) => (
        <ProjectImage
          key={letter}
          src={src}
          alt={`36 Days of Type — letter ${letter}`}
          className="block aspect-square w-full object-cover"
        />
      ))}
    </main>
  );
}
