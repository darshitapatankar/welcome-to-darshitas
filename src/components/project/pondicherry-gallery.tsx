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
  website: {
    src: "/projects/pondicherry-gallery/07-website-homepage.png",
    alt: "Pondicherry Botanical Garden website homepage with illustrated animals",
    width: 2107,
    height: 1171,
  },
  tiger: {
    src: "/projects/pondicherry-gallery/08-tiger-artwork.png",
    alt: "Illustrated Bengal tiger feature on textured cream paper",
    width: 2107,
    height: 1171,
  },
  tigerMark: {
    src: "/projects/pondicherry-gallery/09-tiger-mark.png",
    alt: "Pondicherry Botanical Garden tiger mark on a textured brown background",
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
      <FullImage image={IMAGES.stamps} />
      <FullImage image={IMAGES.website} />
      <FullImage image={IMAGES.map} />
      <div className="pondicherry-gallery-pair">
        <PairImage image={IMAGES.tickets} />
        <PairImage image={IMAGES.animals} />
      </div>
      <FullImage image={IMAGES.tiger} />
      <FullImage image={IMAGES.tigerMark} />
    </section>
  );
}
