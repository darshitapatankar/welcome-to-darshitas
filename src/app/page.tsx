import BottomBar from "@/components/bottom-bar";
import Hero from "@/components/hero";
import WorkGrid from "@/components/site/work-grid";

export default function Home() {
  // Nav and Footer render from the root layout; keep these wrappers free of
  // z-index/positioning so Hero's blend modes reach the Unicorn canvas.
  return (
    <main className="bg-black font-sans" data-theme="dark" data-home-page>
      <div id="hero">
        <Hero />
      </div>
      <WorkGrid />
      <BottomBar />
    </main>
  );
}
