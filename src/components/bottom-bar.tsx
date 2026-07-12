import NavOvalLink from "@/components/nav-oval-link";

// Fixed bottom bar from the Framer home page: email link + "Reserve" oval
// over a black fade so it stays readable above any section.
export default function BottomBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-gradient-to-b from-transparent to-black/70 px-[60px] pt-24 pb-9">
      <div className="pointer-events-auto flex items-center justify-between gap-2.5">
        <a
          href="mailto:dpatankar21@gmail.com"
          className="font-mono text-base text-white no-underline"
        >
          dpatankar21@gmail.com →
        </a>
        <NavOvalLink href="mailto:dpatankar21@gmail.com" label="Reserve" />
      </div>
    </div>
  );
}
