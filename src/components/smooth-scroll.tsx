"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    let scrollGuardFrame = 0;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    const handlePowerOnComplete = () => {
      lenis.start();
      resetScroll();
      let remainingGuardFrames = 18;
      const holdAtTop = () => {
        resetScroll();
        remainingGuardFrames -= 1;
        if (remainingGuardFrames > 0) {
          scrollGuardFrame = window.requestAnimationFrame(holdAtTop);
        }
      };
      scrollGuardFrame = window.requestAnimationFrame(holdAtTop);
    };

    if (document.documentElement.dataset.crtPower === "boot") {
      lenis.stop();
      resetScroll();
      window.addEventListener("crt:power-on-complete", handlePowerOnComplete, {
        once: true,
      });
    } else {
      resetScroll();
    }

    if (process.env.NODE_ENV === "development") {
      // QA handles — inspect Lenis/GSAP state from the console/automation
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
      (window as unknown as { __gsap?: typeof gsap }).__gsap = gsap;
    }

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener(
        "crt:power-on-complete",
        handlePowerOnComplete,
      );
      window.cancelAnimationFrame(scrollGuardFrame);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!pathname.startsWith("/projects/")) return;

    const resetProjectScroll = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    };

    resetProjectScroll();
    const frame = window.requestAnimationFrame(resetProjectScroll);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return <>{children}</>;
}
