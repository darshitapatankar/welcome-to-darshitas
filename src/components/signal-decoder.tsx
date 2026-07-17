"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const UPPERCASE_GLYPHS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#$%&@",
);
const LOWERCASE_GLYPHS = Array.from(
  "abcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}=+*^?#$%&@",
);

type TextPart = {
  node: Text;
  start: number;
  length: number;
};

type DecodeTarget = {
  element: HTMLElement;
  source: string;
  parts: TextPart[];
  render: (value: string) => void;
};

type DecodeOptions = {
  baseDelay: number;
  duration: number;
  settle: number;
};

function captureTarget(element: HTMLElement): DecodeTarget | null {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const parts: TextPart[] = [];
  let source = "";
  let node = walker.nextNode();

  while (node) {
    const textNode = node as Text;
    const value = textNode.textContent ?? "";
    parts.push({ node: textNode, start: source.length, length: value.length });
    source += value;
    node = walker.nextNode();
  }

  if (!source || parts.length === 0) return null;

  return {
    element,
    source,
    parts,
    render: (value) => {
      parts.forEach((part) => {
        part.node.textContent = value.slice(
          part.start,
          part.start + part.length,
        );
      });
    },
  };
}

function isScrambleable(character: string) {
  return /[A-Za-z0-9]/.test(character);
}

function randomGlyph(sourceCharacter: string) {
  const pool = /[a-z]/.test(sourceCharacter)
    ? LOWERCASE_GLYPHS
    : UPPERCASE_GLYPHS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function scramble(source: string, lockedThrough = -1) {
  return Array.from(source, (character, index) => {
    if (index <= lockedThrough || !isScrambleable(character)) return character;
    return randomGlyph(character);
  }).join("");
}

function lockDimensions(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const previous = {
    display: element.style.display,
    width: element.style.width,
    height: element.style.height,
  };

  if (getComputedStyle(element).display === "inline") {
    element.style.display = "inline-block";
  }
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;

  return () => {
    element.style.display = previous.display;
    element.style.width = previous.width;
    element.style.height = previous.height;
  };
}

function runDecode(
  target: DecodeTarget,
  options: DecodeOptions,
  activeElements: Set<HTMLElement>,
  onFinish: (cancel: () => void) => void,
): (() => void) | null {
  if (activeElements.has(target.element)) return null;

  activeElements.add(target.element);
  const restoreDimensions = lockDimensions(target.element);
  const lastScrambleableIndex = Array.from(target.source).reduce(
    (last, character, index) => (isScrambleable(character) ? index : last),
    0,
  );
  const perCharacter =
    (options.duration - options.settle) / Math.max(lastScrambleableIndex, 1);
  let animationFrame = 0;
  let startedAt = -1;
  let nextShuffleAt = 0;
  let finished = false;

  target.render(scramble(target.source));

  const finish = () => {
    if (finished) return;
    finished = true;
    window.cancelAnimationFrame(animationFrame);
    target.render(target.source);
    restoreDimensions();
    activeElements.delete(target.element);
    onFinish(cancel);
  };

  const cancel = () => finish();

  const frame = (now: number) => {
    if (startedAt < 0) startedAt = now;
    const elapsed = now - startedAt;

    if (elapsed >= options.baseDelay + options.duration) {
      finish();
      return;
    }

    if (elapsed >= nextShuffleAt) {
      const lockTime = elapsed - options.baseDelay - options.settle;
      const lockedThrough =
        lockTime < 0 ? -1 : Math.floor(lockTime / perCharacter);
      target.render(scramble(target.source, lockedThrough));
      nextShuffleAt = elapsed + 34 + Math.random() * 14;
    }

    animationFrame = window.requestAnimationFrame(frame);
  };

  animationFrame = window.requestAnimationFrame(frame);
  return cancel;
}

function isVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.top < window.innerHeight &&
    rect.left < window.innerWidth
  );
}

function runInterference(
  target: DecodeTarget,
  duration: number,
  activeElements: Set<HTMLElement>,
  onFinish: (cancel: () => void) => void,
): (() => void) | null {
  if (activeElements.has(target.element)) return null;

  const candidates = Array.from(target.source)
    .map((character, index) => ({ character, index }))
    .filter(({ character }) => isScrambleable(character));
  const count = Math.min(candidates.length, 1 + Math.floor(Math.random() * 3));
  const selected = new Set<number>();

  while (selected.size < count && candidates.length > 0) {
    selected.add(
      candidates[Math.floor(Math.random() * candidates.length)].index,
    );
  }

  activeElements.add(target.element);
  let animationFrame = 0;
  let startedAt = -1;
  let nextShuffleAt = 0;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    window.cancelAnimationFrame(animationFrame);
    target.render(target.source);
    activeElements.delete(target.element);
    onFinish(cancel);
  };

  const cancel = () => finish();

  const frame = (now: number) => {
    if (startedAt < 0) startedAt = now;
    const elapsed = now - startedAt;

    if (elapsed >= duration) {
      finish();
      return;
    }

    if (elapsed >= nextShuffleAt) {
      target.render(
        Array.from(target.source, (character, index) =>
          selected.has(index) ? randomGlyph(character) : character,
        ).join(""),
      );
      nextShuffleAt = elapsed + 34 + Math.random() * 14;
    }

    animationFrame = window.requestAnimationFrame(frame);
  };

  animationFrame = window.requestAnimationFrame(frame);
  return cancel;
}

export default function SignalDecoder() {
  const pathname = usePathname();

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-signal-decode]"),
    );
    const targets = elements
      .map(captureTarget)
      .filter((target): target is DecodeTarget => target !== null);
    const activeElements = new Set<HTMLElement>();
    const cancelers = new Set<() => void>();
    const hoverCleanups: Array<() => void> = [];
    let footerObserver: IntersectionObserver | null = null;
    let cancelInterference: (() => void) | null = null;
    let initialSequenceStarted = false;

    const trackDecode = (target: DecodeTarget, options: DecodeOptions) => {
      const cancel = runDecode(
        target,
        options,
        activeElements,
        (finishedCancel) => cancelers.delete(finishedCancel),
      );
      if (cancel) cancelers.add(cancel);
    };

    const restoreAll = () => {
      cancelers.forEach((cancel) => cancel());
      cancelers.clear();
      cancelInterference = null;
      targets.forEach((target) => target.render(target.source));
    };

    const startInitialSequence = () => {
      if (initialSequenceStarted || motionPreference.matches) return;
      initialSequenceStarted = true;
      const heroTargets = targets.filter(
        (target) => target.element.dataset.signalGroup === "hero",
      );
      const navTargets = targets.filter(
        (target) => target.element.dataset.signalGroup === "nav",
      );
      const footerTargets = targets.filter(
        (target) => target.element.dataset.signalGroup === "footer",
      );

      heroTargets.forEach((target) =>
        trackDecode(target, { baseDelay: 0, duration: 1050, settle: 190 }),
      );
      navTargets.forEach((target, index) =>
        trackDecode(target, {
          baseDelay: 200 + index * 45,
          duration: 650,
          settle: 180,
        }),
      );

      if (footerTargets.length > 0) {
        const sequenceStartedAt = performance.now();
        let footerStarted = false;
        footerObserver = new IntersectionObserver((entries) => {
          if (footerStarted || !entries.some((entry) => entry.isIntersecting))
            return;
          footerStarted = true;
          const remainingGroupDelay = Math.max(
            0,
            400 - (performance.now() - sequenceStartedAt),
          );
          footerTargets.forEach((target, index) =>
            trackDecode(target, {
              baseDelay: remainingGroupDelay + index * 40,
              duration: target.source.length > 10 ? 800 : 650,
              settle: 180,
            }),
          );
          footerObserver?.disconnect();
        });
        footerTargets.forEach((target) =>
          footerObserver?.observe(target.element),
        );
      }

      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        targets
          .filter((target) => target.element.hasAttribute("data-signal-hover"))
          .forEach((target) => {
            const handlePointerEnter = () =>
              trackDecode(target, {
                baseDelay: 0,
                duration: 325,
                settle: 100,
              });
            target.element.addEventListener("pointerenter", handlePointerEnter);
            hoverCleanups.push(() =>
              target.element.removeEventListener(
                "pointerenter",
                handlePointerEnter,
              ),
            );
          });
      }
    };

    const handlePowerOnComplete = () => startInitialSequence();

    if (motionPreference.matches) {
      restoreAll();
    } else if (document.documentElement.dataset.crtPower === "boot") {
      window.addEventListener("crt:power-on-complete", handlePowerOnComplete, {
        once: true,
      });
    } else {
      startInitialSequence();
    }

    const handleGlitch = (event: Event) => {
      if (motionPreference.matches) return;
      cancelInterference?.();
      cancelInterference = null;
      const visibleTargets = targets.filter(
        (target) =>
          !activeElements.has(target.element) && isVisible(target.element),
      );
      if (visibleTargets.length === 0) return;

      const target =
        visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
      const duration =
        event instanceof CustomEvent &&
        typeof event.detail?.durationMs === "number"
          ? event.detail.durationMs
          : 120;
      const cancel = runInterference(
        target,
        duration,
        activeElements,
        (finishedCancel) => {
          cancelers.delete(finishedCancel);
          if (cancelInterference === finishedCancel) {
            cancelInterference = null;
          }
        },
      );
      if (cancel) {
        cancelInterference = cancel;
        cancelers.add(cancel);
      }
    };

    const handleGlitchEnd = () => {
      cancelInterference?.();
      cancelInterference = null;
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        restoreAll();
      } else {
        startInitialSequence();
      }
    };

    window.addEventListener("crt:glitch-start", handleGlitch);
    window.addEventListener("crt:glitch-end", handleGlitchEnd);
    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      restoreAll();
      footerObserver?.disconnect();
      hoverCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener(
        "crt:power-on-complete",
        handlePowerOnComplete,
      );
      window.removeEventListener("crt:glitch-start", handleGlitch);
      window.removeEventListener("crt:glitch-end", handleGlitchEnd);
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, [pathname]);

  return null;
}
