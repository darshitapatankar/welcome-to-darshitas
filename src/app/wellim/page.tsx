import type { Metadata } from "next";
import { dmSans } from "@/components/project/fonts";
import { ProjectImage, ProjectVideo } from "@/components/project/media";
import { WellimWordmarkSlide } from "@/components/project/wellim-art";

export const metadata: Metadata = {
  title: "Wellim",
  description:
    "Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate with who they are and what they seek.",
};

// Case-study showcase page, mirrored from the Framer /wellim page tree.
export default function WellimPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-[rgb(8,8,10)]">
      <div className="flex w-full flex-col items-center gap-[7vw]">
        {/* Intro slides */}
        <section className="flex w-full flex-col items-center">
          <div className="relative flex aspect-[1420/799] w-full items-center justify-center bg-[#1C1A17]">
            <ProjectImage
              src="https://framerusercontent.com/images/aSahr26fhmxdXg25wQ0vlz3SU.png"
              alt="Wellim logo"
              className="block w-[23%]"
            />
          </div>
          <WellimWordmarkSlide />
          {/* Eclipse: sun and moon imagery layered inside a cropped frame */}
          <div className="relative aspect-[1420/811] w-full overflow-hidden bg-white">
            <ProjectImage
              src="https://framerusercontent.com/images/ATAhSUmerwkmS04KkF7WDwsb0o.png"
              alt="Wellim sun artwork"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <ProjectImage
              src="https://framerusercontent.com/images/WXt7FNOj27xJbFLvIH5gQBPRao.png"
              alt="Wellim moon artwork"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex w-full items-center justify-center bg-[#FBF6EE] px-[8.7vw] py-[9vw]">
            <div
              className={`${dmSans.className} w-full max-w-[1140px] text-[clamp(16px,1.7vw,24px)] leading-[1.2] font-light tracking-[-0.02em] text-[#1C1A17]`}
            >
              <p>
                Wellim is for those who seek and manifest moments when they feel
                truly alive. We believe in crafting instances of fulfillment
                where you feel free and liberated from all constraints.
              </p>
              <p className="mt-[1.2em]">
                A Wellim experience is born when you are in perfect alignment
                with yourself, your surroundings, and the universe. It&rsquo;s
                in these moments of harmony that everything falls into place,
                creating an epiphany that transcends the ordinary.
              </p>
            </div>
          </div>
          <ProjectImage
            src="https://framerusercontent.com/images/9PAJN5pMONVX0WT0kGEQz9A3Pw.png"
            alt="Wellim brand collage"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/9eQg64NiRgZNTeVMq9YnUu1Q3o.png"
            alt="Wellim brand application"
          />
        </section>

        <ProjectVideo src="https://framerusercontent.com/assets/h0VsODHDTfecjyQOTZwYsx5Ig0.mp4" />

        <section className="flex w-full items-center justify-center">
          <ProjectImage
            src="https://framerusercontent.com/images/pzfoskdVvtKR2mSV6TsORV0WZLc.png"
            alt="Wellim visual"
            className="block w-1/2"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/L7yNV3m8hj0PNDPgW9hVzFpzah8.png"
            alt="Wellim visual"
            className="block w-1/2"
          />
        </section>

        <section className="flex w-full flex-col items-center gap-[7vw]">
          <ProjectImage
            src="https://framerusercontent.com/images/z1IjhNLeVXxpTmKASwBtIg8vzo.png"
            alt="Wellim brand collage"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/gEXS9IEZxMWJ0Pbswes2bqlRhw.png"
            alt="Wellim website"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/RWnqVtrjbSvlEZABkUSXgdTvYwI.png"
            alt="Wellim website"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/f3Y24cDQhASHm4s0hHRoz8KpxGU.png"
            alt="Wellim social media"
            className="block w-[90%]"
          />
        </section>

        <ProjectImage
          src="https://framerusercontent.com/images/75Fht63c5Hx68glWcop5xUoL5E.png"
          alt="Wellim illustrations"
        />
      </div>
    </main>
  );
}
