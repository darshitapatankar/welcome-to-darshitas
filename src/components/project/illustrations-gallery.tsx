import Image from "next/image";
import { DeferredVideo } from "@/components/project/deferred-video";

type Illustration = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const ILLUSTRATIONS = {
  nightRunner: {
    src: "/projects/illustrations-gallery/01-night-runner.png",
    alt: "Figure in pink moving through a luminous night city",
    width: 2300,
    height: 3000,
  },
  catsDevanagari: {
    src: "/projects/illustrations-gallery/02-cats-devanagari.png",
    alt: "Two playful cats surrounded by hand-drawn Devanagari lettering",
    width: 2300,
    height: 3000,
  },
  crystalStudy: {
    src: "/projects/illustrations-gallery/03-crystal-study.png",
    alt: "Iridescent crystal forms arranged around a blue oval",
    width: 3840,
    height: 2160,
  },
  pyaasaPoster: {
    src: "/projects/illustrations-gallery/05-pyaasa-poster.png",
    alt: "Red and pale pink illustrated poster for Guru Dutt's Pyaasa",
    width: 928,
    height: 1200,
  },
  neonRainbow: {
    src: "/projects/illustrations-gallery/07-neon-rainbow.png",
    alt: "Neon rainbow arcs assembled within a geometric grid",
    width: 4096,
    height: 2304,
  },
  neonDiamond: {
    src: "/projects/illustrations-gallery/08-neon-diamond.png",
    alt: "Glowing layered diamond surrounded by colourful abstract forms",
    width: 4096,
    height: 2304,
  },
} satisfies Record<string, Illustration>;

const FULL_SIZES =
  "calc(100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right))";
const PAIR_SIZES =
  "(max-width: 899px) calc(100vw - 48px), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)";

function GalleryImage({
  illustration,
  sizes,
  eager = false,
}: {
  illustration: Illustration;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <figure className="illustrations-gallery-image">
      <Image
        src={illustration.src}
        alt={illustration.alt}
        width={illustration.width}
        height={illustration.height}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
      />
    </figure>
  );
}

function GalleryVideo({
  src,
  width,
  height,
  label,
}: {
  src: string;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <figure className="illustrations-gallery-image">
      <DeferredVideo
        src={src}
        width={width}
        height={height}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </figure>
  );
}

export default function IllustrationsGallery() {
  return (
    <section
      className="illustrations-project-gallery"
      aria-label="Illustrations project gallery"
      data-project-gallery="illustrations"
    >
      <div className="illustrations-gallery-pair illustrations-gallery-portrait-pair">
        <GalleryImage
          illustration={ILLUSTRATIONS.nightRunner}
          sizes={PAIR_SIZES}
          eager
        />
        <GalleryImage
          illustration={ILLUSTRATIONS.catsDevanagari}
          sizes={PAIR_SIZES}
          eager
        />
      </div>

      <div className="illustrations-gallery-pair illustrations-gallery-portrait-pair">
        <GalleryImage
          illustration={ILLUSTRATIONS.pyaasaPoster}
          sizes={PAIR_SIZES}
        />
        <GalleryVideo
          src="/projects/illustrations-gallery/09-dither.mp4"
          width={1080}
          height={1350}
          label="Animated dithered The World Will Know Your Name illustration"
        />
      </div>

      <div className="illustrations-gallery-solo">
        <GalleryVideo
          src="/projects/illustrations-gallery/04-cats-animation.mp4"
          width={2160}
          height={2818}
          label="Animated orange cat illustration on a purple background"
        />
      </div>

      <GalleryImage
        illustration={ILLUSTRATIONS.crystalStudy}
        sizes={FULL_SIZES}
      />

      <div className="illustrations-gallery-pair">
        <GalleryImage
          illustration={ILLUSTRATIONS.neonRainbow}
          sizes={PAIR_SIZES}
        />
        <GalleryImage
          illustration={ILLUSTRATIONS.neonDiamond}
          sizes={PAIR_SIZES}
        />
      </div>
    </section>
  );
}
