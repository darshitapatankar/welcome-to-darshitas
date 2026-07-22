import type { Metadata } from "next";
import {
  DM_Sans,
  Fragment_Mono,
  Inter,
  Montserrat,
} from "next/font/google";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import SmoothScroll from "@/components/smooth-scroll";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import CrtEffect from "@/components/crt-effect";
import EscapeToHome from "@/components/escape-to-home";
import SignalDecoder from "@/components/signal-decoder";
import { LEGACY_PROJECT_PATHS } from "@/lib/project-routes";
import { workSans } from "./fonts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = localFont({
  src: [
    { path: "./font-files/GeistMono-Thin.ttf", weight: "100" },
    { path: "./font-files/GeistMono-ExtraLight.ttf", weight: "200" },
    { path: "./font-files/GeistMono-Light.ttf", weight: "300" },
    { path: "./font-files/GeistMono-Regular.ttf", weight: "400" },
    { path: "./font-files/GeistMono-Medium.ttf", weight: "500" },
    { path: "./font-files/GeistMono-SemiBold.ttf", weight: "600" },
    { path: "./font-files/GeistMono-Bold.ttf", weight: "700" },
    { path: "./font-files/GeistMono-ExtraBold.ttf", weight: "800" },
    { path: "./font-files/GeistMono-Black.ttf", weight: "900" },
    {
      path: "./font-files/GeistMono-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "./font-files/GeistMono-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
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
  const legacyProjectPaths = JSON.stringify(LEGACY_PROJECT_PATHS);

  // No h-full on <html>: a fixed-height root box stops Lenis's ResizeObserver
  // from seeing content growth, freezing its scroll limit.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${montserrat.variable} ${geistMono.variable} ${fragmentMono.variable} ${inter.variable} ${workSans.variable} ${gambarino.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var root=document.documentElement;var pathname=window.location.pathname;var legacy=${legacyProjectPaths};var isProject=pathname.indexOf('/projects/')===0||legacy.indexOf(pathname)!==-1;root.dataset.crtMode=isProject?'project':'home';if('scrollRestoration'in history){history.scrollRestoration='manual';}window.scrollTo(0,0);window.addEventListener('pageshow',function(){window.scrollTo(0,0);},{once:true});if(!isProject&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){root.dataset.crtPower='boot';window.__crtPowerFailsafe=window.setTimeout(function(){if(root.dataset.crtPower==='boot'){window.scrollTo(0,0);delete root.dataset.crtPower;window.scrollTo(0,0);window.dispatchEvent(new CustomEvent('crt:power-on-complete'));}},2000);}}catch(error){}})();`,
          }}
        />
        <link
          rel="preload"
          as="audio"
          href="/crt/tv-power-on.mp3"
          type="audio/mpeg"
          media="(prefers-reduced-motion: no-preference)"
        />
        <link
          rel="preload"
          as="audio"
          href="/audio/card-hover.mp3"
          type="audio/mpeg"
          media="(hover: hover) and (pointer: fine)"
        />
      </head>
      {/* This wrapper intentionally has no position, transform, opacity, or
          z-index, so it does not create a stacking context around the site's
          blend-mode elements. It is only the source for brief glitch slices. */}
      <body className="flex min-h-dvh flex-col bg-black font-sans text-white">
        <div className="flex min-h-dvh flex-1 flex-col" data-crt-content>
          <Nav />
          <SmoothScroll>{children}</SmoothScroll>
          <Footer />
        </div>
        <EscapeToHome />
        {process.env.NODE_ENV === "development" && <Agentation />}
        <CrtEffect />
        <SignalDecoder />
      </body>
    </html>
  );
}
