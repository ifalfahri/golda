import CoffeeScroll from "@/components/CoffeeScroll";
import {
  BentoGrid,
  Testimonial,
  Stats,
  Footer,
} from "@/components/LandingSections";
import AboutReveal from "@/components/AboutReveal";

export default function Home() {
  return (
    <main className="bg-neutral-950 min-h-screen">
      <CoffeeScroll />
      <div className="relative z-10 bg-neutral-950 -mt-[100vh]">
        <AboutReveal />
        <BentoGrid />
        {/* <ShowcaseCarousel />  Disabling carousel for now to focus on vertical flow or if needed enable it */}
        <Testimonial />
        <Stats />
        <Footer />
      </div>
    </main>
  );
}
