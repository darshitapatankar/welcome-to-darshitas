import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const IMAGES: Record<string, GalleryImage> = {
  cover: {
    src: "/projects/pondicherry-gallery/01-cover.png",
    alt: "Pondicherry Botanical Garden logo and cover artwork",
    width: 2048,
    height: 1536,
  },
  archway: {
    src: "/projects/pondicherry-gallery/02-archway.png",
    alt: "Illustrated photograph of the Pondicherry Botanical Garden archway",
    width: 2048,
    height: 1536,
  },
  stamps: {
    src: "/projects/pondicherry-gallery/03-stamps-teal.png",
    alt: "Pondicherry Botanical Garden stamps and admission ticket on teal",
    width: 2107,
    height: 1171,
  },
  animals: {
    src: "/projects/pondicherry-gallery/04-animal-lettering.png",
    alt: "Hand-drawn animal illustrations on teal",
    width: 2048,
    height: 1536,
  },
  tickets: {
    src: "/projects/pondicherry-gallery/05-stamps-ticket.png",
    alt: "Pondicherry Botanical Garden stamp and ticket layout",
    width: 1024,
    height: 768,
  },
  map: {
    src: "/projects/pondicherry-gallery/06-garden-map.png",
    alt: "Illustrated Pondicherry Botanical Garden map on brown",
    width: 2107,
    height: 1171,
  },
};

function PairImage({ image }: { image: GalleryImage }) {
  return (
    <figure className="pondicherry-gallery-pair-image">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 899px) calc(100vw - (2 * var(--project-gap))), calc((100vw - (3 * var(--project-gap))) / 2)"
      />
    </figure>
  );
}

function FullImage({ image }: { image: GalleryImage }) {
  return (
    <figure className="pondicherry-gallery-full-image">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="calc(100vw - (2 * var(--project-gap)))"
      />
    </figure>
  );
}

function GalleryCaption({ children }: { children: React.ReactNode }) {
  return (
    <p className="pondicherry-gallery-caption" data-pondicherry-gallery-caption>
      {children}
    </p>
  );
}

export default function PondicherryGallery() {
  return (
    <section
      className="pondicherry-project-gallery"
      aria-label="Pondicherry Botanical Garden project gallery"
    >
      <div className="pondicherry-gallery-pair">
        <PairImage image={IMAGES.cover} />
        <PairImage image={IMAGES.archway} />
      </div>
      <GalleryCaption>
        The identity brings the zoo and botanical garden together in one mark,
        with Richard Parker beneath a tree. I drew the animals, map, and tickets
        by hand so the system felt consistent with the illustrated world of the
        story rather than a contemporary digital brand.
      </GalleryCaption>
      <FullImage image={IMAGES.stamps} />
      <div className="pondicherry-gallery-pair">
        <PairImage image={IMAGES.animals} />
        <PairImage image={IMAGES.tickets} />
      </div>
      <GalleryCaption>
        The story in the movie and book is set in 1961 Pondicherry, before the
        web. I designed the fictional Pondicherry Zoo website as a digital
        newspaper, using editorial layouts, hand-drawn imagery, and references
        from the city’s architecture to place it within the period.
      </GalleryCaption>
      <FullImage image={IMAGES.map} />
      <GalleryCaption>
        treated the zoo as a real institution within a fictional setting. Every
        decision had to feel plausible for that place, period, and organisation.
      </GalleryCaption>
    </section>
  );
}
