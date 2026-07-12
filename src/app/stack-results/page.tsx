import type { Metadata } from "next";
import { ProjectImage } from "@/components/project/media";
import {
  StackResultsLogo,
  StackResultsWordmark,
} from "@/components/project/stack-results-art";

export const metadata: Metadata = {
  title: "Stack Results",
  description:
    "Stack Results is a branding project rooted in transparency, connection, and community-powered wellness.",
};

// Case-study showcase page, mirrored from the Framer /stack-results page tree.
export default function StackResultsPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-[#FFFEF0] pb-10">
      <div className="flex w-full flex-col items-center gap-[14vw]">
        <section className="flex w-full flex-col items-center gap-2.5">
          <StackResultsLogo />
          <StackResultsWordmark />
          <ProjectImage
            src="https://framerusercontent.com/images/OSRf9r54tVuLBwYvl4kszkYJ1C0.png"
            alt="Stack Results brand exploration"
          />
        </section>

        <section className="flex w-full flex-col items-center gap-[14vw]">
          <ProjectImage
            src="https://framerusercontent.com/images/xbinIDL5ykUUdqOrGGA0wLj7hnc.png"
            alt="Stack Results slide"
            className="block w-[91%]"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/j5cH9qvVXnloSoWitgwSu0hOg.png"
            alt="Stack Results landing page"
            className="block w-[89%]"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/hAAoWZNvYmo5fjrg6QSdxfSoL34.png"
            alt="Stack Results visual system"
            className="block w-[82.5%]"
          />
          <ProjectImage
            src="https://framerusercontent.com/images/QuljbNsumkegu1IGMWkakJEWHA.png"
            alt="Stack Results brand application"
            className="block w-[94.6%]"
          />
        </section>
      </div>
    </main>
  );
}
