import type { Metadata } from "next";
import BottomBar from "@/components/bottom-bar";
import Hero from "@/components/hero";
import WorkGrid from "@/components/site/work-grid";
import { getAllProjects } from "@/data/projects";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const personId = `${SITE_URL}/#darshita-patankar`;
  const websiteId = `${SITE_URL}/#website`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/about-portrait.png`,
        jobTitle: "Visual Designer and Illustrator",
        description: SITE_DESCRIPTION,
        homeLocation: {
          "@type": "Place",
          name: "Bengaluru, India",
        },
        knowsAbout: [
          "Brand identity",
          "Visual design",
          "Illustration",
          "Motion design",
          "Interaction design",
          "Typography",
          "Creative coding",
        ],
        sameAs: SOCIAL_PROFILES,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: `${SITE_NAME} Portfolio`,
        description: SITE_DESCRIPTION,
        inLanguage: "en-IN",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile-page`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
        hasPart: getAllProjects().map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: `${SITE_URL}/projects/${project.slug}`,
          creator: { "@id": personId },
        })),
      },
    ],
  };

  // Nav and Footer render from the root layout; keep these wrappers free of
  // z-index/positioning so Hero's blend modes reach the Unicorn canvas.
  return (
    <main className="bg-black font-sans" data-theme="dark" data-home-page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <div id="hero">
        <Hero />
      </div>
      <WorkGrid />
      <BottomBar />
    </main>
  );
}
