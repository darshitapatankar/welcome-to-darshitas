export type ProjectPageCopy = {
  title: string;
  field: string;
  client: string;
  year: string;
  role: string;
  leadHtml: string;
  introHtml?: string[];
  sections?: Array<{
    heading: string;
    paragraphsHtml: string[];
  }>;
};

export const PROJECT_PAGE_COPY: Record<string, ProjectPageCopy> = {
  "code-busters": {
    title: "Code Busters",
    field: "Art Direction · 3D · Game UI",
    client: "Wayground, formerly Quizizz",
    year: "2026",
    role: "Art Direction, Game UI, 3D World Design",
    leadHtml:
      "Code Busters is a competitive classroom Energizer for Wayground. Each student protects a personal vault code while racing to crack a classmate’s vault and steal their coins.",
    introHtml: [
      "It turns the space between quiz rounds into a playful heist: answer accurately, break in faster, and protect your own score before someone else reaches it.",
    ],
    sections: [
      {
        heading: "From a working prototype to a world",
        paragraphsHtml: [
          "The developers had already proved the core mechanic in a basic prototype. My role was to turn it into a complete visual experience—building the art direction, story, 3D world, vault, and handheld hacking device so it felt like a game with its own identity.",
        ],
      },
      {
        heading: "A heist built for kids",
        paragraphsHtml: [
          "I reframed hacking as a <strong>playful heist</strong>. Chunky 3D forms, glowing controls, oversized devices, and saturated light make the world exciting and tactile without the severity of an adult crime story. The child is no longer just answering questions—they have a mission, a target, and a hacker persona.",
        ],
      },
      {
        heading: "Every answer changes the world",
        paragraphsHtml: [
          "A wrong answer triggers warning lights and lasers, separating the player from the vault. A correct answer moves the break-in forward. Feedback does not live only in the interface; the entire environment reacts, turning classroom accuracy into suspense.",
        ],
      },
      {
        heading: "Crack the vault. Take the coins.",
        paragraphsHtml: [
          "Every player protects a personal code while trying to break into someone else’s vault. The promise of stealing coins gives each answer a clear stake: crack faster, defend your score, and climb the class ranking.",
        ],
      },
      {
        heading: "The payoff",
        paragraphsHtml: [
          "When the code finally breaks, the gem emerging from the vault completes the arc: mission accepted, risk survived, reward earned.",
        ],
      },
    ],
  },
  "pondicherry-botanical": {
    title: "Pondicherry Botanical Garden",
    field: "Branding · Illustration · Web Design",
    client: "Self-initiated concept",
    year: "2022",
    role: "Identity, illustration, map, tickets, website",
    leadHtml:
      "<em>A speculative identity for the Pondicherry Botanical Garden as imagined in</em> Life of Pi, <em>where the real garden also houses a fictional zoo.</em>",
    sections: [
      {
        heading: "The garden: a real place, reimagined",
        paragraphsHtml: [
          "The Pondicherry Botanical Garden is a real landmark in Pondicherry, India. In <em>Life of Pi</em>, it becomes home to a fictional zoo and Richard Parker, the Bengal tiger at the centre of the story.",
          "I grew up with the film and wanted to build the identity that this imagined version of the garden might have had.",
        ],
      },
      {
        heading: "The challenge: designing for another era",
        paragraphsHtml: [
          "The story is set decades before the web existed, making a contemporary website feel out of place. I resolved this by treating the site as a digital newspaper, using editorial layouts, hand-drawn imagery, and aged textures to keep it rooted in the period.",
        ],
      },
      {
        heading: "The identity: botanical, animal, handmade",
        paragraphsHtml: [
          "I illustrated the animals, zoo map, and tickets by hand, using organic forms rather than polished vector geometry. The palette draws from the weathered walls and colonial architecture of Pondicherry.",
          "The logo places Richard Parker beneath a tree, bringing the zoo and botanical garden together in a single symbol.",
        ],
      },
      {
        heading: "The approach: fiction treated like a client",
        paragraphsHtml: [
          "Every decision was tested against one question: could this have belonged to the world of the story?",
          "That constraint shaped the typography, colour, illustration, materials, and interface, turning a fictional setting into a complete and coherent identity.",
        ],
      },
    ],
  },
  "stack-results": {
    title: "Stack Results",
    field: "Branding",
    client: "Stack Results, early-stage wellness startup",
    year: "2025",
    role: "Brand Designer, identity, colour system, website, and social",
    leadHtml:
      "Stack Results is a wellness platform where people share the routines, tools, and products that work for them. The identity needed to make personal experience feel credible without taking on the clinical tone of conventional health brands.",
    sections: [
      {
        heading: "The product: routines you can trust",
        paragraphsHtml: [
          "Stack Results is a wellness platform where people share the routines, tools, and products that work for them. The identity needed to make personal experience feel credible without taking on the clinical tone of conventional health brands.",
        ],
      },
      {
        heading: "The mark: individuals forming a system",
        paragraphsHtml: [
          "The mark is built from individual squares coming together to form a circle, representing separate contributions forming a shared body of knowledge. The uneven spacing and rotation keep it human rather than institutional.",
        ],
      },
      {
        heading: "The system: structured, but never rigid",
        paragraphsHtml: [
          "Coral gives the identity energy and visibility, while the softer supporting colours make the brand feel approachable.",
        ],
      },
    ],
  },
  demure: {
    title: "Demure",
    field: "Typeface Design",
    client: "Self-initiated, developed through Practica Program",
    year: "2024",
    role: "Type Designer",
    leadHtml:
      "<em>Demure is a calligraphic display typeface developed over six weeks during Practica Program’s Latin One course, under the guidance of type designers Nicole Dotin and Sol Matas.</em>",
    introHtml: [
      "Demure began at Practica, where I learned type design from the pen up. I started with calligraphy on paper, studying contrast, rhythm, and stroke construction before moving into Glyphs. A typography book I had owned since I was thirteen became a working reference throughout the project.",
      "The lowercase was built from <strong>o</strong> and <strong>n</strong>, which established the proportions, spacing, and movement for the rest of the alphabet. Each character was drawn repeatedly in ink, selected, and rebuilt digitally, keeping the pressure and direction of the pen visible in the final forms.",
      "The result is a display typeface that sits between serif and script. Its structure is restrained, while the calligraphic contrast and expressive details give it a distinct voice at larger sizes.",
    ],
  },
  "custom-type": {
    title: "Custom Typography",
    field: "Typography · Lettering",
    client: "Self-initiated",
    year: "Ongoing",
    role: "Lettering and Type Design",
    leadHtml:
      "Custom Typography is an ongoing collection of lettering experiments across Devanagari and Latin scripts.",
    introHtml: [
      "Each piece begins with a word and develops through explorations of texture, structure, rhythm, and shape. The collection is connected not by one visual style, but by a consistent way of thinking.",
    ],
  },
  "36-days-of-type": {
    title: "36 Days of Type",
    field: "Typography · Lettering",
    client: "Self-initiated",
    year: "2023",
    role: "Design and Illustration",
    leadHtml:
      "<em>For the 2023 edition of 36 Days of Type, I designed a new letter every day, using the challenge as an exercise in speed, experimentation, and visual range.</em>",
    sections: [
      {
        heading: "The constraint: one letter, one day",
        paragraphsHtml: [
          "The brief was simple: make one letter and publish it before midnight.",
          "With no client, style guide, or fixed visual system, each day began from zero. The compressed timeline forced fast decisions and left little room to overwork an idea. The point was not consistency. It was learning how quickly I could find a direction and commit to it.",
        ],
      },
    ],
  },
  illustrations: {
    title: "Illustrations",
    field: "Illustration",
    client: "Self-initiated",
    year: "Ongoing",
    role: "Illustration",
    leadHtml:
      "<em>A collection of self-initiated illustration experiments.</em>",
    introHtml: [
      "These pieces give me room to explore colour, texture, form, and visual character. Each one begins with a different visual idea and develops through experimentation. Together, they show the range and playfulness of my illustration practice.",
    ],
  },
};

export function getProjectPageCopy(slug: string) {
  return PROJECT_PAGE_COPY[slug];
}
