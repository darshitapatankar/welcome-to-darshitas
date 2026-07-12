import type { ProjectCardData } from "@/components/project-card";

// Card content copied from the Framer home page (Work Section instances).
export const MAINS_HERO_CARD: ProjectCardData = {
  srNo: "[01] [Today's Specials]",
  title: "Code Busters",
  href: "/projects/code-busters",
  subtext:
    "Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate with who they are and what they seek.",
  tags: ["Game Art"],
  thumbnail: "/work/code-busters.png",
  aspect: "16:9",
};

export const MAINS_ROWS: ProjectCardData[][] = [
  [
    {
      srNo: "[02]",
      title: "Pondicherry Botanical Garden",
      href: "/projects/pondicherry-botanical",
      subtext:
        "Wellim is a hospitality brand built on the idea of perfect alignment—connecting",
      tags: ["Brand Design", "Illustration"],
      thumbnail: "/work/pondicherry.png",
      aspect: "3:2",
    },
    {
      srNo: "[03]",
      title: "Wellim",
      href: "/projects/wellim",
      subtext:
        "Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate.",
      tags: ["Branding", "Web Design", "Illustration"],
      thumbnail: "/work/wellim.png",
      aspect: "3:2",
    },
  ],
  [
    {
      srNo: "[05]",
      title: "Stack Results",
      href: "/projects/stack-results",
      subtext:
        "Wellim is a hospitality brand built on the idea of perfect alignment—connecting",
      tags: ["Icon Design"],
      thumbnail: "/work/stack-results.png",
      aspect: "16:9",
    },
    {
      srNo: "[04]",
      title: "Wayground AI",
      href: "/projects/wayground-ai",
      subtext: "Wellim is a hospitality brand built on the idea.",
      tags: ["Branding", "Web Design"],
      thumbnail: "/work/wayground-ai.png",
      aspect: "16:9",
    },
  ],
  [
    {
      srNo: "[05]",
      title: "Icons at Wayground",
      href: "/projects/icons-at-wayground",
      subtext: "Wellim is a hospitality brand built on the idea of perfect.",
      tags: ["Icon Design"],
      thumbnail: "/work/icons-wayground.png",
      aspect: "4:3",
    },
  ],
];

export const SIDES_HERO_CARD: ProjectCardData = {
  srNo: "[01]",
  title: "Demure Typeface",
  href: "/projects/demure",
  thumbnail: "/work/demure.png",
  aspect: "16:9",
};

export const SIDES_ROWS: ProjectCardData[][] = [
  [
    {
      srNo: "[02]",
      title: "Custom Typography",
      href: "/projects/custom-type",
      thumbnail: "/work/custom-typography.png",
      aspect: "4:3",
    },
    {
      srNo: "[03]",
      title: "36 Days of Type",
      href: "/projects/36-days-of-type",
      thumbnail: "/work/36-days.png",
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

// ---------------------------------------------------------------------------
// CMS data layer — generated from the Framer CMS dumps in framer-export/cms/
// (Projects.json = detail content, Project__NEW_.json = card metadata).
// Draft items are skipped; framerusercontent URLs are preserved as-is.
// ---------------------------------------------------------------------------

export type ProjectBlock =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; html: string }
  | { type: "list"; items: string[] };

export type ProjectCategory = "Mains" | "Sides" | "Drinks";

export type Project = {
  slug: string;
  title: string;
  description: string;
  /** Byline shown under the title, e.g. "Branding | 2025". */
  date?: string;
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
    date: "Branding, Illustration & Motion Design | 2024",
    category: "Mains",
    srNo: "[03]",
    aspect: "3:2",
    thumbnail: {
      url: "https://framerusercontent.com/images/dfQsav4399qqgAEIB8HiRG2O4y0.gif",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/tLyp4zlZ3rjzePbpCYuz2JIKSko.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/S15KaMQ8MF8U5SYAmE5LOZ8zIDA.png",
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/1HapnqwgLa3ADRUP1CE2vj2lMQ.mp4",
      },
      { type: "heading", text: "Introduction" },
      {
        type: "paragraph",
        html: "Wellim is not just a luxury destination, it is an experience that embodies tranquility, renewal, and intentionality. Designed for discerning individuals who prioritise depth over opulence, Wellim positions itself as a brand that invites users to “transcend into better experiences.”",
      },
      { type: "heading", text: "Challenge" },
      {
        type: "paragraph",
        html: "To craft a visual identity and communication strategy that reflects luxury without being loud, one that connects emotionally with modern travellers seeking quiet sophistication and soul-deep rest.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/NfQIuf9zEztF2P3rhztey0eoEM.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/mckcsplnaLEYMVbqNl8fT1rHk.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/30NergX8YWoDEF6B0jXGbtcp9A.png",
      },
      { type: "heading", text: "Strategy" },
      {
        type: "paragraph",
        html: "By anchoring the brand in natural metaphors (eclipse, warm light, soft spaces), Wellim creates a feeling of calm anticipation. Every touchpoint, from website to social media evokes peace and exclusivity.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/5ZReXpPhGKfkqjyMBZPNSvrGtI.png",
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/9IrHIk43PEl0KtaVBwObcBWl7o.mp4",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/U0XrOIfadASucu1uVmSze4y0.png",
      },
      { type: "heading", text: "Brand Essence" },
      {
        type: "paragraph",
        html: "Wellim is crafted for individuals who seek luxurious, meaningful escapes. It positions itself at the intersection of well-being and elevated living, targeting discerning travelers or clients who value immersive comfort and curated serenity.",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/oxqZUqGwUZsgcYWgZq9YXr28s4.png",
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
        type: "video",
        src: "https://framerusercontent.com/images/uxzKkmT6Oh0Mju2Hcw8JTW88Yp8.mp4",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/LvSZ7xDekGGomqXJjIUQLr8TEaM.png",
      },
      {
        type: "video",
        src: "https://framerusercontent.com/images/uoRSjVfsUqwAJOXwrLwyjJ7mTU.mp4",
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
    date: "Branding | 2025",
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
    date: "Branding & Illustration | 2022",
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
    date: "Typeface Design",
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
        type: "image",
        src: "https://framerusercontent.com/images/xfpB2K8d7QuYaY7ZmDEWtwAjxjM.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/59EFsSIHSVD7ByBOhnZLD9fkUw.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/74uRP4NW91pYoK62r6x8mNIb3M.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/DhXK1xTAocro6fo5Nuy5jtRhR8.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/JpY8rFyndxQwXKJSFsLXJWYnNM.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/6PdSBHYIW2BIbfe0PjG8iNItkeI.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/6jExryeALL3Uky0KoWHCaH2gs.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/8UWIV9kOyq6CNVH6KWBaZS3LBjU.png",
      },
    ],
  },
  {
    slug: "36-days-of-type",
    title: "36 Days of Type",
    description:
      "36 Days of Type is an annual global challenge that brings together designers, illustrators, and artists to creatively interpret the Latin alphabet and numbers over 36 days. Having admired the incredible work shared during this event for years, I decided to take part and explore typography in my own way.  For this project, I experimented with Latin letterforms using bold colors, fluid shapes, and playful compositions. My focus was on bringing energy and vibrancy to each letter while exploring different styles and textures.",
    date: "Typography | 2023",
    category: "Sides",
    srNo: "[09]",
    aspect: "1:1",
    thumbnail: {
      url: "https://framerusercontent.com/images/lfOoe7TtOkvAAax1pJdUdELHB8.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/NkhBV2L5Yg4LrigZKlLqHXto.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/JLLT8Es8Axn2AAF3UUTLcR10U8g.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/w9msuWj43KVx2qXckg8E6zUC7s.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/4eKijyHzbdaJCxz4v4qCS43Lrbc.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/jn4DDB843SfHgi63xWGqSJUJgek.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/gP0rs5qZpZMuxrmNziHD5QEstU.png",
      },
    ],
  },
  {
    slug: "custom-type",
    title: "Custom Type",
    description:
      "This project is a deep dive into custom type design experimenting with different styles, textures, and cultural influences. From elegant scripts to bold neon aesthetics, each type treatment tells its own story. Some designs draw inspiration from classic calligraphy, while others explore contemporary and experimental typography, integrating elements of Devanagari and Latin scripts.",
    date: "Typography | 2024",
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
    date: "Illustration | 2022",
    category: "Drinks",
    srNo: "[11]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/eIIVdWsmNo7T9J1W2m9Nz0K5gg.png",
    },
    blocks: [
      {
        type: "image",
        src: "https://framerusercontent.com/images/qeaLpXISef1tTI3SPZeOHElFqZA.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/L3ww71jiAX258GMOBEC79Ka8Yc.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/lSuZo3p0GOTKMBUDJqO3ot5F5vs.png",
      },
      {
        type: "image",
        src: "https://framerusercontent.com/images/mxOXizu6TUit7YdGaR4tor00.png",
      },
    ],
  },
  {
    slug: "gitpoap",
    title: "GitPOAP",
    description: "A collection all the POAPs I illustrated for GitPOAP.",
    date: "Illustrations | 2022",
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
    category: "Mains",
    srNo: "[01]",
    aspect: "16:9",
    thumbnail: {
      url: "https://framerusercontent.com/images/HY0ZqaVy1bFJsgPgU8Xe0wH0f6g.png",
      alt: "Code Buster Thumbail",
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
      "Wellim is a hospitality brand built on the idea of perfect alignment—connecting travelers to hotels that resonate with who they are and what they seek. The brand draws inspiration from the eclipse, a symbol of rare and seamless connection, reflected in its logo and visual language.  This project involved building the brand from the ground up—crafting the identity, motion design, website, and illustrations, all tied together through a cohesive strategy rooted in harmony and personalization.",
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
      "This project is a reimagining of the Pondicherry Botanical Garden, drawing inspiration from its depiction in Life of Pi. While the real garden is a lush sanctuary of diverse flora, this concept embraces the novel’s fictional world—where it also housed a zoo.",
    category: "Mains",
    srNo: "[06]",
    aspect: "4:3",
    thumbnail: {
      url: "https://framerusercontent.com/images/dREHmBCyvGfsNUD4ohuSUeAvoOQ.png",
    },
    thumbnailVideo:
      "https://framerusercontent.com/assets/pGXbtQtr7sTTH4yhHrcRstz0hE.mp4",
    blocks: [],
  },
  {
    slug: "illustrations",
    title: "Illustrations",
    description:
      "This project is a reimagining of the Pondicherry Botanical Garden, drawing inspiration from its depiction in Life of Pi. While the real garden is a lush sanctuary of diverse flora, this concept embraces the novel’s fictional world—where it also housed a zoo.",
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

export function getProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
