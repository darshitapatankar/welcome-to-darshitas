import { ProjectImage } from "@/components/project/media";

// Reproduces Framer's absolutely-positioned canvases (custom-type collage,
// illustrations grids) responsively: the original pixel coordinates are
// converted to percentages of the design canvas so the layout scales.

export function FreeformCanvas({
  designWidth,
  designHeight,
  className,
  children,
}: {
  designWidth: number;
  designHeight: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      {children}
    </div>
  );
}

export function FreeformImage({
  src,
  alt = "",
  canvas,
  left,
  top,
  width,
  height,
  rotation,
  border,
}: {
  src: string;
  alt?: string;
  canvas: { width: number; height: number };
  left: number;
  top: number;
  width: number;
  height: number;
  rotation?: number;
  border?: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: `${(left / canvas.width) * 100}%`,
        top: `${(top / canvas.height) * 100}%`,
        width: `${(width / canvas.width) * 100}%`,
        aspectRatio: `${width} / ${height}`,
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        border,
      }}
    >
      <ProjectImage
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
