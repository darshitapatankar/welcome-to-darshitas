// Ticker Section from the Framer home page: a horizontal strip of three
// looping text-animation videos (24px gap, 40px padding on the 1440 frame).
const VIDEOS = ["/ticker-1.mp4", "/ticker-2.mp4", "/ticker-3.mp4"];

export default function Ticker() {
  return (
    <section
      aria-hidden="true"
      className="relative z-[1] flex flex-col items-center justify-center gap-6 overflow-clip p-10 md:flex-row"
    >
      {VIDEOS.map((src) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full min-w-0 object-cover md:flex-1"
        />
      ))}
    </section>
  );
}
