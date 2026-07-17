import Image from "next/image";
import UnicornScene from "@/components/unicorn-scene";

const FOOTER_UNICORN_PROJECT_ID = "uZFQTrR4JDEDONaCWbI1";

// Social links from the published Framer site footer.
const FOOTER_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/darshitapatankar/" },
  { label: "Twitter", href: "https://x.com/_darshi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darshitapatankar/" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/10GmoGQzz25hW-WJpPtC0iNtGUbxNqEyK/view?usp=sharing",
  },
];

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[21px] w-[21px] fill-[#FF56C1]"
      aria-hidden="true"
    >
      <path d="M12 0l2.4 7.2L21 4.8l-4.8 6L24 12l-7.8 1.2L21 19.2l-6.6-2.4L12 24l-2.4-7.2L3 19.2l4.8-6L0 12l7.8-1.2L3 4.8l6.6 2.4Z" />
    </svg>
  );
}

// Site footer from the Framer home page "Stack" frame: a full-screen Unicorn
// Studio scene with social links and the rotated sticker.
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black"
      data-theme="dark"
    >
      <UnicornScene
        projectId={FOOTER_UNICORN_PROJECT_ID}
        className="absolute inset-0 h-full w-full"
        altText="Darshita Patankar"
      />
      <nav
        aria-label="Social"
        className="absolute inset-x-0 bottom-[137px] z-[3] flex flex-wrap items-center justify-center gap-6 md:gap-12"
      >
        {FOOTER_LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-6 md:gap-12">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-base text-white no-underline hover:underline"
            >
              {link.label}
            </a>
            {i < FOOTER_LINKS.length - 1 && <Star />}
          </span>
        ))}
      </nav>
      <Image
        src="/sticker.png"
        alt=""
        width={421}
        height={209}
        className="absolute right-[10%] bottom-[239px] z-[2] hidden -rotate-12 md:block"
      />
    </footer>
  );
}
