"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ShowcaseCarousel() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={scrollRef} className="h-[300vh] bg-neutral-950 relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-16">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="shrink-0 w-[400px] h-[600px] bg-neutral-900 rounded-full overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              {/* In real app, put bottle variety images here */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-2xl font-bold text-white">Variety 0{i}</h3>
              </div>
            </div>
          ))}
          {/* Duplicate for infinite feel implies more logic, keeping simple horizontal scroll for now */}
        </motion.div>
      </div>
    </section>
  );
}
