"use client";

import Image from "next/image";
import { useState } from "react";

// Social links from the published Framer site footer.
const FOOTER_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/darshitapatankar/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darshitapatankar/" },
  { label: "Twitter", href: "https://x.com/_darshi" },
  {
    label: "Resume",
    href: "/resume.pdf",
  },
];

function Diamond() {
  return (
    <Image
      src="/footer/diamond.png"
      alt=""
      width={20}
      height={20}
      className="size-5 shrink-0 select-none"
      aria-hidden="true"
      draggable={false}
      data-footer-diamond
    />
  );
}

// Full-screen closing composition: a large disco ball on the left and the
// credits, sticker, and social links stacked on the right.
export default function Footer() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <footer
      id="contact"
      className="relative h-svh min-h-[720px] overflow-hidden bg-black md:h-screen"
      data-theme="dark"
    >
      <div
        className="absolute top-6 left-1/2 z-[1] aspect-square h-auto w-[min(calc(100%_-_48px),48svh)] -translate-x-1/2 overflow-visible select-none lg:top-[4.15%] lg:left-[-4.425%] lg:h-[89.7%] lg:w-[67.85%] lg:translate-x-0 lg:overflow-hidden"
        data-footer-mirror-ball-frame
      >
        <iframe
          src="https://my.spline.design/untitled-LBGSSQPIPvvzr8JndXL0uP5U/"
          title="Interactive mirror ball"
          frameBorder="0"
          loading="lazy"
          allow="autoplay; fullscreen"
          onLoad={() => setSplineLoaded(true)}
          data-footer-spline
          className={`absolute inset-0 z-[1] hidden h-full w-full translate-y-[30px] scale-110 mix-blend-screen select-none motion-reduce:hidden lg:block ${
            splineLoaded ? "lg:opacity-90" : "lg:opacity-0"
          }`}
        />
        <Image
          src="/footer/disco-ball-poster.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 67.85vw, min(calc(100vw - 48px), 48svh)"
          className={`pointer-events-none z-0 block object-contain opacity-90 mix-blend-screen select-none ${
            splineLoaded ? "motion-reduce:opacity-90 lg:opacity-0" : ""
          }`}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-[52%] right-6 left-6 z-[3] flex items-start gap-3 font-mono text-[13px] leading-normal text-[#FFC479] lg:top-[19.1%] lg:right-[12.5%] lg:left-auto lg:items-center lg:gap-6 lg:text-base"
        data-footer-credits
      >
        <Image
          src="/footer/seal.png"
          alt=""
          width={70}
          height={70}
          loading="eager"
          className="size-10 shrink-0 select-none lg:size-[70px]"
          aria-hidden="true"
          draggable={false}
          data-footer-seal
        />
        <div className="footer-text-glow flex flex-col items-start gap-1.5 text-left">
          <p className="lg:whitespace-nowrap">
            Designed and served by Darshita Patankar
          </p>
          <div className="flex w-full items-center justify-start gap-5 whitespace-nowrap lg:gap-[35px]">
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
        className="pointer-events-none absolute right-0 bottom-0 z-[4] h-auto w-[745px] max-w-none mix-blend-hard-light select-none lg:right-[calc(-30%_-_250px)] lg:bottom-[calc(-46.9%_-_440px)] lg:w-[1500px]"
        aria-hidden="true"
        draggable={false}
        data-footer-eclipse
      />

      <div
        className="absolute right-6 bottom-24 left-6 z-[3] flex flex-col items-center lg:right-[12.5%] lg:bottom-[18.9%] lg:left-auto lg:w-auto lg:items-end"
        data-footer-actions
      >
        <div className="relative mb-6 aspect-[468/196] w-full max-w-[340px] select-none lg:mb-[43px] lg:w-[453px] lg:max-w-[453px]">
          <Image
            src="/footer/thank-you-visit-again.png"
            alt="Thank you, visit again"
            fill
            sizes="(min-width: 1024px) 453px, min(340px, calc(100vw - 48px))"
            className="absolute inset-0 h-full w-full object-contain select-none"
            draggable={false}
          />
        </div>
        <nav
          aria-label="Social"
          className="flex w-full flex-nowrap items-center justify-between whitespace-nowrap lg:w-max lg:gap-9"
          data-footer-socials
        >
          {FOOTER_LINKS.map((link, i) => (
            <span key={link.label} className="contents">
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link font-mono text-[13px] whitespace-nowrap text-[#FFC479] no-underline hover:underline lg:text-base"
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
