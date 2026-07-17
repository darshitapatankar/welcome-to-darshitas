import Image from "next/image";
import { workSans } from "@/app/fonts";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type GalleryVideo = {
  src: string;
  label: string;
  width: number;
  height: number;
};

const IMAGES = {
  symbol: {
    src: "/projects/wellim-gallery/01-symbol.png",
    alt: "Wellim eclipse symbol on a dark background",
    width: 1024,
    height: 768,
  },
  wordmark: {
    src: "/projects/wellim-gallery/02-wordmark.png",
    alt: "Wellim wordmark on a warm white background",
    width: 1024,
    height: 768,
  },
  coastalHotel: {
    src: "https://framerusercontent.com/images/5ZReXpPhGKfkqjyMBZPNSvrGtI.png",
    alt: "Wellim hotel suite overlooking the sea",
    width: 2840,
    height: 1600,
  },
  gardenHotel: {
    src: "https://framerusercontent.com/images/oxqZUqGwUZsgcYWgZq9YXr28s4.png",
    alt: "Wellim hotel room opening onto a tropical garden",
    width: 2840,
    height: 1600,
  },
  brandPromise: {
    src: "/projects/wellim-gallery/05-transcend-brand-promise.png",
    alt: "Wellim brand promise: Transcend into better experiences",
    width: 3840,
    height: 2160,
  },
  passwordReset: {
    src: "/projects/wellim-gallery/03-password-reset.png",
    alt: "Wellim password reset email design",
    width: 2160,
    height: 2160,
  },
  welcomeEmail: {
    src: "/projects/wellim-gallery/04-welcome-email.png",
    alt: "Wellim welcome email design",
    width: 2160,
    height: 2160,
  },
  bookingLetter: {
    src: "https://framerusercontent.com/images/istuAYOsN8kHvJLtEFR4f6IZ7E.png",
    alt: "Wellim booking confirmation letter and destination card",
    width: 2840,
    height: 1600,
  },
  illustrationSystem: {
    src: "https://framerusercontent.com/images/LvSZ7xDekGGomqXJjIUQLr8TEaM.png",
    alt: "Wellim illustration system for hospitality experiences",
    width: 2840,
    height: 1600,
  },
} satisfies Record<string, GalleryImage>;

const VIDEOS = {
  opening: {
    src: "https://framerusercontent.com/images/1HapnqwgLa3ADRUP1CE2vj2lMQ.mp4",
    label: "Wellim eclipse and brand promise in motion",
    width: 1440,
    height: 800,
  },
  illustrationMontage: {
    src: "https://framerusercontent.com/images/9IrHIk43PEl0KtaVBwObcBWl7o.mp4",
    label: "Wellim hospitality illustration montage",
    width: 1420,
    height: 800,
  },
  digitalExperience: {
    src: "https://framerusercontent.com/images/7MEZpd5H86Kh4kuWGwQJXd5VzD8.mp4",
    label: "Wellim cosmic alignment digital experience",
    width: 1420,
    height: 800,
  },
  fullyAlive: {
    src: "https://framerusercontent.com/images/uxzKkmT6Oh0Mju2Hcw8JTW88Yp8.mp4",
    label: "Wellim fully alive message animation",
    width: 1920,
    height: 1280,
  },
  waitlist: {
    src: "https://framerusercontent.com/images/uoRSjVfsUqwAJOXwrLwyjJ7mTU.mp4",
    label: "Wellim waitlist confirmation animation",
    width: 1920,
    height: 1280,
  },
  closingMark: {
    src: "https://framerusercontent.com/images/L7NyuOekzkrps2o1LD6iPF7GQ.mp4",
    label: "Wellim metallic symbol and wordmark animation",
    width: 1920,
    height: 1080,
  },
} satisfies Record<string, GalleryVideo>;

function GalleryImage({ image }: { image: GalleryImage }) {
  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="block h-auto w-full"
        sizes="calc(100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right))"
      />
    </figure>
  );
}

function GalleryVideo({ video }: { video: GalleryVideo }) {
  return (
    <video
      src={video.src}
      width={video.width}
      height={video.height}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="block h-auto w-full"
      aria-label={video.label}
    />
  );
}

function ChapterIntro({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="max-w-[720px] pt-16 pb-2 md:pt-24">
      <h2
        id={id}
        className={`${workSans.className} text-[28px] leading-[34px] font-light tracking-[-0.02em] text-white`}
      >
        {title}
      </h2>
      <p className="mt-5 font-mono text-[16px] leading-[24px] text-white/70">
        {children}
      </p>
    </header>
  );
}

export default function WellimGallery() {
  return (
    <section
      className="project-page-gutter flex flex-col gap-6 pb-20 md:pb-28"
      aria-label="Wellim project gallery"
    >
      <GalleryVideo video={VIDEOS.opening} />

      <section aria-labelledby="wellim-identity-heading">
        <ChapterIntro
          id="wellim-identity-heading"
          title="Alignment as the identity"
        >
          The identity is built around alignment. The eclipse became the central
          device, with separate forms meeting to create one complete symbol.
          This idea carries through the logo, motion, and illustrations.
        </ChapterIntro>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <GalleryImage image={IMAGES.symbol} />
          <GalleryImage image={IMAGES.wordmark} />
        </div>
      </section>

      <section aria-labelledby="wellim-atmosphere-heading">
        <ChapterIntro
          id="wellim-atmosphere-heading"
          title="Atmosphere over ornament"
        >
          Instead of signalling luxury through ornament, the visual language
          focuses on atmosphere. Warm light, restrained compositions, and
          considered movement allow each property to express its character while
          still belonging to Wellim.
        </ChapterIntro>
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.coastalHotel} />
            <GalleryImage image={IMAGES.gardenHotel} />
          </div>
          <GalleryImage image={IMAGES.brandPromise} />
          <GalleryVideo video={VIDEOS.illustrationMontage} />
          <GalleryImage image={IMAGES.illustrationSystem} />
        </div>
      </section>

      <section aria-labelledby="wellim-experience-heading">
        <ChapterIntro
          id="wellim-experience-heading"
          title="Choosing a place by feel"
        >
          The system helps travellers understand a hotel through how it feels,
          not simply where it ranks.
        </ChapterIntro>
        <div className="mt-6 flex flex-col gap-6">
          <GalleryVideo video={VIDEOS.digitalExperience} />
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.passwordReset} />
            <GalleryImage image={IMAGES.welcomeEmail} />
          </div>
          <GalleryImage image={IMAGES.bookingLetter} />
          <div className="project-video-pair">
            {[VIDEOS.fullyAlive, VIDEOS.waitlist].map((video) => (
              <div key={video.src} className="project-video-pair-frame">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="project-video-pair-media"
                  aria-label={video.label}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <GalleryVideo video={VIDEOS.closingMark} />
    </section>
  );
}
