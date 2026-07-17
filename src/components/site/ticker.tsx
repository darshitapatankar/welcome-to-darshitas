// Ticker Section from the Framer home page: a horizontal strip of three
// looping text-animation videos (24px gap, 40px padding on the 1440 frame).
import { DeferredVideo } from "@/components/project/deferred-video";

const VIDEOS = [
  { src: "/ticker-1.mp4", width: 1280, height: 900 },
  { src: "/ticker-2.mp4", width: 1728, height: 1080 },
  { src: "/ticker-3.mp4", width: 960, height: 600 },
];

export default function Ticker() {
  return (
    <section
      aria-hidden="true"
      className="relative z-[1] flex flex-col items-center justify-center gap-6 overflow-clip bg-black p-10 md:flex-row"
      data-theme="dark"
    >
      {VIDEOS.map((video) => (
        <DeferredVideo
          key={video.src}
          src={video.src}
          width={video.width}
          height={video.height}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full min-w-0 object-cover md:flex-1"
        />
      ))}
    </section>
  );
}
