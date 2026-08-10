import Image from "next/image";

const detailImages = [
  {
    src: "/projects/madhubani-gallery/02-face-detail.png",
    alt: "Close-up illustration of Manavi's face and jewellery",
    width: 2160,
    height: 2160,
  },
  {
    src: "/projects/madhubani-gallery/03-scorpion-and-dove-detail.png",
    alt: "Madhubani-style scorpion motif beside a white dove",
    width: 2160,
    height: 2160,
  },
  {
    src: "/projects/madhubani-gallery/04-sari-pattern-detail.png",
    alt: "Teal Banarasi sari fabric with an intricate floral pattern",
    width: 2160,
    height: 2160,
  },
  {
    src: "/projects/madhubani-gallery/05-tiger-detail.png",
    alt: "Madhubani-inspired tiger and lotus motif",
    width: 2158,
    height: 2160,
  },
];

export default function MadhubaniGallery() {
  return (
    <section
      className="project-page-gutter flex flex-col gap-3 pb-20 md:gap-6 md:pb-28"
      aria-label="Manavi x Madhubani project gallery"
      data-project-gallery="manavi-x-madhubani"
    >
      <Image
        src="/projects/madhubani-gallery/01-portrait-closeup.png"
        alt="Wide close-up of Manavi surrounded by Madhubani-inspired motifs"
        width={3840}
        height={2160}
        className="block h-auto w-full"
        sizes="100vw"
        priority
      />

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {detailImages.slice(0, 2).map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="block h-auto w-full"
            sizes="(max-width: 767px) calc((100vw - 60px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {detailImages.slice(2).map((image) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="block h-auto w-full"
            sizes="(max-width: 767px) calc((100vw - 60px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
          />
        ))}
      </div>

      <Image
        src="/projects/madhubani-gallery/06-full-portrait.png"
        alt="Full Manavi portrait combining Art Nouveau and Madhubani influences"
        width={2238}
        height={2984}
        className="block h-auto w-full"
        sizes="100vw"
      />

      <Image
        src="/projects/madhubani-gallery/07-framed-portrait.png"
        alt="Finished Manavi portrait displayed in a frame"
        width={3840}
        height={2160}
        className="block h-auto w-full"
        sizes="100vw"
      />
    </section>
  );
}
