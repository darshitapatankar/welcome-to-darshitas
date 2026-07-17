import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const IMAGES: Record<string, GalleryImage> = {
  mark: {
    src: "/projects/stack-results-gallery/01-mark-coral.png",
    alt: "Stack Results symbol in white on coral",
    width: 1024,
    height: 768,
  },
  wordmark: {
    src: "/projects/stack-results-gallery/02-wordmark.png",
    alt: "Stack Results symbol and wordmark in black",
    width: 1024,
    height: 768,
  },
  website: {
    src: "/projects/stack-results-gallery/03-website.png",
    alt: "Stack Results wellness platform website design",
    width: 2840,
    height: 1600,
  },
  categories: {
    src: "/projects/stack-results-gallery/04-categories.png",
    alt: "Stack Results wellness category colour system",
    width: 1024,
    height: 768,
  },
  colours: {
    src: "/projects/stack-results-gallery/05-colour-system.png",
    alt: "Stack Results core and secondary colour palette",
    width: 1024,
    height: 768,
  },
  communityResults: {
    src: "/projects/stack-results-gallery/07-powered-by-real-people.png",
    alt: "Stack Results app showing community-powered health results",
    width: 2840,
    height: 1600,
  },
};

function PairImage({ image }: { image: GalleryImage }) {
  return (
    <figure className="pondicherry-gallery-pair-image">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
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
        unoptimized
        sizes="calc(100vw - (2 * var(--project-gap)))"
      />
    </figure>
  );
}

function GalleryCaption({ html }: { html: string }) {
  return (
    <p
      className="pondicherry-gallery-caption"
      data-stack-results-gallery-caption
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function StackResultsGallery({
  paragraphsHtml,
}: {
  paragraphsHtml: string[];
}) {
  const [paragraphOne = "", paragraphTwo = "", paragraphThree = ""] =
    paragraphsHtml;

  return (
    <section
      className="pondicherry-project-gallery"
      aria-label="Stack Results project gallery"
    >
      <div className="pondicherry-gallery-pair">
        <PairImage image={IMAGES.mark} />
        <PairImage image={IMAGES.wordmark} />
      </div>
      <GalleryCaption html={paragraphTwo} />
      <FullImage image={IMAGES.website} />
      <GalleryCaption html={paragraphOne} />
      <div className="pondicherry-gallery-pair">
        <PairImage image={IMAGES.categories} />
        <PairImage image={IMAGES.colours} />
      </div>
      <GalleryCaption html={paragraphThree} />
      <video
        src="/projects/stack-results-gallery/06-stack-results-motion.mp4"
        width={1420}
        height={800}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="block h-auto w-full"
        aria-label="Stack Results identity in motion"
      />
      <div className="mb-[60px]">
        <FullImage image={IMAGES.communityResults} />
      </div>
    </section>
  );
}
