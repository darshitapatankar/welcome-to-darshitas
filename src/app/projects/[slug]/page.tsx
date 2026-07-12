import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { workSans } from "@/app/fonts";
import {
  getProject,
  getProjectSlugs,
  type ProjectBlock,
} from "@/data/projects";
import { SUPPLEMENTAL_BLOCKS } from "@/data/project-supplements";

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
  return {
    title: `${project.title} - Darshita Patankar`,
    description: project.description,
  };
}

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "image":
      return (
        <Image
          src={block.src}
          alt={block.alt ?? ""}
          width={1440}
          height={900}
          className="h-auto w-full"
          sizes="100vw"
        />
      );
    case "video":
      return (
        <video
          src={block.src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full"
        />
      );
    case "heading":
      return (
        <h2
          className={`${workSans.className} px-10 pt-20 pb-6 text-3xl font-light tracking-[-0.02em] text-white`}
        >
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p
          className="max-w-[820px] px-10 pb-6 font-mono text-sm leading-relaxed text-white/70"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "list":
      return (
        <ul className="max-w-[820px] list-disc px-10 pb-6 pl-16 font-mono text-sm leading-relaxed text-white/70">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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

  const blocks = project.blocks.length
    ? project.blocks
    : (SUPPLEMENTAL_BLOCKS[project.slug] ?? []);

  return (
    <main className="flex min-h-screen flex-col bg-[#141414] font-sans">
      <div className="relative h-screen w-full">
        {project.thumbnailVideo ? (
          <video
            src={project.thumbnailVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={project.thumbnail.url}
            alt={project.thumbnail.alt ?? project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
      <div className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-10 px-10 md:flex-row md:items-start md:gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <h1
              className={`${workSans.className} text-[52px] leading-[1.2] font-light tracking-[-0.04em] text-white`}
            >
              {project.title}
            </h1>
            {project.date && (
              <p className="font-mono text-sm text-white/50">{project.date}</p>
            )}
          </div>
          <p className="font-mono text-sm leading-relaxed text-white/60 md:max-w-[413px] md:flex-1">
            {project.description}
          </p>
        </div>
        {blocks.length > 0 && (
          <div className="flex flex-col">
            {blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
