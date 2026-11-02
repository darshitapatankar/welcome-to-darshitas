import type { Metadata } from "next";
import SmoothScroll from "@/components/smooth-scroll";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";
import CrtEffect from "@/components/crt-effect";
import DevelopmentAgentation from "@/components/development-agentation";
import EscapeToHome from "@/components/escape-to-home";
import SignalDecoder from "@/components/signal-decoder";
import { LEGACY_PROJECT_PATHS } from "@/lib/project-routes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { geistMono, workSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Design portfolio",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@_darshi",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
      className={`${geistMono.variable} ${workSans.variable} antialiased`}
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
        {process.env.NODE_ENV === "development" && <DevelopmentAgentation />}
        <CrtEffect />
        <SignalDecoder />
      </body>
    </html>
  );
}
