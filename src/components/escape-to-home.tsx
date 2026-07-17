"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function EscapeToHome() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.key !== "Escape" ||
        event.repeat ||
        event.defaultPrevented ||
        pathname === "/"
      ) {
        return;
      }

      event.preventDefault();
      router.push("/", { scroll: true });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return null;
}
