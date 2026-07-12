import { addPropertyControls, ControlType } from "framer";

export default function Scanlines({
  lineColor = "#000000",
  lineOpacity = 0.22,
  lineGap = 3,
  flicker = true,
  flickerDuration = 3,
  glow = true,
  glowColor = "#ffb347",
  glowStrength = 0.35,
}) {
  const scanlines = `repeating-linear-gradient(
        to bottom,
        transparent 0px,
        transparent ${lineGap}px,
        ${lineColor} ${lineGap}px,
        ${lineColor} ${lineGap * 2}px
    )`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: scanlines,
          opacity: lineOpacity,
          animation: flicker
            ? `crtFlicker ${flickerDuration}s ease-in-out infinite`
            : undefined,
        }}
      />
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at center, ${glowColor} 0%, transparent 65%)`,
            opacity: glowStrength,
            mixBlendMode: "screen",
          }}
        />
      )}
      <style>{`
                @keyframes crtFlicker {
                    0%, 100% { opacity: ${lineOpacity}; }
                    50% { opacity: ${lineOpacity * 0.8}; }
                }
            `}</style>
    </div>
  );
}

addPropertyControls(Scanlines, {
  lineColor: {
    type: ControlType.Color,
    title: "Line Color",
    defaultValue: "#000000",
  },
  lineOpacity: {
    type: ControlType.Number,
    title: "Opacity",
    min: 0,
    max: 1,
    step: 0.02,
    defaultValue: 0.22,
  },
  lineGap: {
    type: ControlType.Number,
    title: "Line Gap",
    min: 1,
    max: 10,
    step: 1,
    defaultValue: 3,
  },
  flicker: {
    type: ControlType.Boolean,
    title: "Flicker",
    defaultValue: true,
  },
  flickerDuration: {
    type: ControlType.Number,
    title: "Flicker Duration",
    min: 0.1,
    max: 5,
    step: 0.1,
    defaultValue: 3,
  },
  glow: { type: ControlType.Boolean, title: "Glow", defaultValue: true },
  glowColor: {
    type: ControlType.Color,
    title: "Glow Color",
    defaultValue: "#ffb347",
  },
  glowStrength: {
    type: ControlType.Number,
    title: "Glow Strength",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.35,
  },
});
