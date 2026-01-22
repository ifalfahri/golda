import CoffeeScroll from "@/components/CoffeeScroll";
import BentoGrid from "@/components/BentoGrid";
import Testimonial from "@/components/Testimonial";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import AboutReveal from "@/components/AboutReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golda Coffee - Animasi 3D Scroll Pake AI",
  description: "Fansite Golda Coffee dengan animasi 3D scroll. Dari tiktok @aldofiondhy",
};

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
