import { playCardHoverSound } from "@/components/site-sound";

export default function NavOvalLink({
  href,
  label,
  signalDecode = false,
}: {
  href: string;
  label: string;
  signalDecode?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="type-chrome chrome-primary group relative inline-flex items-center justify-center px-[33px] py-[13px] whitespace-nowrap no-underline"
      onPointerEnter={playCardHoverSound}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 122 42"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <ellipse
          cx="61"
          cy="21"
          rx="59"
          ry="19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="inline-block"
        aria-hidden="true"
        data-signal-decode={signalDecode ? "" : undefined}
        data-signal-group={signalDecode ? "footer" : undefined}
        data-signal-hover={signalDecode ? "" : undefined}
      >
        {label}
      </span>
    </a>
  );
}
