"use client";

import { Agentation } from "agentation";
import { useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export default function DevelopmentAgentation() {
  const isDesktop = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return isDesktop ? <Agentation /> : null;
}
