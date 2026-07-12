import type { Metadata } from "next";
import {
  DM_Sans,
  Fira_Mono,
  Fragment_Mono,
  Inter,
  Montserrat,
} from "next/font/google";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import SmoothScroll from "@/components/smooth-scroll";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import { geistMono, workSans } from "./fonts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Custom display serif from the published Framer site (Fontshare), used for
// the giant "Darshita Patankar" footer wordmark and case-study headings.
const gambarino = localFont({
  src: "../../public/fonts/gambarino.woff2",
  variable: "--font-gambarino",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darshita's Portfolio",
  description: "Creative portfolio of Darshita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // No h-full on <html>: a fixed-height root box stops Lenis's ResizeObserver
  // from seeing content growth, freezing its scroll limit.
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${montserrat.variable} ${firaMono.variable} ${fragmentMono.variable} ${inter.variable} ${workSans.variable} ${gambarino.variable} ${geistMono.variable} antialiased`}
    >
      {/* Nav and Footer stay direct children of <body> — do NOT wrap them (or
          children) in a positioned/z-indexed container: blend-mode elements
          (nav uses mix-blend-difference, hero blends onto the Unicorn canvas)
          must not be trapped inside a new stacking context. */}
      <body className="flex min-h-dvh flex-col bg-black font-sans text-white">
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
