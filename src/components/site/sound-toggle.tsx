"use client";

import { useSyncExternalStore } from "react";
import {
  getSiteSoundEnabled,
  playSiteSound,
  setSiteSoundEnabled,
  subscribeToSiteSound,
} from "@/components/site-sound";

const SOUND_LABEL = "SOUND";

export default function SoundToggle() {
  const soundEnabled = useSyncExternalStore(
    subscribeToSiteSound,
    getSiteSoundEnabled,
    () => false,
  );

  const toggleSound = () => {
    const nextEnabled = !soundEnabled;
    setSiteSoundEnabled(nextEnabled);
    if (nextEnabled) playSiteSound("/audio/card-hover.mp3", 0.35);
  };

  return (
    <button
      type="button"
      className="inline-flex cursor-pointer border-0 bg-transparent p-0"
      aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
      aria-pressed={soundEnabled}
      onClick={toggleSound}
    >
      <span className="type-chrome chrome-primary relative inline-flex h-[42px] w-[108px] shrink-0 items-center justify-center whitespace-nowrap">
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
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="relative inline-block">
          <span
            aria-hidden="true"
            data-signal-decode
            data-signal-group="nav"
            data-signal-hover
          >
            {SOUND_LABEL}
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-1/2 -right-1 -left-1 h-px -translate-y-1/2 bg-current transition-transform duration-200 motion-reduce:duration-0 ${
              soundEnabled ? "scale-x-0" : "scale-x-100"
            }`}
          />
        </span>
      </span>
    </button>
  );
}
