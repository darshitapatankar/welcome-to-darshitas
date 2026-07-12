import * as React from "react";
import {
  addPropertyControls,
  ControlType,
  Link,
  useIsStaticRenderer,
} from "framer";
import { motion } from "framer-motion";

// User request: Create a new Framer code component named "HoverDrawNavItem" that renders an auto-sized navbar item with centered label text and an SVG ellipse outline that animates drawing from 0% to 100% on hover, resets on un-hover for replay, supports SSR/static rendering, and exposes the specified property controls.

interface MyComponentProps {
  label: string;
  link: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  textColor: string;
  strokeColor: string;
  strokeWidth: number;
  drawDuration: number;
  paddingX: number;
  paddingY: number;
  glowColor: string;
  glowStrength: number;
  style?: React.CSSProperties;
}

/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function HoverDrawNavItem(props: MyComponentProps) {
  const {
    label,
    link,
    fontFamily,
    fontSize,
    fontWeight,
    textColor,
    strokeColor,
    strokeWidth,
    drawDuration,
    paddingX,
    paddingY,
    glowColor,
    glowStrength,
    style,
  } = props;

  const isStatic = useIsStaticRenderer();
  const [isHovered, setIsHovered] = React.useState(false);

  const handleHoverStart = React.useCallback(() => {
    React.startTransition(() => setIsHovered(true));
  }, []);

  const handleHoverEnd = React.useCallback(() => {
    React.startTransition(() => setIsHovered(false));
  }, []);

  const restGlowFilter = React.useMemo(() => {
    return `drop-shadow(0 0 ${Math.max(0, glowStrength)}px ${glowColor})`;
  }, [glowColor, glowStrength]);

  const hoverGlowFilter = React.useMemo(() => {
    return `drop-shadow(0 0 ${Math.max(0, glowStrength * 1.9)}px ${glowColor}) drop-shadow(0 0 ${Math.max(0, glowStrength * 0.9)}px ${glowColor})`;
  }, [glowColor, glowStrength]);

  const textStyles = React.useMemo<React.CSSProperties>(() => {
    return {
      fontFamily: `${fontFamily}, monospace`,
      fontSize,
      fontWeight,
      color: textColor,
      lineHeight: 1,
      whiteSpace: "nowrap",
      width: "max-content",
    };
  }, [fontFamily, fontSize, fontWeight, textColor]);

  const item = (
    <motion.div
      role="link"
      aria-label={label}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        height: "fit-content",
        padding: `${paddingY}px ${paddingX}px`,
        textDecoration: "none",
        ...style,
      }}
      onHoverStart={isStatic ? undefined : handleHoverStart}
      onHoverEnd={isStatic ? undefined : handleHoverEnd}
    >
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
        viewBox="0 0 122 42"
        preserveAspectRatio="none"
      >
        <motion.ellipse
          cx="61"
          cy="21"
          rx="59"
          ry="19"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 1 }}
          animate={{
            pathLength: 1,
            filter: isStatic
              ? restGlowFilter
              : isHovered
                ? hoverGlowFilter
                : restGlowFilter,
          }}
          transition={{ duration: drawDuration, ease: "easeInOut" }}
        />
      </svg>
      <span style={textStyles}>{label}</span>
    </motion.div>
  );

  if (link) {
    return (
      <Link href={link}>
        <a style={{ textDecoration: "none", display: "inline-flex" }}>{item}</a>
      </Link>
    );
  }

  return item;
}

addPropertyControls(HoverDrawNavItem, {
  label: {
    type: ControlType.String,
    defaultValue: "Work",
  },
  link: {
    type: ControlType.Link,
    defaultValue: "",
  },
  fontFamily: {
    type: ControlType.String,
    defaultValue: "Geist Mono",
  },
  fontSize: {
    type: ControlType.Number,
    defaultValue: 15,
    min: 8,
    max: 64,
    step: 1,
    unit: "px",
  },
  fontWeight: {
    type: ControlType.Number,
    defaultValue: 400,
    min: 100,
    max: 900,
    step: 100,
  },
  textColor: {
    type: ControlType.Color,
    defaultValue: "#FFFFFF",
  },
  strokeColor: {
    type: ControlType.Color,
    defaultValue: "#FFFFFF",
  },
  strokeWidth: {
    type: ControlType.Number,
    defaultValue: 1.5,
    min: 0.5,
    max: 8,
    step: 0.1,
  },
  drawDuration: {
    type: ControlType.Number,
    defaultValue: 0.6,
    min: 0.1,
    max: 3,
    step: 0.05,
    unit: "s",
  },
  paddingX: {
    type: ControlType.Number,
    defaultValue: 20,
    min: 0,
    max: 80,
    step: 1,
    unit: "px",
  },
  paddingY: {
    type: ControlType.Number,
    defaultValue: 8,
    min: 0,
    max: 40,
    step: 1,
    unit: "px",
  },
  glowColor: {
    type: ControlType.Color,
    defaultValue: "#FFFFFF",
  },
  glowStrength: {
    type: ControlType.Number,
    defaultValue: 8,
    min: 0,
    max: 30,
    step: 0.5,
  },
});
