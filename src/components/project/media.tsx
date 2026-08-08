/* eslint-disable @next/next/no-img-element */

import { DeferredVideo } from "@/components/project/deferred-video";

// Plain <img>/<video> keeps these pages decoupled from next/image remote
// pattern configuration; all media is served from framerusercontent.com.

export function ProjectImage({
  src,
  alt = "",
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className ?? "block w-full"}
      style={style}
    />
  );
}

export function ProjectVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <DeferredVideo
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={className ?? "block w-full"}
    />
  );
}
