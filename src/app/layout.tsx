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
  const legacyProjectPaths = JSON.stringify(LEGACY_PROJECT_PATHS);

  // No h-full on <html>: a fixed-height root box stops Lenis's ResizeObserver
  // from seeing content growth, freezing its scroll limit.
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${montserrat.variable} ${firaMono.variable} ${fragmentMono.variable} ${inter.variable} ${workSans.variable} ${gambarino.variable} antialiased`}
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
