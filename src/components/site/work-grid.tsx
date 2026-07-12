import Image from "next/image";
import GridBg from "@/components/grid-bg";
import PixelReveal from "@/components/pixel-reveal";
import ProjectCard, { type ProjectCardData } from "@/components/project-card";
import UnicornScene from "@/components/unicorn-scene";
import {
  MAINS_HERO_CARD,
  MAINS_ROWS,
  SIDES_HERO_CARD,
  SIDES_ROWS,
} from "@/data/projects";

const ABOUT_UNICORN_PROJECT_ID = "uZFQTrR4JDEDONaCWbI1";

// Positioning wrapper only — ProjectCard links itself via card.href, so this
// must never add another <a> around it (nested anchors break hydration).
function CardLink({
  card,
  className,
}: {
  card: ProjectCardData;
  className?: string;
}) {
  return (
    <div className={className}>
      <ProjectCard card={card} />
    </div>
  );
}

// Work Section from the Framer home page: two stacked sub-sections (Mains,
// Sides) of project cards scrolling over a pinned grid background, followed
// by the "Stack" block (Chef's note / about image over a Unicorn scene).
export default function WorkGrid() {
  return (
    <section id="work" className="relative flex flex-col overflow-clip">
      {/* Mains */}
      <div className="relative">
        <div className="sticky top-0 z-[1] h-screen">
          <GridBg gradient="up" flicker />
        </div>
        <div className="relative z-[2] flex flex-col gap-5 px-6 pb-40 md:px-20">
          <div className="pb-11">
            <CardLink card={MAINS_HERO_CARD} className="max-w-[800px]" />
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[120px]">
            <div className="md:w-[519px] md:shrink-0 md:pl-[130px]">
              <CardLink card={MAINS_ROWS[0][0]} />
            </div>
            <div className="md:pt-[159px]">
              <CardLink card={MAINS_ROWS[0][1]} className="md:w-[500px]" />
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[317px]">
            <div className="md:pl-10">
              <CardLink card={MAINS_ROWS[1][0]} className="md:w-[367px]" />
            </div>
            <div className="md:pt-[65px]">
              <CardLink card={MAINS_ROWS[1][1]} className="md:w-[508px]" />
            </div>
          </div>
          <div className="md:pl-40">
            <CardLink card={MAINS_ROWS[2][0]} className="md:w-[427px]" />
          </div>
        </div>
      </div>

      {/* Sides */}
      <div className="relative">
        <div className="sticky top-0 z-[1] h-screen">
          <GridBg gradient="none" flicker />
        </div>
        <div className="relative z-[2] flex flex-col gap-3 px-6 pb-40 md:px-20">
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
              <CardLink card={SIDES_ROWS[0][1]} className="md:w-[440px]" />
            </div>
          </div>
          <div className="flex flex-col gap-10 md:flex-row md:gap-[273px]">
            <div className="md:pl-[86px]">
              <CardLink card={SIDES_ROWS[1][0]} className="md:w-[367px]" />
            </div>
            <div className="md:pt-[106px]">
              <CardLink card={SIDES_ROWS[1][1]} className="md:w-[508px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Stack — Chef's note / about */}
      <div id="about" className="relative h-screen">
        <GridBg gradient="none" />
        <div className="relative z-[1] flex h-full flex-col items-center overflow-hidden px-6 pt-[120px] pb-20 md:px-[50px]">
          <UnicornScene
            projectId={ABOUT_UNICORN_PROJECT_ID}
            className="absolute inset-0 h-full w-full"
            altText="Animated background"
          />
          <PixelReveal className="relative w-full max-w-[900px]">
            <Image
              src="/about.png"
              alt="Chef's note — about Darshita"
              width={900}
              height={774}
              className="h-auto w-full"
            />
          </PixelReveal>
        </div>
      </div>
    </section>
  );
}
