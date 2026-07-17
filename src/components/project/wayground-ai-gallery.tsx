import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const IMAGES = {
  hero: {
    src: "/projects/wayground-ai-gallery/01-hero.png",
    alt: "Wayground AI wordmark with spark symbol on a warm gradient background",
    width: 2845,
    height: 1600,
  },
  explorations: {
    src: "/projects/wayground-ai-gallery/02-explorations.png",
    alt: "Wayground AI identity mark explorations",
    width: 2845,
    height: 1600,
  },
  finalLockup: {
    src: "/projects/wayground-ai-gallery/03-final-lockup.png",
    alt: "Final Wayground AI wordmark and colourful W symbol",
    width: 3240,
    height: 2160,
  },
  finalLockupGradient: {
    src: "/projects/wayground-ai-gallery/04-final-lockup-gradient.png",
    alt: "Final Wayground AI wordmark and W symbol on a blue gradient background",
    width: 3240,
    height: 2160,
  },
} satisfies Record<string, GalleryImage>;

function GalleryImage({
  image,
  eager = false,
}: {
  image: GalleryImage;
  eager?: boolean;
}) {
  return (
    <figure className="wayground-ai-gallery-image">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? "eager" : "lazy"}
        unoptimized
        sizes="calc(100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right))"
      />
    </figure>
  );
}

function GalleryCaption({ children }: { children: string }) {
  return <p className="wayground-ai-gallery-caption">{children}</p>;
}

export default function WaygroundAiGallery() {
  return (
    <section
      className="wayground-ai-project-gallery"
      aria-label="Wayground AI project gallery"
      data-project-gallery="wayground-ai"
    >
      <GalleryImage image={IMAGES.hero} eager />
      <GalleryImage image={IMAGES.explorations} />
      <GalleryCaption>
        The identity needed to signal AI without feeling separate from
        Wayground. I explored directions ranging from extensions of the existing
        W to independent symbols.
      </GalleryCaption>
      <div className="wayground-ai-gallery-pair">
        <GalleryImage image={IMAGES.finalLockup} />
        <GalleryImage image={IMAGES.finalLockupGradient} />
      </div>
      <GalleryCaption>
        The final mark combines the Wayground W with a spark. In motion, the
        spark becomes a consistent signal across different product touchpoints.
      </GalleryCaption>
    </section>
  );
}
