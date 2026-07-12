import HoverDrawNavItem from "@/components/site/hover-draw-nav-item";

// Site nav from the Framer canvas redesign: short bio on the left, three
// oval-outlined links on the right (Geist Mono, white).
// mix-blend-difference keeps it legible over light sections scrolling beneath.
const LINKS = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/#about" },
  { label: "CONTACT", href: "/#contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 [font-family:var(--font-geist-mono),monospace] mix-blend-difference">
      <div className="flex flex-col items-center gap-6 px-8 pt-8 pb-4 md:flex-row md:items-center md:justify-between md:gap-2.5">
        <p className="max-w-[815px] text-center text-sm leading-normal tracking-[-0.02em] text-white md:text-left">
          Darshita Patankar is a visual designer crafting{" "}
          <span className="md:block">
            distinctive brands, digital experiences and illustrations.
          </span>
        </p>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center justify-center gap-5"
        >
          {LINKS.map((link) => (
            <HoverDrawNavItem
              key={link.label}
              label={link.label}
              href={link.href}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}
