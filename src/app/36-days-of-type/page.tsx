import type { Metadata } from "next";
import ThirtySixDaysGallery from "@/components/project/thirty-six-days-gallery";

export const metadata: Metadata = {
  title: "36 Days of Type",
  description:
    "Explorations of Latin letterforms with bold colors, fluid shapes, and playful compositions for the annual 36 Days of Type challenge.",
};

export default function ThirtySixDaysOfTypePage() {
  return (
    <main className="min-h-dvh bg-[#0A0A0A]" data-theme="dark">
      <ThirtySixDaysGallery />
    </main>
  );
}
