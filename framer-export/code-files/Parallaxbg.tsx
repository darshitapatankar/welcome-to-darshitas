import { useEffect, useRef } from "react";
import type { ComponentType } from "react";

export function withParallaxFar(Component): ComponentType {
  return (props) => {
    const ref = useRef<HTMLElement>(null);
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0;

    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * -20;
        ty = (e.clientY / window.innerHeight - 0.5) * -20;
      };
      const tick = () => {
        cx += (tx - cx) * 0.04;
        cy += (ty - cy) * 0.04;
        if (ref.current) {
          ref.current.style.transform = `translate(${cx}px, ${cy}px) scale(1.08)`;
        }
        requestAnimationFrame(tick);
      };
      window.addEventListener("mousemove", onMove);
      requestAnimationFrame(tick);
      return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return <Component {...props} ref={ref} />;
  };
}
