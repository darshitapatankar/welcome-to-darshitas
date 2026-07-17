import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const IMAGES = {
  devanagari: {
    src: "/projects/custom-type-gallery/01-devanagari.png",
    alt: "Dimag custom Devanagari lettering in pink and white",
    width: 2840,
    height: 1697,
  },
  rose: {
    src: "/projects/custom-type-gallery/02-rose.png",
    alt: "Rose custom lettering on red",
    width: 1197,
    height: 1200,
  },
  apple: {
    src: "/projects/custom-type-gallery/03-apple.png",
    alt: "Apple custom lettering with a luminous green edge",
    width: 2840,
    height: 1696,
  },
  brat: {
    src: "/projects/custom-type-gallery/04-brat.png",
    alt: "Brat custom Devanagari lettering on green",
    width: 1320,
    height: 1320,
  },
  ornamentalLetter: {
    src: "/projects/custom-type-gallery/15-ornamental-ampersand.png",
    alt: "Ornamental ampersand in blue, pink, and white",
    width: 2048,
    height: 2048,
  },
  tokyo: {
    src: "/projects/custom-type-gallery/09-tokyo.png",
    alt: "Tokyo lettering with a fluorescent glitch treatment",
    width: 2300,
    height: 3000,
  },
  orangeLettering: {
    src: "/projects/custom-type-gallery/10-orange-lettering.png",
    alt: "Abstract orange and purple lettering on yellow",
    width: 2300,
    height: 3000,
  },
  femi: {
    src: "/projects/custom-type-gallery/11-femi.png",
    alt: "Femi Nino Menon custom script lettering",
    width: 2300,
    height: 3000,
  },
  basant: {
    src: "/projects/custom-type-gallery/12-basant.png",
    alt: "Basant custom Devanagari lettering surrounded by flowers",
    width: 2300,
    height: 3000,
  },
  babygirl: {
    src: "/projects/custom-type-gallery/14-babygirl-lettering.png",
    alt: "Babygirl custom script lettering in yellow and orange",
    width: 3000,
    height: 2300,
  },
} satisfies Record<string, GalleryImage>;

function GalleryImage({
  image,
  sizes,
  eager = false,
}: {
  image: GalleryImage;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <figure className="custom-type-gallery-image">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
      />
    </figure>
  );
}

function GalleryVideo() {
  return (
    <figure className="custom-type-gallery-image">
      <video
        src="/projects/custom-type-gallery/13-animated-lettering.mp4"
        width={1680}
        height={2004}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Animated custom script lettering on orange"
      />
    </figure>
  );
}

const FULL_SIZES =
  "calc(100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right))";
const COLUMN_SIZES =
  "(max-width: 899px) calc(100vw - 48px), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)";

export default function CustomTypeGallery() {
  return (
    <section
      className="custom-type-project-gallery"
      aria-label="Custom Typography project gallery"
      data-project-gallery="custom-type"
    >
      <GalleryImage image={IMAGES.devanagari} sizes={FULL_SIZES} eager />

      <div className="custom-type-gallery-pair">
        <GalleryImage image={IMAGES.tokyo} sizes={COLUMN_SIZES} />
        <GalleryImage image={IMAGES.basant} sizes={COLUMN_SIZES} />
      </div>

      <GalleryImage image={IMAGES.babygirl} sizes={FULL_SIZES} />

      <div className="custom-type-gallery-pair custom-type-gallery-square-pair">
        <GalleryImage image={IMAGES.brat} sizes={COLUMN_SIZES} />
        <GalleryImage image={IMAGES.ornamentalLetter} sizes={COLUMN_SIZES} />
      </div>

      <div className="custom-type-gallery-pair">
        <GalleryImage image={IMAGES.femi} sizes={COLUMN_SIZES} />
        <GalleryImage image={IMAGES.orangeLettering} sizes={COLUMN_SIZES} />
      </div>

      <div className="custom-type-gallery-motion-row">
        <div className="custom-type-gallery-motion-frame">
          <GalleryVideo />
        </div>
        <div className="custom-type-gallery-stack">
          <GalleryImage image={IMAGES.apple} sizes={COLUMN_SIZES} />
          <GalleryImage image={IMAGES.rose} sizes={COLUMN_SIZES} />
        </div>
      </div>
    </section>
  );
}
