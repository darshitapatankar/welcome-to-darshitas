import Image from "next/image";

// Social links from the published Framer site footer.
const FOOTER_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/darshitapatankar/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darshitapatankar/" },
  { label: "Twitter", href: "https://x.com/_darshi" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/10GmoGQzz25hW-WJpPtC0iNtGUbxNqEyK/view?usp=sharing",
  },
];

function Diamond() {
  return (
    <Image
      src="/footer/diamond.png"
      alt=""
      width={20}
      height={20}
      className="size-5 shrink-0"
      aria-hidden="true"
      data-footer-diamond
    />
  );
}

// Full-screen closing composition: a large disco ball on the left and the
// credits, sticker, and social links stacked on the right.
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative h-screen min-h-[720px] overflow-hidden bg-black"
      data-theme="dark"
    >
      <div
        className="absolute top-[-0.525%] left-[-7.5%] z-[1] h-[54.05%] w-[115%] overflow-hidden md:top-[4.15%] md:left-[-4.425%] md:h-[89.7%] md:w-[67.85%]"
        data-footer-mirror-ball-frame
      >
        <iframe
          src="https://my.spline.design/untitled-LBGSSQPIPvvzr8JndXL0uP5U/"
          title="Interactive mirror ball"
          frameBorder="0"
          loading="lazy"
          allow="autoplay; fullscreen"
          data-footer-spline
          className="absolute inset-0 z-[1] h-full w-full translate-y-[30px] scale-110 opacity-90 mix-blend-screen motion-reduce:hidden"
        />
        <Image
          src="/footer/disco-ball-poster.jpg"
          alt=""
          fill
          sizes="(min-width: 768px) 67.85vw, 115vw"
          className="pointer-events-none z-[1] hidden object-contain opacity-90 mix-blend-screen motion-reduce:block"
        />
      </div>
      <div className="absolute top-[50%] right-[7%] z-[3] flex items-center gap-2 font-mono text-[13px] leading-normal text-[#FFC479] md:top-[19.1%] md:right-[12.5%] md:gap-6 md:text-base">
        <Image
          src="/footer/seal.png"
          alt=""
          width={70}
          height={70}
          loading="eager"
          className="size-10 shrink-0 md:size-[70px]"
          aria-hidden="true"
          data-footer-seal
        />
        <div className="footer-text-glow flex flex-col items-start gap-1.5 text-left">
          <p className="whitespace-nowrap">
            Designed and served by Darshita Patankar
          </p>
          <div className="flex w-full items-center justify-start gap-[35px] whitespace-nowrap">
            <span>Bengaluru, India</span>
            <Diamond />
            <span>EST. 2021</span>
          </div>
        </div>
      </div>

      <Image
        src="/footer/ellipse2.png"
        alt=""
        width={1288}
        height={1288}
        loading="eager"
        className="pointer-events-none absolute right-0 bottom-0 z-[4] h-auto w-[745px] max-w-none mix-blend-hard-light md:right-[calc(-30%_-_250px)] md:bottom-[calc(-46.9%_-_440px)] md:w-[1500px]"
        aria-hidden="true"
        data-footer-eclipse
      />

      <div className="absolute right-[7%] bottom-[8%] z-[3] flex w-[86%] flex-col items-end md:right-[12.5%] md:bottom-[18.9%] md:w-auto">
        <div className="relative mb-8 aspect-[468/196] w-[82%] max-w-[453px] md:mb-[43px] md:w-[453px]">
          <video
            src="/footer/thank-you-visit-again.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Thank you, visit again"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        <nav
          aria-label="Social"
          className="flex w-max flex-nowrap items-center gap-9 whitespace-nowrap"
          data-footer-socials
        >
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="contents">
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link font-mono text-[13px] whitespace-nowrap text-[#FFC479] no-underline hover:underline md:text-base"
              >
                {link.label}
              </a>
              {i < FOOTER_LINKS.length - 1 && <Diamond />}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
