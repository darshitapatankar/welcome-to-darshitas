import {
  forwardRef,
  startTransition,
  type ComponentType,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useIsStaticRenderer } from "framer";

const GRID_COLUMNS = 20;
const TOTAL_DURATION_MS = 1600;
const CELL_POP_MS = 30;
const IN_VIEW_THRESHOLD = 0.3;
const COVER_COLOR = "#000000";

interface OverlayGrid {
  columns: number;
  rows: number;
  count: number;
}

export function withPixelReveal(Component: ComponentType<any>): ComponentType {
  return forwardRef((props: Record<string, any>, ref) => {
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [overlayRemoved, setOverlayRemoved] = useState(false);
    const [grid, setGrid] = useState<OverlayGrid>({
      columns: GRID_COLUMNS,
      rows: GRID_COLUMNS,
      count: GRID_COLUMNS * GRID_COLUMNS,
    });
    const isStaticRenderer = useIsStaticRenderer();

    const prefersReducedMotion = useMemo(() => {
      if (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function"
      ) {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
      return false;
    }, []);

    useEffect(() => {
      if (isStaticRenderer) return;
      if (typeof window === "undefined") return;
      if (!overlayRef.current) return;

      const updateGrid = () => {
        if (!overlayRef.current) return;
        const rect = overlayRef.current.getBoundingClientRect();
        const width = Math.max(1, rect.width);
        const height = Math.max(1, rect.height);
        const cellSize = width / GRID_COLUMNS;
        const rows = Math.max(1, Math.ceil(height / cellSize));
        const count = GRID_COLUMNS * rows;
        startTransition(() => {
          setGrid({ columns: GRID_COLUMNS, rows, count });
        });
      };

      updateGrid();

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(updateGrid);
        resizeObserver.observe(overlayRef.current);
      } else {
        window.addEventListener("resize", updateGrid);
      }

      return () => {
        if (resizeObserver) {
          resizeObserver.disconnect();
        } else {
          window.removeEventListener("resize", updateGrid);
        }
      };
    }, [isStaticRenderer]);

    useEffect(() => {
      if (isStaticRenderer || prefersReducedMotion) {
        startTransition(() => {
          setHasTriggered(true);
          setOverlayRemoved(true);
        });
        return;
      }
      if (typeof window === "undefined") return;
      if (!overlayRef.current) return;

      const node = overlayRef.current;
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry || !entry.isIntersecting) return;
          if (entry.intersectionRatio < IN_VIEW_THRESHOLD) return;

          startTransition(() => {
            setHasTriggered(true);
          });
          observer.disconnect();
        },
        {
          threshold: [IN_VIEW_THRESHOLD],
        },
      );

      observer.observe(node);
      return () => observer.disconnect();
    }, [isStaticRenderer, prefersReducedMotion]);

    useEffect(() => {
      if (!hasTriggered || overlayRemoved) return;
      if (typeof window === "undefined") return;

      timeoutRef.current = window.setTimeout(
        () => {
          startTransition(() => {
            setOverlayRemoved(true);
          });
        },
        TOTAL_DURATION_MS + CELL_POP_MS + 60,
      );

      return () => {
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, [hasTriggered, overlayRemoved]);

    const delays = useMemo(() => {
      const indices = Array.from({ length: grid.count }, (_, index) => index);
      for (let i = indices.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = indices[i];
        indices[i] = indices[randomIndex];
        indices[randomIndex] = temp;
      }

      const map = new Array(grid.count).fill(0);
      const lastIndex = Math.max(1, grid.count - 1);
      for (let order = 0; order < indices.length; order += 1) {
        map[indices[order]] = (order / lastIndex) * TOTAL_DURATION_MS;
      }
      return map;
    }, [grid.count]);

    const shouldShowOverlay = !isStaticRenderer && !overlayRemoved;

    // No wrapper element: the pixel grid is rendered as an absolutely
    // positioned child inside the original node, so Framer's own layout
    // and sizing are untouched.
    const overlay = shouldShowOverlay ? (
      <div
        key="pixel-reveal-overlay"
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: "grid",
          gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
          borderRadius: "inherit",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {delays.map((delay, index) => (
          <div
            key={index}
            style={{
              background: COVER_COLOR,
              opacity: hasTriggered ? 0 : 1,
              transitionProperty: "opacity",
              transitionDuration: `${CELL_POP_MS}ms`,
              transitionTimingFunction: "steps(1, end)",
              transitionDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    ) : null;

    return (
      <Component ref={ref} {...props}>
        {props.children}
        {overlay}
      </Component>
    );
  });
}
