import {
  forwardRef,
  type ComponentType,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0";
import { randomColor } from "https://framer.com/m/framer/utils.js@^0.9.0";

// Learn more: https://www.framer.com/developers/overrides/

const useStore = createStore({
  background: "#0099FF",
});

export function withRotate(Component): ComponentType {
  return forwardRef((props, ref) => {
    return (
      <Component
        ref={ref}
        {...props}
        animate={{ rotate: 90 }}
        transition={{ duration: 2 }}
      />
    );
  });
}

export function withHover(Component): ComponentType {
  return forwardRef((props, ref) => {
    return <Component ref={ref} {...props} whileHover={{ scale: 1.05 }} />;
  });
}

export function withRandomColor(Component): ComponentType {
  return forwardRef((props, ref) => {
    const [store, setStore] = useStore();

    return (
      <Component
        ref={ref}
        {...props}
        animate={{
          background: store.background,
        }}
        onClick={() => {
          setStore({ background: randomColor() });
        }}
      />
    );
  });
}

interface MyComponentProps {
  strength: number;
  radius: number;
  springStiffness: number;
  springDamping: number;
}

export function withMagneticHover(Component): ComponentType {
  return forwardRef(
    (props: Partial<MyComponentProps> & Record<string, any>, ref) => {
      const {
        strength = 0.35,
        radius = 180,
        springStiffness = 150,
        springDamping = 15,
      } = props;
      const internalRef = useRef<HTMLElement | null>(null);
      const isInView = useInView(internalRef, { amount: 0.1 });
      const isStatic = useIsStaticRenderer();

      const x = useMotionValue(0);
      const y = useMotionValue(0);

      const springConfig = useMemo(
        () => ({
          stiffness: springStiffness,
          damping: springDamping,
          mass: 0.6,
        }),
        [springStiffness, springDamping],
      );

      const springX = useSpring(x, springConfig);
      const springY = useSpring(y, springConfig);

      const setRefs = useCallback(
        (node: HTMLElement | null) => {
          internalRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLElement | null>).current = node;
          }
        },
        [ref],
      );

      const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
          if (isStatic || !isInView) return;

          const rect = event.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = event.clientX - centerX;
          const deltaY = event.clientY - centerY;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance <= radius) {
            const normalizedFalloff = 1 - distance / radius;
            x.set(deltaX * strength * normalizedFalloff);
            y.set(deltaY * strength * normalizedFalloff);
          } else {
            x.set(0);
            y.set(0);
          }
        },
        [isInView, isStatic, radius, strength, x, y],
      );

      const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
      }, [x, y]);

      return (
        <Component
          ref={setRefs}
          {...props}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            ...(props.style || {}),
            pointerEvents: "auto",
            x: isStatic ? 0 : springX,
            y: isStatic ? 0 : springY,
          }}
        />
      );
    },
  );
}

addPropertyControls(
  withMagneticHover as unknown as ComponentType<MyComponentProps>,
  {
    strength: {
      type: ControlType.Number,
      title: "Strength",
      defaultValue: 0.35,
      min: 0,
      max: 1,
      step: 0.01,
    },
    radius: {
      type: ControlType.Number,
      title: "Radius",
      defaultValue: 180,
      min: 20,
      max: 500,
      unit: "px",
      step: 1,
    },
    springStiffness: {
      type: ControlType.Number,
      title: "Stiffness",
      defaultValue: 150,
      min: 10,
      max: 600,
      step: 1,
    },
    springDamping: {
      type: ControlType.Number,
      title: "Damping",
      defaultValue: 15,
      min: 1,
      max: 80,
      step: 1,
    },
  },
);
