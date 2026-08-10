import Image from "next/image";
import GridBg from "@/components/grid-bg";
import ProjectCard, { type ProjectCardData } from "@/components/project-card";
import { UnicornStudioEmbed } from "@/components/unicorn-scene";
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
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,11vw,180px)] min-[900px]:gap-y-0 2xl:flex 2xl:gap-[180px]">
            <div className="min-w-0 2xl:w-[494px] 2xl:shrink-0 2xl:pl-[100px]">
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
          <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-[clamp(48px,16vw,273px)] min-[900px]:gap-y-0 2xl:flex 2xl:gap-[273px]">
            <div className="min-w-0 2xl:pl-[86px]">
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
        <div className="relative z-[4] flex min-h-[720px] items-start justify-center overflow-hidden px-6 pt-24 pb-20 md:min-h-[900px] md:px-[50px] md:pt-[133px]">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
            <UnicornStudioEmbed
              projectId={ABOUT_UNICORN_PROJECT_ID}
              width={1440}
              height={900}
              fitWidthBelow={768}
              className="max-w-none shrink-0"
            />
          </div>
          {SHOW_ABOUT_HTML_CARDS && (
            <div className="relative flex w-full max-w-[404px] flex-col items-center justify-center gap-6 md:max-w-[856px] md:flex-row md:items-start md:gap-12">
              <div
                className="relative aspect-[404/600] w-full shrink-0 overflow-hidden md:max-w-[404px]"
                data-about-html-card
              >
                <Image
                  src="/about-card-profile.png"
                  alt="About Darshita Patankar, a visual designer from India"
                  fill
                  sizes="(min-width: 768px) 404px, calc(100vw - 48px)"
                  className="scale-[1.13] object-cover md:scale-100"
                  draggable={false}
                  unoptimized
                />
              </div>
              <div
                className="relative aspect-[404/600] w-full shrink-0 overflow-hidden md:mt-[134px] md:max-w-[404px]"
                data-about-html-card
              >
                <Image
                  src="/about-card-practice.png"
                  alt="Darshita Patankar's design practice, interests, and availability"
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
