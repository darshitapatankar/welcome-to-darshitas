"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Chrome pauses autoplaying videos in hidden tabs and doesn't reliably
    // resume them, so restart playback when the tab becomes visible again.
    const resume = () => {
      if (document.visibilityState === "visible" && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", resume);
    return () => document.removeEventListener("visibilitychange", resume);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-label="Hero animation"
      className={className}
    />
  );
}
