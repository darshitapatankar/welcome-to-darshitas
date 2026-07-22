"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  startCardDither,
  stopCardDither,
  updateCardDitherPointer,
} from "@/components/card-dither";
import { playCardHoverSound } from "@/components/site-sound";
import {
  applySampledCardGlow,
  CARD_HOVER_CONFIG,
} from "@/components/card-hover-glow";
import { rememberWorkReturnPosition } from "@/lib/work-return-position";

export type ProjectCardData = {
  srNo: string;
  title: string;
  subtext?: string;
  tags?: string[];
  thumbnail: string;
  thumbnailVideo?: string;
  aspect: "16:9" | "4:3" | "3:2" | "1:1" | "4:5";
  href?: string;
};

// Ratios come from the Card component's image frames in Framer; its "4:5"
// variant actually renders at 0.85, not 0.8.
const ASPECT: Record<ProjectCardData["aspect"], string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  "4:5": "aspect-[0.85]",
};

export default function ProjectCard({
  card,
  className,
}: {
  card: ProjectCardData;
  className?: string;
}) {
  const router = useRouter();
  const cardRef = useRef<HTMLElement | null>(null);
  const thumbnailRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVisibleRef = useRef(false);
  const transitionPendingRef = useRef(false);

  const setCardRef = useCallback((node: HTMLElement | null) => {
    cardRef.current = node;
  }, []);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && videoRef.current) {
          void videoRef.current.play().catch(() => undefined);
        } else if (!entry.isIntersecting) {
          stopCardDither(cardElement);
        }
      },
      { threshold: 0.01 },
    );
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stopWhenDisabled = () => {
      if (!hoverQuery.matches || motionQuery.matches) {
        stopCardDither(cardElement);
      }
    };

    observer.observe(cardElement);
    hoverQuery.addEventListener("change", stopWhenDisabled);
    motionQuery.addEventListener("change", stopWhenDisabled);
    return () => {
      observer.disconnect();
      hoverQuery.removeEventListener("change", stopWhenDisabled);
      motionQuery.removeEventListener("change", stopWhenDisabled);
      stopCardDither(cardElement);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const ensurePlayback = () => {
      void videoElement.play().catch(() => undefined);
    };

    ensurePlayback();
    videoElement.addEventListener("canplay", ensurePlayback);
    return () => videoElement.removeEventListener("canplay", ensurePlayback);
  }, [card.thumbnailVideo]);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    cardElement.style.setProperty(
      "--card-glow-opacity",
      String(CARD_HOVER_CONFIG.glowOpacity),
    );
    cardElement.style.setProperty(
      "--card-glow-radius",
      `${CARD_HOVER_CONFIG.glowRadius}px`,
    );
    cardElement.style.setProperty(
      "--card-glow-inset",
      `${Math.round(CARD_HOVER_CONFIG.glowRadius * -0.28)}px`,
    );

    const imageElement = imageRef.current;
    if (imageElement) {
      const sample = () => applySampledCardGlow(cardElement, imageElement);
      if (imageElement.complete && imageElement.naturalWidth) sample();
      else imageElement.addEventListener("load", sample, { once: true });
      return () => imageElement.removeEventListener("load", sample);
    }

    const poster = new window.Image();
    const samplePoster = () => applySampledCardGlow(cardElement, poster);
    poster.addEventListener("load", samplePoster, { once: true });
    poster.src = card.thumbnail;
    return () => poster.removeEventListener("load", samplePoster);
  }, [card.thumbnail]);

  const updateDitherPointer = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const cardElement = cardRef.current;
      const thumbnailElement = thumbnailRef.current;
      if (!cardElement || !thumbnailElement) return;
      const rect = thumbnailElement.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = (1 - (event.clientY - rect.top) / rect.height) * 2 - 1;
      updateCardDitherPointer(cardElement, x, y);
    },
    [],
  );

  const handlePointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const cardElement = cardRef.current;
      const thumbnailElement = thumbnailRef.current;
      const source = videoRef.current ?? imageRef.current;
      if (
        !cardElement ||
        !thumbnailElement ||
        !source ||
        !isVisibleRef.current
      ) {
        return;
      }
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;
      playCardHoverSound();
      cardElement.dataset.cardHovered = "true";
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      startCardDither(cardElement, thumbnailElement, source);
      updateDitherPointer(event);
    },
    [updateDitherPointer],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      updateDitherPointer(event);
    },
    [updateDitherPointer],
  );

  const handlePointerLeave = useCallback(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    delete cardElement.dataset.cardHovered;
    stopCardDither(cardElement);
  }, []);

  const handleProjectClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      const isStandardNavigation =
        !event.defaultPrevented &&
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey;

      if (card.href && isStandardNavigation) {
        rememberWorkReturnPosition();
      }

      if (
        !card.href ||
        !isStandardNavigation ||
        event.detail === 0 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const target = event.target;
      if (
        !(target instanceof Element) ||
        !target.closest("[data-card-thumbnail]")
      ) {
        return;
      }

      event.preventDefault();
      if (transitionPendingRef.current) return;
      transitionPendingRef.current = true;

      window.dispatchEvent(
        new CustomEvent("crt:force-glitch", {
          detail: { durationMs: 135, intensityMultiplier: 0.45 },
        }),
      );

      window.setTimeout(() => {
        router.push(card.href!, { scroll: true });
      }, 68);
    },
    [card.href, router],
  );

  const thumbnail = (
    <div
      ref={thumbnailRef}
      className={`relative w-full overflow-hidden ${ASPECT[card.aspect]}`}
    >
      {card.thumbnailVideo ? (
        <video
          ref={videoRef}
          src={card.thumbnailVideo}
          poster={card.thumbnail}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          ref={imageRef}
          src={card.thumbnail}
          alt={card.title}
          fill
          unoptimized={card.thumbnail.includes("?")}
          className="object-cover"
          sizes="(max-width: 810px) 100vw, 40vw"
        />
      )}
    </div>
  );

  const content = (
    <>
      <p className="type-card-index text-[#FF56C1]">{card.srNo}</p>
      <div
        className="card-thumbnail-shell relative z-0 w-full"
        data-card-thumbnail
      >
        {thumbnail}
      </div>
      <div className="flex flex-col gap-4 p-2.5">
        <div className="flex flex-col gap-2.5">
          <h3 className="type-card-title font-normal text-[#F2F2F2] uppercase">
            {card.title}
          </h3>
          {card.subtext && (
            <p className="type-card-tagline text-[#CFCFCF]">{card.subtext}</p>
          )}
        </div>
        {/* Framer's tagless cards use an "Invisible" Tag Groups variant that
            still occupies layout space, so always reserve the row */}
        <ul
          className={`flex flex-wrap gap-2.5 ${
            card.tags && card.tags.length > 0 ? "" : "invisible"
          }`}
        >
          {(card.tags && card.tags.length > 0 ? card.tags : ["—"]).map(
            (tag) => (
              <li
                key={tag}
                data-card-tag
                className="type-card-tag border border-[#3D3D3D] px-2 py-1 text-[#9A9A9A]"
              >
                {tag}
              </li>
            ),
          )}
        </ul>
      </div>
    </>
  );

  const classes = `flex flex-col gap-2.5 ${className ?? ""}`;
  if (card.href) {
    return (
      <Link
        ref={setCardRef}
        href={card.href}
        scroll
        data-project-card
        className={`${classes} no-underline`}
        onClick={handleProjectClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="flex flex-col gap-2.5">{content}</div>
      </Link>
    );
  }
  return (
    <div
      ref={setCardRef}
      data-project-card
      className={classes}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="flex flex-col gap-2.5">{content}</div>
    </div>
  );
}
