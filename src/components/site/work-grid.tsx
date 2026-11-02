import Image from "next/image";
import GridBg from "@/components/grid-bg";
import ProjectCard, { type ProjectCardData } from "@/components/project-card";
import UnicornScene from "@/components/unicorn-scene";
import {
  MAINS_HERO_CARD,
  MAINS_ROWS,
  SIDES_HERO_CARD,
  SIDES_ROWS,
} from "@/data/projects";

const ABOUT_UNICORN_PROJECT_ID = "SmbaAswh4nJ05rz1HdvE";
const SHOW_ABOUT_HTML_CARDS = true;

// Positioning wrapper only — ProjectCard links itself via card.href, so this
// must never add another <a> around it (nested anchors break hydration).
function CardLink({
  card,
  className,
  cardClassName,
}: {
  card: ProjectCardData;
  className?: string;
  cardClassName?: string;
}) {
  return (
    <div className={`min-w-0 ${className ?? ""}`}>
      <ProjectCard card={card} className={cardClassName} />
    </div>
  );
}

// Work Section from the Framer home page: two stacked sub-sections (Mains,
// Sides) of project cards. The grid background is pinned on desktop and
// scrolls naturally on mobile, followed by the "Stack" block.
export default function WorkGrid() {
  return (
    <section
      id="work"
      className="relative flex flex-col overflow-clip bg-black pb-24 md:pb-32"
      data-theme="dark"
    >
      {/* Mains */}
      <div id="mains" className="relative" data-card-section>
        <div
          className="relative z-[1] h-svh md:sticky md:top-0 md:h-screen"
          data-card-section-background
        >
          <GridBg gradient="up" pixels="mains" />
        </div>
        <div className="project-card-grid relative z-[2] -mt-[100svh] flex flex-col gap-10 pt-72 min-[900px]:gap-0 md:-mt-[100vh] md:pt-[280px]">
          <div className="md:pb-11">
            <CardLink
              card={MAINS_HERO_CARD}
              className="max-w-[800px] md:ml-2"
            />
          </div>
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,8vw,120px)] min-[900px]:gap-y-0 2xl:flex 2xl:justify-center 2xl:gap-[120px]">
            <div className="min-w-0 2xl:w-[519px] 2xl:shrink-0 2xl:pl-[130px]">
              <CardLink
                card={MAINS_ROWS[0][0]}
                className="w-full min-[900px]:ml-auto min-[900px]:max-w-[389px] 2xl:max-w-none"
              />
            </div>
            <div className="min-w-0 min-[900px]:pt-[159px]">
              <CardLink
                card={MAINS_ROWS[0][1]}
                className="w-full min-[900px]:max-w-[480px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,18vw,317px)] min-[900px]:gap-y-0 2xl:flex 2xl:justify-center 2xl:gap-[317px]">
            <div className="min-w-0 2xl:pl-10">
              <CardLink
                card={MAINS_ROWS[1][0]}
                className="w-4/5 min-[900px]:ml-auto min-[900px]:max-w-[406px]"
              />
            </div>
            <div className="min-w-0 min-[900px]:pt-24">
              <CardLink
                card={MAINS_ROWS[1][1]}
                className="w-full min-[900px]:max-w-[508px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sides */}
      <div id="sides" className="relative" data-card-section>
        <div
          className="relative z-[1] h-svh md:sticky md:top-0 md:h-screen"
          data-card-section-background
        >
          <GridBg gradient="down" pixels="sides" />
        </div>
        <div className="project-card-grid relative z-[2] -mt-[100svh] flex flex-col gap-10 pt-72 min-[900px]:gap-3 md:-mt-[100vh] md:pt-[280px]">
          <div className="md:pb-16">
            <CardLink
              card={SIDES_HERO_CARD}
              className="w-full md:ml-auto md:max-w-[740px]"
            />
          </div>
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,11vw,180px)] min-[900px]:gap-y-0">
            <div className="min-w-0">
              <CardLink
                card={SIDES_ROWS[0][0]}
                className="w-full min-[900px]:ml-auto min-[900px]:max-w-[394px]"
              />
            </div>
            <div className="min-w-0 min-[900px]:pt-[159px]">
              <CardLink
                card={SIDES_ROWS[0][1]}
                className="w-full min-[900px]:max-w-[454px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,16vw,273px)] min-[900px]:gap-y-0">
            <div className="min-w-0">
              <CardLink
                card={SIDES_ROWS[1][0]}
                className="w-full min-[900px]:ml-auto min-[900px]:max-w-[367px]"
              />
            </div>
            <div className="min-w-0 min-[900px]:pt-[106px]">
              {/* Framer forces this instance to 489px tall, content centered */}
              <CardLink
                card={SIDES_ROWS[1][1]}
                className="w-full min-[900px]:max-w-[508px]"
                cardClassName="min-[900px]:h-[489px] min-[900px]:justify-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stack — Chef's note / about */}
      <div
        id="about"
        className="relative mt-24 min-h-[720px] md:mt-32 md:min-h-[900px]"
      >
        <div
          className="relative z-[4] mx-auto w-full max-w-[1296px] px-6 pb-16 md:px-12"
          data-brand-film
        >
          <div className="aspect-video w-full overflow-hidden bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/E39U7x7YMD8"
              title="Design Is Dead — Darshita Patankar's brand film"
              className="h-full w-full border-0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="relative z-[4] flex min-h-[720px] items-center justify-center overflow-hidden px-6 py-20 md:min-h-[900px] md:px-[50px]">
          <div className="about-scene-ambient pointer-events-none absolute inset-0">
            <UnicornScene
              projectId={ABOUT_UNICORN_PROJECT_ID}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {SHOW_ABOUT_HTML_CARDS && (
            <div className="relative grid w-full max-w-[404px] grid-cols-1 items-start gap-6 md:max-w-[856px] md:grid-cols-2 md:gap-12">
              <div
                className="relative aspect-[808/1236] w-full overflow-hidden"
                data-about-html-card
              >
                <Image
                  src="/about-intro-profile.png"
                  alt="Darshita Patankar, a brand designer from India, on building brands through storytelling and thoughtful decisions"
                  fill
                  sizes="(min-width: 768px) 404px, calc(100vw - 48px)"
                  className="object-cover"
                  draggable={false}
                  unoptimized
                />
              </div>
              <div
                className="relative aspect-[808/1236] w-full overflow-hidden md:mt-24"
                data-about-html-card
              >
                <Image
                  src="/about-intro-practice.png"
                  alt="Darshita's work across identity, motion, illustration and typography, her Design Is Dead brand film, and availability for a full-time brand role"
                  fill
                  sizes="(min-width: 768px) 404px, calc(100vw - 48px)"
                  className="object-cover"
                  draggable={false}
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
