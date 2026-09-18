import type { ProjectCardData } from "@/components/project-card";

// Card content copied from the Framer home page (Work Section instances).
export const MAINS_HERO_CARD: ProjectCardData = {
  srNo: "[01] [Today's Specials]",
  title: "Code Busters",
  href: "/projects/code-busters",
  subtext:
    "A multiplayer hacking game for classrooms, where students break into each other's vaults by cracking passwords.",
  tags: ["Art Direction", "3D", "Game UI"],
  thumbnail: "/work/code-busters.webp",
  aspect: "16:9",
};

export const MAINS_ROWS: ProjectCardData[][] = [
  [
    {
      srNo: "[02]",
      title: "Pondicherry Botanical Garden",
      href: "/projects/pondicherry-botanical",
      subtext:
        "A speculative identity for the real Indian garden that, in Life of Pi, houses a zoo.",
      tags: ["Branding", "Illustration"],
      thumbnail: "/work/pondicherry.png",
      thumbnailVideo: "/work/pondicherry.mp4",
      aspect: "3:2",
    },
    {
      srNo: "[03]",
      title: "Wellim",
      href: "/projects/wellim",
      subtext:
        "A complete identity for a hospitality brand matching travellers to places by feel.",
      tags: ["Branding", "Illustration", "Motion Design"],
      thumbnail: "/work/wellim.png",
      aspect: "3:2",
    },
  ],
  [
    {
      srNo: "[05]",
      title: "Icons at Wayground",
      href: "/projects/icons-at-wayground",
      subtext:
        "A visual language for product tools, rewards, game mechanics, and student engagement across Wayground.",
      tags: ["Icon Design", "Illustration"],
      thumbnail: "/projects/icons-at-wayground-gallery/01-playground.png",
      aspect: "1:1",
    },
    {
      srNo: "[06]",
      title: "Stack Results",
      href: "/projects/stack-results",
      subtext:
        "Identity for a community wellness platform where people share the supplements and habits they genuinely use.",
      tags: ["Branding"],
      thumbnail: "/work/stack-results.png",
      aspect: "16:9",
    },
  ],
];

export const SIDES_HERO_CARD: ProjectCardData = {
  srNo: "[01]",
  title: "Demure Typeface",
  href: "/projects/demure",
  thumbnail: "/work/demure.png",
  thumbnailVideo: "/work/demure.mp4",
  aspect: "16:9",
};

export const SIDES_ROWS: ProjectCardData[][] = [
  [
    {
      srNo: "[02]",
      title: "Custom Typography",
      href: "/projects/custom-type",
      thumbnail: "/work/custom-typography-20260713.png",
      aspect: "4:3",
    },
    {
      srNo: "[03]",
      title: "36 Days of Type",
      href: "/projects/36-days-of-type",
      thumbnail: "/work/36-days.png",
      thumbnailVideo: "/work/36-days.mp4",
      aspect: "1:1",
    },
  ],
  [
    {
      srNo: "[05]",
      title: "Illustrations",
      href: "/projects/illustrations",
      thumbnail: "/work/illustrations.png",
      aspect: "4:5",
    },
    {
      srNo: "[04]",
      title: "Madhubani x Art Nouveau",
      href: "/projects/manavi-x-madhubani",
      thumbnail: "/work/madhubani.png",
      aspect: "16:9",
    },
  ],
];

const PROJECT_CARDS: ProjectCardData[] = [
  MAINS_HERO_CARD,
  ...MAINS_ROWS.flat(),
  SIDES_HERO_CARD,
  ...SIDES_ROWS.flat(),
];

// ---------------------------------------------------------------------------
// CMS data layer — generated from the Framer CMS dumps in framer-export/cms/
// (Projects.json = detail content, Project__NEW_.json = card metadata).
// Draft items are skipped; framerusercontent URLs are preserved as-is.
// ---------------------------------------------------------------------------

export type ProjectBlock =
  | { type: "image"; src: string; alt?: string }
  | {
      type: "imagePair";
      images: Array<{
        src: string;
        alt?: string;
        width?: number;
        height?: number;
      }>;
    }
  | { type: "video"; src: string }
  | { type: "videoPair"; videos: string[] }
  | { type: "heading"; text: string }
  | { type: "paragraph"; html: string }
  | { type: "caption"; html: string }
  | { type: "list"; items: string[] };

export type ProjectCategory = "Mains" | "Sides" | "Drinks";

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  field: string;
  client: string;
  category: ProjectCategory;
  srNo?: string;
  aspect?: ProjectCardData["aspect"];
  thumbnail: { url: string; alt?: string };
  thumbnailVideo?: string;
  gallery?: string[];
  /** Rich-text body parsed into renderable blocks. */
  blocks: ProjectBlock[];
};

export const PROJECTS: Project[] = [
  {
    slug: "wellim",
    title: "Wellim",
    description:
      "Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate with who they are and what they seek. The brand draws inspiration from the eclipse, a symbol of rare and seamless connection, reflected in its logo and visual language.  This project involved building the brand from the ground up—crafting the identity, motion design, website, and illustrations, all tied together through a cohesive strategy rooted in harmony and personalization.",
    year: "2024",
    field: "Branding · Illustration · Motion Design",
    client: "Wellim",
    category: "Mains",
    srNo: "[03]",
    aspect: "3:2",
    thumbnail: {
      url: "https://framerusercontent.com/images/dfQsav4399qqgAEIB8HiRG2O4y0.gif",
    },
    blocks: [
      {
        type: "imagePair",
        images: [
          {
            src: "/projects/wellim-gallery/01-symbol.png",
            alt: "Wellim eclipse symbol on a dark background",
          },
          {
            src: "/projects/wellim-gallery/02-wordmark.png",
            alt: "Wellim wordmark on a warm white background",
          },
        ],
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/1HapnqwgLa3ADRUP1CE2vj2lMQ.mp4",
      },
      {
        type: "caption",
        html: "The identity is built around alignment. The eclipse became the central device, with separate forms meeting to create one complete symbol. This idea carries through the logo, motion, and illustrations.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/30NergX8YWoDEF6B0jXGbtcp9A.png",
      },
      {
        type: "caption",
        html: "Instead of signalling luxury through ornament, the visual language focuses on atmosphere. Warm light, restrained compositions, and considered movement allow each property to express its character while still belonging to Wellim.",
      },
      {
        type: "imagePair",
        images: [
          {
            src: "https://framerusercontent.com/images/5ZReXpPhGKfkqjyMBZPNSvrGtI.png",
            alt: "Wellim hotel suite overlooking the sea",
          },
          {
            src: "https://framerusercontent.com/images/oxqZUqGwUZsgcYWgZq9YXr28s4.png",
            alt: "Wellim hotel room opening onto a tropical garden",
          },
        ],
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/9IrHIk43PEl0KtaVBwObcBWl7o.mp4",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/U0XrOIfadASucu1uVmSze4y0.png",
      },
      {
        type: "caption",
        html: "The system helps travellers understand a hotel through how it feels, not simply where it ranks.",
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/7MEZpd5H86Kh4kuWGwQJXd5VzD8.mp4",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/istuAYOsN8kHvJLtEFR4f6IZ7E.png",
      },
      {
        type: "videoPair",
        videos: [
          "https://framerusercontent.com/images/uxzKkmT6Oh0Mju2Hcw8JTW88Yp8.mp4",
          "https://framerusercontent.com/images/uoRSjVfsUqwAJOXwrLwyjJ7mTU.mp4",
        ],
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/LvSZ7xDekGGomqXJjIUQLr8TEaM.png",
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/L7NyuOekzkrps2o1LD6iPF7GQ.mp4",
      },
    ],
  },
  {
    slug: "stack-results",
    title: "Stack Results",
    description:
      "Stack Results is a branding project rooted in transparency, connection, and community-powered wellness. At the heart of the identity is a sun-like logo, built from individual squares that seem to gently fall into place — representing people coming together, sharing their health stacks to inspire others.  The coral tone brings a bright, energizing warmth to the brand, while the soft pastel system adds lightness and clarity. Together, they form a visual language that feels clean, minimal, and approachable — much like the journey toward better health when shared.",
    year: "2025",
    field: "Branding",
    client: "Stack Results",
    category: "Mains",
    srNo: "[04]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/k5ak5D7qtMpau5Q8WCLEle7FWiI.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/k5ak5D7qtMpau5Q8WCLEle7FWiI.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/9iRuBnwK2e3FvfpGUuok3dAZcoI.png",
      },
      { type: "heading", text: "Introduction" },
      {
        type: "paragraph",
        html: "Stack Results is a branding project rooted in transparency, connection, and community-powered wellness. The brand seeks to guide users in optimizing their health stacks—custom combinations of wellness tools, routines, and insights—through collaboration and shared stories.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/pY4gNmk2jINR68GxcyDpm9IK1w.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/QzczjhDRvkEEnAWLOteaqTUxxA.png",
      },
      { type: "heading", text: "Challenge" },
      {
        type: "paragraph",
        html: "In a world saturated with health apps and fragmented advice, Stack Results needed to differentiate itself through a brand that felt both credible and inviting. The challenge was to visually communicate:",
      },
      {
        type: "list",
        items: [
          "The community-driven nature of the platform.",
          "The modularity of personalized health stacks.",
          "A sense of approachable expertise—not clinical, but trustworthy.",
          "A welcoming, optimistic energy without overwhelming users.",
        ],
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/fE2EfmUYOdVJ59NLW5inqg6YTYU.mp4",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/T5U3r1oe9JoEmoO0pDV9UkTyAg.png",
      },
      { type: "heading", text: "Strategy & Concept" },
      {
        type: "paragraph",
        html: "At the heart of the identity is a <strong>sun-like logo</strong> composed of small individual squares that gently orbit in a circular motion. These squares symbolise: <strong>Individuals</strong> and their unique wellness components. <strong>Community sharing</strong>, represented through the formation of a circle. The <strong>cyclical nature of health</strong> that is non-linear but interconnected.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/AvZilp77F1wN97xDItMZz6Yeg8.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/gDg3NlKsqrVcf5Fo9WPizRd1cSo.png",
      },
      { type: "heading", text: "Visual System" },
      {
        type: "paragraph",
        html: "<strong>The Color Palette has Coral</strong> as the primary colour, it is a vibrant tone chosen for its energizing and warm properties, used sparingly to highlight key actions and calls to engagement. The <strong>Soft Pastels</strong>, such as mint, sky blue, and butter yellow provide a sense of calm, lightness, and clarity. These reflect the diversity and modularity of user health stacks.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/g97co8VZrbR7ALFjeofSlCWtgII.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/xlhx2IybNwNKz6ppLqXUOk4w68.png",
      },
    ],
  },
  {
    slug: "museo",
    title: "Museo",
    description:
      "Museo is a no-code playground for creators to build bold, expressive digital products that shape internet culture. I was responsible for the brand identity. The brand blends digital nostalgia, rebellious energy, and self-expression to empower the next generation of creators.",
    year: "—",
    field: "Brand Identity · Digital Product Design",
    client: "Museo",
    category: "Mains",
    thumbnail: {
      url: "https://framerusercontent.com/images/jDBkx9Xv9ftVCEbi8EUlARPxE.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/jDBkx9Xv9ftVCEbi8EUlARPxE.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/cPrSsEaJBqAuOxWTLh1XqpdSW0.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/aZZRXnhgKIfWctAAnVbJ4upwO8.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/CXRmeM2BGTGsO5NHs3Bca6Po.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/OCxDHPKJIsf9fkmPnuPfzTPt4U.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/koprSFEoTutgjkibCsUr9JbXhqo.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/B04Sl9lPzdEWXiE6UPb59dV2huI.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/ARTlAkcWyxTEFl6uQzLCvSyRhm4.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/4r0wKBUfjaUHW7cGgVgiT9cbE8.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/35T1HpWaMpqQ2mRkguSBo15U1o.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/QTcnYRddbDnz9RrCqVMEWNp7u98.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/WcQFBZ9h6uZH8aTONJDuzlxFyR0.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/jRFsRYItee2S111HKhaeBQJMYs.png",
      },
    ],
  },
  {
    slug: "pondicherry-botanical",
    title: "Pondicherry Botanical",
    description:
      "This project is a reimagining of the Pondicherry Botanical Garden, drawing inspiration from its depiction in Life of Pi. While the real garden is a lush sanctuary of diverse flora, this concept embraces the novel’s fictional world—where it also housed a zoo.  The brand identity and website design transport viewers to the colonial era, mirroring the aesthetic of vintage newspapers and old-world charm. The color palette is inspired by the timeless facades of Pondicherry’s colonial architecture, lending an air of nostalgia.",
    year: "2022",
    field: "Branding · Illustration",
    client: "Self-initiated",
    category: "Mains",
    srNo: "[02]",
    aspect: "3:2",
    thumbnail: {
      url: "https://framerusercontent.com/images/4nZ1yoGZUyxqJCWYGrpIvJ6yQ.png",
    },
    thumbnailVideo:
      "https://framerusercontent.com/assets/cvaTXwP23zldm1T1sGQv7pSp20.mp4",
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/4nZ1yoGZUyxqJCWYGrpIvJ6yQ.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/RLKIhKgzBPUYEygzaWHOliAyws.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/nQiRv4E9Lb6EJ8Zk40rr9ly3p7Q.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/X6P8LI8u7nUkG7VCLG86a5BhJig.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/scMsp95ydjY7FKNotocQjuVbw.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/CmusqekvRiCGSH7Nmwc26MWo.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/0uIAPTFE6HbUADqCF5rv21f40.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/FGzeSjXHkCUajEGnvJjb4zRs.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/037x1DdaLA9UcwayfkD2W7LEoig.png",
      },
    ],
  },
  {
    slug: "demure",
    title: "demure",
    description:
      "Demure is my first exploration into typeface design, created during an online course at Practica Program. With its soft curves and delicate serifs, it balances a sense of warmth and refinement. Designed with subtle contrasts and organic letterforms, Demure captures an understated charm, reminiscent of handwritten calligraphy yet structured enough for modern typography.",
    year: "2024",
    field: "Typeface Design",
    client: "Self-initiated",
    category: "Sides",
    srNo: "[07]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/J5dnL6RVqgKzwKQATQyGfqeKsF8.png",
    },
    thumbnailVideo:
      "https://framerusercontent.com/assets/3eN3i4RCOw1wfBYtuSMvttRY3k.mp4",
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/wW2OAdZa1efTh8bDXYLRJL7Ow.png",
      },
      {
        type: "imagePair",
        images: [
          {
            src: "https://framerusercontent.com/images/xfpB2K8d7QuYaY7ZmDEWtwAjxjM.png",
            width: 2840,
            height: 1749,
          },
          {
            src: "https://framerusercontent.com/images/59EFsSIHSVD7ByBOhnZLD9fkUw.png",
            width: 2840,
            height: 1749,
          },
        ],
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/74uRP4NW91pYoK62r6x8mNIb3M.png",
      },
      {
        type: "imagePair",
        images: [
          {
            src: "https://framerusercontent.com/images/DhXK1xTAocro6fo5Nuy5jtRhR8.png",
            width: 2840,
            height: 1749,
          },
          {
            src: "https://framerusercontent.com/images/JpY8rFyndxQwXKJSFsLXJWYnNM.png",
            width: 2840,
            height: 1749,
          },
        ],
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/6PdSBHYIW2BIbfe0PjG8iNItkeI.png",
      },
      {
        type: "imagePair",
        images: [
          {
            src: "https://framerusercontent.com/images/6jExryeALL3Uky0KoWHCaH2gs.png",
            width: 2840,
            height: 1748,
          },
          {
            src: "https://framerusercontent.com/images/8UWIV9kOyq6CNVH6KWBaZS3LBjU.png",
            width: 2840,
            height: 1749,
          },
        ],
      },
    ],
  },
  {
    slug: "36-days-of-type",
    title: "36 Days of Type",
    description:
      "36 Days of Type is an annual global challenge that brings together designers, illustrators, and artists to creatively interpret the Latin alphabet and numbers over 36 days. Having admired the incredible work shared during this event for years, I decided to take part and explore typography in my own way.  For this project, I experimented with Latin letterforms using bold colors, fluid shapes, and playful compositions. My focus was on bringing energy and vibrancy to each letter while exploring different styles and textures.",
    year: "2023",
    field: "Typography",
    client: "36 Days of Type",
    category: "Sides",
    srNo: "[09]",
    aspect: "1:1",
    thumbnail: {
      url: "https://framerusercontent.com/images/lfOoe7TtOkvAAax1pJdUdELHB8.png",
    },
    blocks: [],
  },
  {
    slug: "custom-type",
    title: "Custom Type",
    description:
      "This project is a deep dive into custom type design experimenting with different styles, textures, and cultural influences. From elegant scripts to bold neon aesthetics, each type treatment tells its own story. Some designs draw inspiration from classic calligraphy, while others explore contemporary and experimental typography, integrating elements of Devanagari and Latin scripts.",
    year: "2025",
    field: "Typography",
    client: "Self-initiated",
    category: "Sides",
    srNo: "[08]",
    aspect: "4:3",
    thumbnail: {
      url: "https://framerusercontent.com/images/g5TZ6ilxp9oL3tg13m1CRdSA.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/dTvfMbmLL3BM4y1kaACA8IsRRE.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/G0a27PXNNo1fLMaHNHPNjbuLGU.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/nt002CPcRU0T7zUzk3rAdIzAw.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/Gdo2j8JtcuIf0grNj7DWGIFcVm0.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/QOE6bWRV6PgfIG9A8pW2fm3oun8.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/dMSzfK7lRcMBxh6bemsjK8D5g.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/R1h2cW53hlvbZ4kLZFxTALK3UQ.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/YNcR2pLofp2rCskMP6UI2CUPYpk.png",
      },
    ],
  },
  {
    slug: "manavi-x-madhubani",
    title: "Manavi x Madhubani",
    description:
      "Inspired by Alphonse Mucha’s Daydream, in this piece I merge the flowing elegance of Art Nouveau with the intricate storytelling of Madhubani. The soft, flowing color palette reflects the elegance of late 19th-century Art Nouveau, while the intricate patterns and storytelling elements embrace the essence of Madhubani folk art. At the heart of this composition is my dearest friend, Manavi, adorned in a Banarasi Sari and jasmine flowers.",
    year: "2023",
    field: "Illustration",
    client: "Self-initiated",
    category: "Drinks",
    srNo: "[11]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/eIIVdWsmNo7T9J1W2m9Nz0K5gg.png",
    },
    blocks: [
      {
        type: "image",
        src: "/projects/madhubani-gallery/01-portrait-closeup.png",
      },
    ],
  },
  {
    slug: "gitpoap",
    title: "GitPOAP",
    description: "A collection all the POAPs I illustrated for GitPOAP.",
    year: "2022",
    field: "Illustration",
    client: "GitPOAP",
    category: "Drinks",
    thumbnail: {
      url: "https://framerusercontent.com/images/joZTmwfeUMAWX5YuScKGwVSMEKA.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/1ccrUSQuW0C03hCUCP6EntAyM.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/AdYrk1to8PTeGyCC0rsaMpw4JEg.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/mrrursqH2rGplvN0BlT06FSUgg.png",
      },
    ],
  },
  {
    slug: "code-busters",
    title: "Code Busters",
    description:
      "Darshita Patankar is a visual designer crafting distinctive brands, digital experiences and illustrations.",
    year: "2026",
    field: "Art Direction · 3D · Game UI",
    client: "Wayground",
    category: "Mains",
    srNo: "[01]",
    aspect: "16:9",
    thumbnail: {
      url: "/work/code-busters.webp",
      alt: "Code Busters mission screen with the vault, gem, and code-cracking device",
    },
    blocks: [
      {
        type: "paragraph",
        html: "Darshita Patankar is a visual designer crafting distinctive brands, digital experiences and illustrations.",
      },
      {
        type: "heading",
        text: "Branding, Illustration & Motion Design | 2024",
      },
      {
        type: "paragraph",
        html: "<strong>Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate with who they are and what they seek. The brand draws inspiration from the eclipse, a symbol of rare and seamless connection, reflected in its logo and visual language.  This project involved building the brand from the ground up—crafting the identity, motion design, website, and illustrations, all tied together through a cohesive strategy rooted in harmony and personalization.</strong>",
      },
    ],
  },
  {
    slug: "wayground-ai",
    title: "Wayground AI",
    description:
      "Wayground AI supports the full teaching loop, from creating resources to assessing responses and acting on classroom data.",
    year: "2026",
    field: "Branding · Motion Design",
    client: "Wayground",
    category: "Mains",
    srNo: "[05]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/5XKP70dBLjrDqnU7OSTqPpd3is.png",
    },
    blocks: [],
  },
  {
    slug: "icons-at-wayground",
    title: "Icons at Wayground",
    description:
      "A visual language for product tools, rewards, game mechanics, and student engagement across Wayground.",
    year: "2026",
    field: "Icon Design · Illustration",
    client: "Wayground",
    category: "Mains",
    srNo: "[06]",
    aspect: "4:3",
    thumbnail: {
      url: "/projects/icons-at-wayground-gallery/01-playground.png",
      alt: "Playground arcade illustration",
    },
    blocks: [],
  },
  {
    slug: "illustrations",
    title: "Illustrations",
    description:
      "This project is a reimagining of the Pondicherry Botanical Garden, drawing inspiration from its depiction in Life of Pi. While the real garden is a lush sanctuary of diverse flora, this concept embraces the novel’s fictional world—where it also housed a zoo.",
    year: "Ongoing",
    field: "Illustration",
    client: "Self-initiated",
    category: "Sides",
    srNo: "[10]",
    aspect: "4:5",
    thumbnail: {
      url: "https://framerusercontent.com/images/N0NY6T3entMUuW1y3E8BDYePXc.png",
    },
    blocks: [],
  },
];
export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getProjectCardSubtext(slug: string): string | undefined {
  return PROJECT_CARDS.find((card) => card.href === `/projects/${slug}`)
    ?.subtext;
}

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
