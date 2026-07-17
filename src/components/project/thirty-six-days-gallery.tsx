import Image from "next/image";

const STUDIES = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    src: `/projects/36-days-of-type-gallery/${number}.png`,
    alt: `36 Days of Type letterform study ${number}`,
  };
});

export default function ThirtySixDaysGallery() {
  return (
    <section
      className="project-page-gutter grid grid-cols-2 gap-6 pb-20 md:pb-28"
      aria-label="36 Days of Type gallery"
    >
      {STUDIES.map((study) => (
        <Image
          key={study.src}
          src={study.src}
          alt={study.alt}
          width={2160}
          height={2160}
          className="block h-auto w-full"
          sizes="(max-width: 767px) calc((100vw - 24px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
        />
      ))}
    </section>
  );
}
