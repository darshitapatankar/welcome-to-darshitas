import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const FEATURE_IMAGES: GalleryImage[] = [
  {
    src: "/projects/icons-at-wayground-gallery/03-productivity-icons.png",
    alt: "Wayground productivity illustrations featuring checklists, timers, grading, and review",
    width: 4584,
    height: 2580,
  },
  {
    src: "/projects/icons-at-wayground-gallery/04-reward-chests.png",
    alt: "Rare, legendary, and common Wayground reward chests",
    width: 4584,
    height: 2580,
  },
  {
    src: "/projects/icons-at-wayground-gallery/05-resource-icons.png",
    alt: "Wayground folder, resource, and reward-box illustrations",
    width: 4584,
    height: 2580,
  },
  {
    src: "/projects/icons-at-wayground-gallery/06-power-up-icons.png",
    alt: "Colourful Wayground power-up icons on a dark background",
    width: 4584,
    height: 2580,
  },
  {
    src: "/projects/icons-at-wayground-gallery/07-math-tool-icons.png",
    alt: "Wayground graph, measurement, and equation-tool illustrations",
    width: 4584,
    height: 2580,
  },
];

function FullImage({ image }: { image: GalleryImage }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      className="block h-auto w-full"
      sizes="calc(100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right))"
    />
  );
}

export default function IconsAtWaygroundGallery() {
  return (
    <section
      className="project-page-gutter flex flex-col gap-3 pb-20 md:gap-6 md:pb-28"
      aria-label="Icons at Wayground project gallery"
      data-project-gallery="icons-at-wayground"
    >
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <Image
          src="/projects/icons-at-wayground-gallery/01-playground.png"
          alt="Playground arcade illustration"
          width={2160}
          height={2160}
          className="block h-auto w-full"
          sizes="(max-width: 767px) calc((100vw - 60px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
          priority
        />
        <Image
          src="/projects/icons-at-wayground-gallery/02-kudos.png"
          alt="Kudos illustration with hands exchanging a heart and letter"
          width={2158}
          height={2158}
          className="block h-auto w-full"
          sizes="(max-width: 767px) calc((100vw - 60px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
          priority
        />
      </div>

      {FEATURE_IMAGES.map((image) => (
        <FullImage key={image.src} image={image} />
      ))}
    </section>
  );
}
