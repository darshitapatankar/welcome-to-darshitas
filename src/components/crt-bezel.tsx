"use client";

import { usePathname } from "next/navigation";
import { isProjectPath } from "@/lib/project-routes";
import styles from "./crt-bezel.module.css";

export default function CrtBezel() {
  const pathname = usePathname();

  if (isProjectPath(pathname)) return null;

  return (
    <div className={styles.bezel} aria-hidden="true">
      <span className={styles.screenSheen} />
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/crt/bezel.avif"
          type="image/avif"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/crt/bezel.webp"
          type="image/webp"
        />
        <img
          className={styles.image}
          src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          alt=""
          width="3840"
          height="2176"
          decoding="async"
        />
      </picture>
      <span className={styles.screenDepth} />
    </div>
  );
}
