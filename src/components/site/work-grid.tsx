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
    <div className={className}>
      <ProjectCard card={card} className={cardClassName} />
    </div>
  );
}

// Work Section from the Framer home page: two stacked sub-sections (Mains,
// Sides) of project cards scrolling over a pinned grid background, followed
// by the "Stack" block (Chef's note / about image over a Unicorn scene).
export default function WorkGrid() {
  return (
    <section
      id="work"
      className="relative flex flex-col overflow-clip bg-black"
      data-theme="dark"
    >
      {/* Mains */}
      <div id="mains" className="relative" data-card-section>
        <div
          className="sticky top-0 z-[1] h-screen"
          data-card-section-background
        >
          <GridBg gradient="up" pixels="mains" />
        </div>
        <div className="project-card-grid relative z-[2] -mt-[100vh] flex flex-col gap-10 pt-[260px] md:gap-0 md:pt-[280px]">
          <div className="pb-11">
            <CardLink card={MAINS_HERO_CARD} className="ml-2 max-w-[800px]" />
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-[120px]">
            <div className="md:w-[519px] md:shrink-0 md:pl-[130px]">
              <CardLink card={MAINS_ROWS[0][0]} />
            </div>
            <div className="md:pt-[159px]">
              <CardLink card={MAINS_ROWS[0][1]} className="md:w-[480px]" />
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-[317px]">
            <div className="md:pl-10">
              <CardLink card={MAINS_ROWS[1][0]} className="md:w-[367px]" />
            </div>
            <div className="md:pt-[65px]">
              {/* Framer forces this instance to 489px tall, content centered */}
              <CardLink
                card={MAINS_ROWS[1][1]}
                className="md:w-[508px]"
                cardClassName="md:h-[489px] md:justify-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sides */}
      <div className="relative" data-card-section>
        <div
          className="sticky top-0 z-[1] h-screen"
          data-card-section-background
        >
          <GridBg gradient="none" pixels="sides" />
        </div>
        <div className="project-card-grid relative z-[2] -mt-[100vh] flex flex-col gap-10 pt-[260px] md:gap-3 md:pt-[280px]">
          <div className="pb-16">
            <CardLink
              card={SIDES_HERO_CARD}
              className="md:ml-auto md:w-[740px]"
            />
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[180px]">
            <div className="md:w-[494px] md:shrink-0 md:pl-[100px]">
              <CardLink card={SIDES_ROWS[0][0]} />
            </div>
            <div className="md:pt-[159px]">
              <CardLink card={SIDES_ROWS[0][1]} className="md:w-[454px]" />
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[273px]">
            <div className="md:pl-[86px]">
              <CardLink card={SIDES_ROWS[1][0]} className="md:w-[367px]" />
            </div>
            <div className="md:pt-[106px]">
              {/* Framer forces this instance to 489px tall, content centered */}
              <CardLink
                card={SIDES_ROWS[1][1]}
                className="md:w-[508px]"
                cardClassName="md:h-[489px] md:justify-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stack — Chef's note / about */}
      <div id="about" className="relative min-h-[720px] md:min-h-[900px]">
        <GridBg gradient="none" />
        <div className="relative z-[4] flex min-h-[720px] items-start justify-center overflow-hidden px-6 pt-24 pb-20 md:min-h-[900px] md:px-[50px] md:pt-[133px]">
          <UnicornStudioEmbed
            projectId={ABOUT_UNICORN_PROJECT_ID}
            width={1440}
            height={900}
            className="absolute top-0 left-1/2 max-w-none -translate-x-1/2"
          />
          {SHOW_ABOUT_HTML_CARDS && (
            <div className="relative flex w-full max-w-[856px] flex-col items-center justify-center gap-6 md:flex-row md:items-start md:gap-12">
              <div
                className="relative aspect-[404/600] w-full max-w-[404px] shrink-0 overflow-hidden"
                data-about-html-card
              >
                <Image
                  src="/about-card-profile.png"
                  alt="About Darshita Patankar, a visual designer from India"
                  fill
                  sizes="(min-width: 768px) 404px, calc(100vw - 48px)"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div
                className="relative aspect-[404/600] w-full max-w-[404px] shrink-0 overflow-hidden md:mt-[134px]"
                data-about-html-card
              >
                <Image
                  src="/about-card-practice.png"
                  alt="Darshita Patankar's design practice, interests, and availability"
                  fill
                  sizes="(min-width: 768px) 404px, calc(100vw - 48px)"
                  className="object-cover"
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
