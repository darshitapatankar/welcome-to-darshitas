import Image from "next/image";
import Link from "next/link";
import { workSans } from "@/app/fonts";

export type ProjectCardData = {
  srNo: string;
  title: string;
  subtext?: string;
  tags?: string[];
  thumbnail: string;
  aspect: "16:9" | "4:3" | "3:2" | "1:1" | "4:5";
  href?: string;
};

const ASPECT: Record<ProjectCardData["aspect"], string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
};

export default function ProjectCard({
  card,
  className,
}: {
  card: ProjectCardData;
  className?: string;
}) {
  const content = (
    <>
      <p className="font-mono text-base leading-tight text-[#FF56C1]">
        {card.srNo}
      </p>
      <div className={`relative w-full overflow-hidden ${ASPECT[card.aspect]}`}>
        <Image
          src={card.thumbnail}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 810px) 100vw, 40vw"
        />
      </div>
      <div className="flex flex-col gap-4 p-2.5">
        <div className="flex flex-col gap-2.5">
          <h3
            className={`${workSans.className} text-base font-normal tracking-[0.2em] text-white uppercase`}
          >
            {card.title}
          </h3>
          {card.subtext && (
            <p className="font-mono text-sm leading-relaxed text-white/40">
              {card.subtext}
            </p>
          )}
        </div>
        {card.tags && card.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/30 px-3 py-1 font-mono text-xs tracking-wide text-white/70 uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  const classes = `flex flex-col gap-2.5 ${className ?? ""}`;
  if (card.href) {
    return (
      <Link href={card.href} className={`${classes} no-underline`}>
        {content}
      </Link>
    );
  }
  return <div className={classes}>{content}</div>;
}
