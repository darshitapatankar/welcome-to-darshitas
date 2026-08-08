"use client";

import { useEffect, useRef, useState } from "react";

type DeferredVideoProps = Omit<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  "src"
> & {
  src: string;
  rootMargin?: string;
};

/**
 * Keeps off-screen looping media from competing with the page's visible images.
 * The source is attached shortly before the video reaches the viewport so autoplay
 * remains intact while the initial page becomes responsive sooner.
 */
export function DeferredVideo({
  src,
  rootMargin = "900px 0px",
  preload = "metadata",
  ...videoProps
}: DeferredVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <video
      ref={videoRef}
      {...videoProps}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? preload : "none"}
    />
  );
}
