import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { workSans } from "@/app/fonts";
import CustomTypeGallery from "@/components/project/custom-type-gallery";
import IllustrationsGallery from "@/components/project/illustrations-gallery";
import PondicherryGallery from "@/components/project/pondicherry-gallery";
import StackResultsGallery from "@/components/project/stack-results-gallery";
import ThirtySixDaysGallery from "@/components/project/thirty-six-days-gallery";
import WaygroundAiGallery from "@/components/project/wayground-ai-gallery";
import WellimGallery from "@/components/project/wellim-gallery";
import {
  getProject,
  getProjectCardSubtext,
  getProjectSlugs,
  type ProjectBlock,
} from "@/data/projects";
import {
  getProjectPageCopy,
  type ProjectPageCopy,
} from "@/data/project-page-copy";
import { SUPPLEMENTAL_BLOCKS } from "@/data/project-supplements";

const CARD_DESCRIPTION_PROJECTS = new Set([
  "code-busters",
  "pondicherry-botanical",
  "stack-results",
  "wellim",
]);

const PROJECT_OVERVIEW_COPY: Record<string, string[]> = {
  "code-busters": [
    "Wayground is a classroom platform where teachers run quizzes and students earn coins for correct answers. Between question rounds, Energizers give students a few minutes of active play, helping maintain momentum and giving students another way to participate beyond test performance.",
    "Code Busters is one of these Energizers. Each student is assigned a classmate’s vault and races to guess the password before another player breaks into theirs.",
  ],
  "pondicherry-botanical": [
    "The Pondicherry Botanical Garden is a real landmark in Pondicherry, India. In Life of Pi, it becomes home to a fictional zoo and Richard Parker, the Bengal tiger at the centre of the story.",
    "I grew up with the film and wanted to build the identity that this imagined version of the garden might have had.",
  ],
  wellim: [
    "Most travel platforms rank hotels by luxury and let you choose from the top. Wellim starts elsewhere: every place has a character, and one of them fits you. My role was to make that match visible before booking.",
  ],
  "stack-results": [
    "Wellness advice online is crowded with sponsorships, affiliate links, and conflicting recommendations. Stack Results offers a more transparent alternative: people publish their real health stacks, from supplements to daily habits, so others working toward the same goal can learn from what has already helped.",
  ],
  illustrations: [
    "These pieces give me room to explore colour, texture, form, and visual character. Each one begins with a different visual idea and develops through experimentation. Together, they show the range and playfulness of my illustration practice.",
  ],
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const pageCopy = getProjectPageCopy(slug);
  const title = pageCopy?.title ?? project.title;
  const description =
    pageCopy?.leadHtml.replace(/<[^>]+>/g, "") ?? project.description;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title: `${title} — Darshita Patankar`,
      description,
    },
  };
}

function ProjectNarrative({
  copy,
  showIntro = true,
  hiddenParagraphs = [],
}: {
  copy: ProjectPageCopy;
  showIntro?: boolean;
  hiddenParagraphs?: string[];
}) {
  const hiddenText = new Set(
    hiddenParagraphs.map((html) => html.replace(/<[^>]+>/g, "")),
  );
  const visibleIntro = showIntro
    ? (copy.introHtml ?? []).filter(
        (html) => !hiddenText.has(html.replace(/<[^>]+>/g, "")),
      )
    : [];
  const visibleSections = (copy.sections ?? [])
    .map((section) => ({
      ...section,
      paragraphsHtml: section.paragraphsHtml.filter(
        (html) => !hiddenText.has(html.replace(/<[^>]+>/g, "")),
      ),
    }))
    .filter((section) => section.paragraphsHtml.length > 0);
  const hasNarrative = visibleIntro.length > 0 || visibleSections.length > 0;

  if (!hasNarrative) return null;

  return (
    <section className="project-page-gutter pb-16" data-project-narrative>
      <div className="max-w-[820px]">
        {visibleIntro.length > 0 && (
          <div className="flex flex-col gap-5">
            {visibleIntro.map((html) => (
              <p
                key={html}
                className="font-mono text-sm leading-relaxed text-white/70"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ))}
          </div>
        )}

        {visibleSections.map((section) => (
          <div key={section.heading} className="pt-14">
            <h2
              className={`${workSans.className} pb-5 text-[28px] leading-[34px] font-light tracking-[-0.02em] text-white`}
            >
              {section.heading}
            </h2>
            <div className="flex flex-col gap-5">
              {section.paragraphsHtml.map((html) => (
                <p
                  key={html}
                  className="font-mono text-sm leading-relaxed text-white/70"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCopySection({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs: string[];
}) {
  return (
    <section className="project-page-gutter">
      <div className="max-w-[820px]">
        {heading && (
          <h2
            className={`${workSans.className} pb-5 text-[28px] leading-[34px] font-light tracking-[-0.02em] text-white`}
          >
            {heading}
          </h2>
        )}
        <div className="flex flex-col gap-5">
          {paragraphs.map((html) => (
            <p
              key={html}
              className="font-mono text-sm leading-relaxed text-white/70"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeBustersGallery({ copy }: { copy: ProjectPageCopy }) {
  const [challenge, direction] = copy.sections ?? [];
  const directionParagraphs = direction?.paragraphsHtml ?? [];

  return (
    <div
      className="flex flex-col gap-20 pb-16 md:gap-28"
      data-project-gallery="code-busters"
    >
      <div className="project-page-gutter">
        <Image
          src="/projects/code-busters/hero.png"
          alt="Code Busters gameplay showing a handheld password device, illuminated vault, score, and player ranking"
          width={1920}
          height={1080}
          className="h-auto w-full"
          sizes="100vw"
        />
      </div>

      {challenge && (
        <ProjectCopySection
          heading={challenge.heading}
          paragraphs={challenge.paragraphsHtml}
        />
      )}

      <div className="project-page-gutter">
        <Image
          src="/projects/code-busters/vault-study.png"
          alt="Illuminated Code Busters vault inside a blue security room"
          width={1920}
          height={1080}
          className="h-auto w-full"
          sizes="100vw"
        />
      </div>

      {direction && (
        <ProjectCopySection
          heading={direction.heading}
          paragraphs={directionParagraphs.slice(0, 1)}
        />
      )}

      <div className="project-page-gutter grid grid-cols-1 gap-6 md:grid-cols-2">
        <Image
          src="/projects/code-busters/password-setup.png"
          alt="Blue Code Busters interface for setting a three-digit vault password"
          width={1440}
          height={1440}
          className="h-auto w-full"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <Image
          src="/projects/code-busters/handheld-reveal.png"
          alt="Code Busters handheld password device with the reveal control highlighted"
          width={1440}
          height={1440}
          className="h-auto w-full"
          sizes="(max-width: 767px) 100vw, 50vw"
        />
      </div>

      {directionParagraphs.length > 1 && (
        <ProjectCopySection paragraphs={directionParagraphs.slice(1)} />
      )}

      <div className="project-page-gutter flex justify-center">
        <Image
          src="/projects/code-busters/rewards-and-ranking.png"
          alt="Code Busters gem balance, progress indicator, and player ranking interface"
          width={600}
          height={600}
          className="h-auto w-full max-w-[600px]"
          sizes="(max-width: 767px) calc(100vw - 48px), 600px"
        />
      </div>
    </div>
  );
}

function ProjectMetadata({
  descriptionHtml,
  field,
  client,
  year,
}: {
  descriptionHtml: string[];
  field: string;
  client: string;
  year: string;
}) {
  const rows = [
    { label: "Field", value: field },
    { label: "Client", value: client },
    { label: "Year", value: year },
  ];

  return (
    <div>
      <dl className="flex flex-col gap-5" data-project-metadata>
        <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4">
          <dt className="font-mono text-[12px] leading-[16px] text-white/60 uppercase">
            Description
          </dt>
          <dd
            className="flex flex-col gap-4 text-[14px] leading-[22px] text-white/85"
            data-project-description
          >
            {descriptionHtml.map((html) => (
              <p key={html} dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </dd>
        </div>
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-4"
          >
            <dt className="font-mono text-[12px] leading-[16px] text-white/60 uppercase">
              {label}
            </dt>
            <dd className="text-[14px] leading-[20px] text-white/85">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "imagePair":
      return (
        <div
          className="project-page-gutter grid grid-cols-1 gap-6 pb-6 md:grid-cols-2"
          data-project-gallery-media
          data-project-gallery-kind="image"
          data-project-gallery-layout="pair"
        >
          {block.images.map((image) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt ?? ""}
              width={image.width ?? 1024}
              height={image.height ?? 768}
              className="h-auto w-full"
              sizes="(max-width: 767px) calc((100vw - 72px) / 2), calc((100vw - var(--fixed-ui-inset-left) - var(--fixed-ui-inset-right) - 24px) / 2)"
            />
          ))}
        </div>
      );
    case "image":
      return (
        <div
          className="project-page-gutter"
          data-project-gallery-media
          data-project-gallery-kind="image"
        >
          <Image
            src={block.src}
            alt={block.alt ?? ""}
            width={1440}
            height={900}
            className="h-auto w-full"
            sizes="100vw"
          />
        </div>
      );
    case "video":
      return (
        <div className="project-page-gutter" data-project-gallery-media>
          <video
            src={block.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full"
          />
        </div>
      );
    case "videoPair":
      return (
        <div
          className="project-page-gutter project-video-pair"
          data-project-gallery-media
        >
          {block.videos.map((src) => (
            <div key={src} className="project-video-pair-frame">
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="project-video-pair-media"
              />
            </div>
          ))}
        </div>
      );
    case "heading":
      return (
        <h2
          className={`${workSans.className} project-page-gutter pt-20 pb-6 text-[28px] leading-[34px] font-light tracking-[-0.02em] text-white`}
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <div className="project-page-gutter pb-6">
          <p
            className="max-w-[820px] font-mono text-sm leading-relaxed text-white/70"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </div>
      );
    case "caption":
      return (
        <div className="project-page-gutter py-6">
          <p
            className="mb-9 w-full max-w-[600px] font-mono text-[16px] leading-[22px] text-white/70"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </div>
      );
    case "list":
      return (
        <div className="project-page-gutter pb-6">
          <ul className="max-w-[820px] list-disc pl-6 font-mono text-sm leading-relaxed text-white/70">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const pageCopy = getProjectPageCopy(slug);
  const cardDescription = getProjectCardSubtext(slug);
  const overviewDescription = CARD_DESCRIPTION_PROJECTS.has(slug)
    ? (cardDescription ?? project.description)
    : (pageCopy?.leadHtml ?? cardDescription ?? project.description);
  const previousOverviewCopy =
    PROJECT_OVERVIEW_COPY[slug] ?? (pageCopy ? [] : [project.description]);
  const descriptionCopy =
    slug === "custom-type" ? (pageCopy?.introHtml ?? []) : [];
  const descriptionCandidates =
    CARD_DESCRIPTION_PROJECTS.has(slug) && previousOverviewCopy.length >= 2
      ? previousOverviewCopy
      : [overviewDescription, ...descriptionCopy, ...previousOverviewCopy];
  const overviewParagraphs = Array.from(new Set(descriptionCandidates)).slice(
    0,
    2,
  );

  const sourceBlocks = project.blocks.length
    ? project.blocks
    : (SUPPLEMENTAL_BLOCKS[project.slug] ?? []);
  const blocks = pageCopy
    ? sourceBlocks.filter(
        (block) =>
          block.type === "image" ||
          block.type === "imagePair" ||
          block.type === "video" ||
          block.type === "videoPair",
      )
    : sourceBlocks;
  const displayTitle = pageCopy?.title ?? project.title;
  const displayYear = pageCopy?.year ?? project.year;
  const narrativeParagraphs =
    pageCopy?.sections?.flatMap((section) => section.paragraphsHtml) ?? [];

  return (
    <main
      className="flex min-h-screen flex-col bg-black font-sans"
      data-theme="dark"
    >
      <div className="flex flex-col gap-0 pb-10">
        <section className="project-page-gutter project-overview grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] md:gap-16">
          <h1
            className={`${workSans.className} max-w-full text-[clamp(42px,13.35vw,52px)] leading-[1.08] font-light tracking-[-2px] text-white uppercase md:text-[64px] md:leading-[68px]`}
          >
            {displayTitle}
          </h1>

          <div className="w-full md:justify-self-end">
            <ProjectMetadata
              descriptionHtml={overviewParagraphs}
              field={pageCopy?.field ?? project.field}
              client={pageCopy?.client ?? project.client}
              year={displayYear}
            />
          </div>
        </section>
        {pageCopy &&
          slug !== "code-busters" &&
          slug !== "pondicherry-botanical" &&
          slug !== "stack-results" &&
          slug !== "custom-type" && (
            <ProjectNarrative
              copy={pageCopy}
              hiddenParagraphs={previousOverviewCopy}
            />
          )}
        {slug === "code-busters" && pageCopy ? (
          <CodeBustersGallery copy={pageCopy} />
        ) : slug === "wayground-ai" ? (
          <WaygroundAiGallery />
        ) : slug === "custom-type" ? (
          <CustomTypeGallery />
        ) : slug === "illustrations" ? (
          <IllustrationsGallery />
        ) : slug === "36-days-of-type" ? (
          <ThirtySixDaysGallery />
        ) : slug === "wellim" ? (
          <WellimGallery />
        ) : slug === "pondicherry-botanical" ? (
          <PondicherryGallery />
        ) : slug === "stack-results" ? (
          <StackResultsGallery paragraphsHtml={narrativeParagraphs} />
        ) : (
          blocks.length > 0 && (
            <div className="flex flex-col" data-project-gallery={slug}>
              {blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
}
