import HeroVideo from "@/components/hero-video";
import UnicornScene from "@/components/unicorn-scene";

const UNICORN_PROJECT_ID = "mPHFzyZKCxuOXMRyVwvX";

export default function Hero() {
  // `isolate` makes the section the blending group and the wrapper must NOT
  // create a stacking context (no z-index), or mix-blend on the video can't
  // reach the Unicorn canvas behind it.
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden">
      <UnicornScene
        projectId={UNICORN_PROJECT_ID}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[loaded=true]:opacity-100"
        altText="Darshita's portfolio hero background"
      />
      <div className="relative flex w-full flex-col items-center gap-4 px-6 text-center">
        {/* mix-blend-screen drops the video's black background against
            the Unicorn backdrop while keeping the animation readable */}
        <HeroVideo
          src="/hero.webm"
          className="w-full max-w-3xl mix-blend-screen"
        />
      </div>
    </section>
  );
}
