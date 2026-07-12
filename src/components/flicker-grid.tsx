"use client";

import { useEffect, useRef } from "react";

// Port of the Framer "Pixels Bar" (grid of Flicker Grid Block components).
// Each 52px cell flickers between transparent and three pink intensities.
const CELL_COLORS = ["rgb(76, 20, 56)", "rgb(38, 10, 28)", "rgb(19, 5, 14)"];
const CELL_SIZE = 52;

export default function FlickerGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;
    let cols = 0;
    let rows = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      cols = Math.ceil(rect.width / CELL_SIZE);
      rows = Math.max(1, Math.ceil(rect.height / CELL_SIZE));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 120) return; // ~8 updates/sec, like the Framer variant flicker
      last = t;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Most cells stay inactive; a sparse scattering lights up
          if (Math.random() > 0.12) continue;
          ctx.fillStyle =
            CELL_COLORS[Math.floor(Math.random() * CELL_COLORS.length)];
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
