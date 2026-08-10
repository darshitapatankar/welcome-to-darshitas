import Image from "next/image";
import { DeferredVideo } from "@/components/project/deferred-video";

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
    src: "/projects/wellim-gallery/06-coastal-hotel.png",
    alt: "Wellim hotel suite overlooking the sea",
    width: 2160,
    height: 2160,
  },
  gardenHotel: {
    src: "/projects/wellim-gallery/07-garden-hotel.png",
    alt: "Wellim hotel room opening onto a tropical garden",
    width: 2160,
    height: 2160,
  },
  brandPromise: {
    src: "/projects/wellim-gallery/05-transcend-brand-promise.png",
    alt: "Wellim brand promise: Transcend into better experiences",
    width: 3839,
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
  eclipse: {
    src: "/projects/wellim-gallery/08-eclipse.png",
    alt: "A glowing eclipse in Wellim's warm gold palette",
    width: 3840,
    height: 2160,
  },
  cosmicAlignment: {
    src: "/projects/wellim-gallery/09-cosmic-alignment.png",
    alt: "Wellim cosmic alignment illustration",
    width: 2160,
    height: 2160,
  },
  transcendSquare: {
    src: "/projects/wellim-gallery/10-transcend-square.png",
    alt: "Wellim brand promise beside a glowing eclipse",
    width: 1080,
    height: 1080,
  },
  cocktails: {
    src: "/projects/wellim-gallery/11-cocktails.png",
    alt: "Two glowing cocktails in the Wellim visual style",
    width: 2160,
    height: 1322,
  },
  travellerIllustration: {
    src: "/projects/wellim-gallery/12-illustration-woman.png",
    alt: "Wellim illustration of a traveller in a wide-brimmed hat",
    width: 2160,
    height: 1322,
  },
  bookingLetter: {
    src: "https://framerusercontent.com/images/istuAYOsN8kHvJLtEFR4f6IZ7E.png",
    alt: "Wellim booking confirmation letter and destination card",
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
    <DeferredVideo
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

export default function WellimGallery() {
  return (
    <section
      className="project-page-gutter flex flex-col gap-6 pb-20 md:pb-28"
      aria-label="Wellim project gallery"
    >
      <GalleryVideo video={VIDEOS.opening} />

      <section aria-label="Wellim identity system">
        <div className="grid grid-cols-2 gap-6">
          <GalleryImage image={IMAGES.symbol} />
          <GalleryImage image={IMAGES.wordmark} />
        </div>
      </section>

      <section aria-label="Wellim visual language">
        <div className="flex flex-col gap-6">
          <GalleryImage image={IMAGES.brandPromise} />
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.passwordReset} />
            <GalleryImage image={IMAGES.welcomeEmail} />
          </div>
          <GalleryImage image={IMAGES.eclipse} />
        </div>
      </section>

      <section aria-label="Wellim experience applications">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.cosmicAlignment} />
            <GalleryImage image={IMAGES.transcendSquare} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.cocktails} />
            <GalleryImage image={IMAGES.travellerIllustration} />
          </div>
          <GalleryImage image={IMAGES.bookingLetter} />
          <div className="grid grid-cols-2 gap-6">
            <GalleryImage image={IMAGES.coastalHotel} />
            <GalleryImage image={IMAGES.gardenHotel} />
          </div>
          <div className="project-video-pair">
            {[VIDEOS.fullyAlive, VIDEOS.waitlist].map((video) => (
              <div key={video.src} className="project-video-pair-frame">
                <DeferredVideo
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
