"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

function ScrollRevealText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"],
  });

  const characters = children.split("");

  return (
    <p ref={element} className={clsx("flex flex-wrap", className)}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;
        // Map range of specific character to opacity
        // But simple approach: useTransform on index logic is complex per char.
        // Alternative: Just stagger reveal based on view?
        // Request said "based on user scroll progress turn to white progressively".
        // So we need opacity mapped to scrollYProgress.
        return (
          <Char key={i} range={[start, end]} progress={scrollYProgress}>
            {char}
          </Char>
        );
      })}
    </p>
  );
}

function Char({
  children,
  range,
  progress,
}: {
  children: string;
  range: [number, number];
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-200">
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutReveal() {
  return (
    <section className="min-h-screen relative z-1 bg-neutral-950 flex items-center justify-center py-24 px-4">
      <div className="max-w-4xl text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-500 font-medium mb-8 uppercase tracking-widest"
        >
          Our Story
        </motion.p>
        <div className="space-y-16">
          <Reveal>
            <h3 className="text-4xl md:text-7xl font-bold leading-tight text-white">
              We believe coffee is more than just fuel. It is a{" "}
              <span className="text-amber-500">ritual</span> of patience.
            </h3>
          </Reveal>
          <ScrollRevealText className="text-3xl md:text-6xl font-medium leading-tight text-white">
            Every bottle is brewed for twenty-four hours in small batches,
            ensuring a flavor profile that is bold, smooth, and naturally sweet.
          </ScrollRevealText>
        </div>
      </div>
    </section>
  );
}
