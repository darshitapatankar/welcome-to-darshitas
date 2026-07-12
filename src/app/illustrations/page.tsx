import type { Metadata } from "next";
import { montserrat } from "@/components/project/fonts";
import { FreeformCanvas, FreeformImage } from "@/components/project/freeform";
import { ProjectImage } from "@/components/project/media";

export const metadata: Metadata = {
  title: "Illustrations",
  description:
    "Illustration work by Darshita Patankar, including a fusion of Art Nouveau and Madhubani styles.",
};

// Mirrored from the Framer /illustrations page tree. The two Lottie
// animations in the plum hero are omitted (interactive Framer components);
// the pattern artwork carries the section instead.
const COLLAGE = { width: 1420, height: 1584 };
const BORDER = "1.04vw solid white";

function Caption({
  text,
  left,
  top,
  width,
}: {
  text: string;
  left: number;
  top: number;
  width: number;
}) {
  return (
    <p
      className={`${montserrat.className} absolute text-[clamp(11px,1.5vw,21.3px)] leading-[1.2] text-black`}
      style={{
        left: `${(left / COLLAGE.width) * 100}%`,
        top: `${(top / COLLAGE.height) * 100}%`,
        width: `${(width / COLLAGE.width) * 100}%`,
      }}
    >
      {text}
    </p>
  );
}

export default function IllustrationsPage() {
  return (
    <main className="flex min-h-dvh flex-col bg-white">
      {/* Hero */}
      <section className="flex w-full flex-col items-center overflow-hidden bg-[#610035] px-[7vw] pt-[7vw]">
        <ProjectImage
          src="https://framerusercontent.com/images/3dI6e9jrn00iqtj4IaOX1E4I.png"
          alt="Illustration pattern"
          className="block w-[116%] max-w-none"
        />
      </section>

      {/* Manavi painting */}
      <ProjectImage
        src="https://framerusercontent.com/images/yCBVeZ9vxKWVorJgEajc6sj2M0.png"
        alt="Manavi painting — Art Nouveau x Madhubani"
      />

      {/* About the painting */}
      <section className="flex w-full justify-center bg-white py-[6vw]">
        <div
          className={`${montserrat.className} flex w-[70%] max-w-[990px] flex-col gap-[2.5vw] text-[clamp(12px,1.67vw,23.67px)] leading-[1.2] text-black`}
        >
          <p>
            This art is inspired by Alphonse Mucha&rsquo;s Daydream, but with a
            touch of Indian flavour. I tried to create a fusion of my favourite
            art styles, Art Nouveau and Madhubani, both coming from two
            different lands but seamlessly merging under this digital painting.
          </p>
          <p>
            The colour palette belongs to the late 19th century Art Nouveau
            style, however, the painting majorly leans towards the local
            Madhubani art found in the northern hemisphere of India.
          </p>
        </div>
      </section>

      {/* Detail collage with captions */}
      <FreeformCanvas
        designWidth={COLLAGE.width}
        designHeight={COLLAGE.height}
        className="bg-white"
      >
        <FreeformImage
          src="https://framerusercontent.com/images/B5qlSDnKBl0t0K3fzPDxzDMADug.png"
          alt="Painting detail — portrait"
          canvas={COLLAGE}
          left={0}
          top={0}
          width={715.33}
          height={711.77}
          border={BORDER}
        />
        <FreeformImage
          src="https://framerusercontent.com/images/dSmDcEfVZXTBBPljwhQ2NJ4UeA.png"
          alt="Painting detail — zodiac ring"
          canvas={COLLAGE}
          left={715.33}
          top={0}
          width={704.67}
          height={894.6}
          border={BORDER}
        />
        <FreeformImage
          src="https://framerusercontent.com/images/K6tr2QFWiZCp9aWzFPR9edGclRI.png"
          alt="Painting detail — Banarasi saree pattern"
          canvas={COLLAGE}
          left={0}
          top={809.86}
          width={715.33}
          height={668.32}
          border={BORDER}
        />
        <FreeformImage
          src="https://framerusercontent.com/images/xrn1aGmpLWGOjvyBNcqM9hSGI2Y.png"
          alt="Painting detail — Indian symbols"
          canvas={COLLAGE}
          left={715.33}
          top={1015.63}
          width={307.36}
          height={462.55}
          border={BORDER}
        />
        <FreeformImage
          src="https://framerusercontent.com/images/EBEAnM9PNLikxYWucuQNBfHU.png"
          alt="Painting detail — river Ganges"
          canvas={COLLAGE}
          left={1022.69}
          top={1015.63}
          width={397.31}
          height={462.55}
          border={BORDER}
        />
        <Caption
          text="This portrait is of my dearest friend Manavi. Over here, she is wearing Indian jewels and jasmine flowers."
          left={54.6}
          top={734.79}
          width={606.14}
        />
        <Caption
          text="The zodiac signs surrounding the lady were majorly seen in Art Nouveau works, however here it is drawn in a Madhubani style."
          left={760.31}
          top={916.07}
          width={614.71}
        />
        <Caption
          text="The Banasari saree pattern displayed over here is one of the finest patterns for sarees found in India."
          left={54.6}
          top={1501.18}
          width={606.14}
        />
        <Caption
          text="Over here we see a snake, a Bengal tiger, a lotus, Sitar, and the river Ganges all symbolising Indian culture."
          left={760.31}
          top={1498.82}
          width={614.71}
        />
      </FreeformCanvas>

      {/* Mockup */}
      <ProjectImage
        src="https://framerusercontent.com/images/T73nRazpZ69gbK0GjYAgJdhfKIA.png"
        alt="Illustration mockups"
      />
    </main>
  );
}
