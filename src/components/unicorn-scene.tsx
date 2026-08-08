"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

const SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.8/dist/unicornStudio.umd.js";

interface UnicornSceneInstance {
  destroy: () => void;
}

interface UnicornStudioGlobal {
  init: () => Promise<void> | void;
  addScene: (config: {
    elementId: string;
    projectId: string;
    scale?: number;
    dpi?: number;
    fps?: number;
    lazyLoad?: boolean;
    altText?: string;
    ariaLabel?: string;
  }) => Promise<UnicornSceneInstance>;
}

export function UnicornStudioEmbed({
  projectId,
  width,
  height,
  fitWidthBelow,
  className,
}: {
  projectId: string;
  width: number;
  height: number;
  fitWidthBelow?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fitScale, setFitScale] = useState(fitWidthBelow ? 0 : 1);

  useLayoutEffect(() => {
    if (!fitWidthBelow) return;
    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent) return;

    const updateScale = () => {
      const parentWidth = parent.getBoundingClientRect().width;
      setFitScale(
        parentWidth < fitWidthBelow ? Math.min(1, parentWidth / width) : 1,
      );
    };
    const observer = new ResizeObserver(updateScale);
    observer.observe(parent);
    updateScale();
    return () => observer.disconnect();
  }, [fitWidthBelow, width]);

  useEffect(() => {
    let cancelled = false;

    loadUnicornStudio()
      .then((studio) => studio.init())
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch((error) => {
        console.error("[UnicornStudioEmbed]", error);
      });

    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        scale: fitScale,
        transformOrigin: "top center",
      }}
      data-us-project={projectId}
      data-loaded={loaded}
      className={className}
      aria-hidden="true"
    />
  );
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioGlobal;
  }
}

let scriptPromise: Promise<UnicornStudioGlobal> | null = null;

function loadUnicornStudio(): Promise<UnicornStudioGlobal> {
  if (window.UnicornStudio?.addScene) {
    return Promise.resolve(window.UnicornStudio);
  }
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      if (window.UnicornStudio?.addScene) {
        resolve(window.UnicornStudio);
      } else {
        reject(new Error("Unicorn Studio script loaded but API is missing"));
      }
    };
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Failed to load Unicorn Studio script"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export default function UnicornScene({
  projectId,
  className,
  altText = "Animated background",
}: {
  projectId: string;
  className?: string;
  altText?: string;
}) {
  // addScene looks the element up by id, so the id must be CSS-selector safe
  const elementId = `us-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let scene: UnicornSceneInstance | null = null;
    let cancelled = false;

    // destroy() can throw from inside the SDK's render loop when a scene is
    // torn down mid-boot (e.g. Strict Mode's mount/unmount/mount in dev).
    const safeDestroy = (instance: UnicornSceneInstance) => {
      try {
        instance.destroy();
      } catch {
        // scene never finished booting; nothing to clean up
      }
    };

    loadUnicornStudio()
      .then((studio) => {
        // Don't boot a scene for an effect that was already cleaned up —
        // destroying a half-initialized scene crashes the SDK's async loop.
        if (cancelled) return null;
        return studio.addScene({
          elementId,
          projectId,
          lazyLoad: false,
          altText,
          ariaLabel: altText,
        });
      })
      .then((instance) => {
        if (!instance) return;
        if (cancelled) {
          safeDestroy(instance);
        } else {
          scene = instance;
          setLoaded(true);
        }
      })
      .catch((error) => {
        console.error("[UnicornScene]", error);
      });

    return () => {
      cancelled = true;
      if (scene) safeDestroy(scene);
    };
  }, [elementId, projectId, altText]);

  return (
    <div
      id={elementId}
      ref={containerRef}
      className={className}
      data-loaded={loaded}
      aria-hidden="true"
    />
  );
}
