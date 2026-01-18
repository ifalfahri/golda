"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import clsx from "clsx";
import { useRef, useEffect } from "react";

// Reusable Reveal Component
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

export function BentoGrid() {
  return (
    <section className="bg-neutral-950 py-48 px-4 md:px-8 relative z-20 rounded-t-3xl border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-16 text-center text-4xl font-bold text-white md:text-8xl tracking-tight leading-none">
            THE <span className="text-amber-500">GOLD STANDARD</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 h-auto md:h-[600px]">
          {/* Large Card */}
          <Reveal className="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl bg-neutral-900 md:col-span-2 md:row-span-2 text-white h-[400px] md:h-auto">
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <h3 className="text-3xl font-bold mb-2">
                Best Dolce <br />
                Latte ever
              </h3>
              <p className="text-neutral-400">
                Slow-steeped to extract deep, chocolatey notes without the
                bitterness.
              </p>
            </div>
            <img
              src="/bento-1.png"
              alt="Cold Brew"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Reveal>

          {/* Small Card 1 */}
          <Reveal
            delay={0.1}
            className="group relative col-span-1 overflow-hidden rounded-3xl bg-neutral-900 p-8 flex flex-col justify-end text-white h-[300px] md:h-auto"
          >
            <h3 className="text-2xl font-bold mb-2 relative z-10">
              Single Origin
            </h3>
            <p className="text-sm text-neutral-400 relative z-10">
              Sourced from the highlands of Brazil.
            </p>
            <img
              src="/bento-2.png"
              alt="Beans"
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-neutral-900/40 z-0" />
          </Reveal>

          {/* Small Card 2 */}
          <Reveal
            delay={0.2}
            className="group relative col-span-1 overflow-hidden rounded-3xl bg-amber-600 p-8 flex flex-col justify-center items-center text-center h-[300px] md:h-auto"
          >
            <h3 className="text-6xl font-black text-black mb-2 tracking-tighter">
              0g
            </h3>
            <p className="text-black/80 font-bold uppercase tracking-widest text-xs">
              Added Sugar
            </p>
          </Reveal>

          {/* Wide Card */}
          <Reveal
            delay={0.3}
            className="group relative col-span-1 md:col-span-2 overflow-hidden rounded-3xl bg-neutral-900 p-8 flex items-end text-white h-[300px] md:h-auto"
          >
            <div className="relative z-10 max-w-sm">
              <h3 className="text-2xl font-bold mb-2">Belgian Milk</h3>
              <p className="text-neutral-400">
                Made with premium Belgian milk for a rich and creamy taste.
              </p>
            </div>
            <img
              src="/bento-3.png"
              alt="Nitro Pour"
              className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-neutral-900 to-transparent z-0" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ShowcaseCarousel() {
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

export function Testimonial() {
  return (
    <section className="bg-neutral-900 relative z-1 py-32 px-4 md:px-8 text-white overflow-hidden">
      {/* Background pattern or subtle texture */}
      <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          className="text-amber-500 animate-spin-slow"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle cx="50" cy="50" r="30" strokeWidth="1" />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl text-center relative z-10">
        <Reveal>
          <div className="mb-8 flex justify-center space-x-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl md:text-6xl font-bold leading-tight mb-8">
            "Saya ke indomaret, duduk di kursinya, dan minum{" "}
            <span className="italic font-serif text-amber-500">kopi ini. </span>
            Masalah hidup seketika hilang."
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg font-medium text-neutral-400 uppercase tracking-widest">
            — Edi, Pliturer
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Count Up Component
function CountUp({
  to,
  duration = 2,
  className,
}: {
  to: string;
  duration?: number;
  className?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-10%" });
  // Parse numeric part
  const numericValue = parseFloat(to.replace(/[^0-9.]/g, ""));
  const suffix = to.replace(/[0-9.]/g, "");

  // Animate
  useEffect(() => {
    if (!inView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, numericValue, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate(value) {
        node.textContent = Math.floor(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, numericValue, duration, suffix]);

  return (
    <span ref={nodeRef} className={className}>
      0{suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-neutral-950 relative z-1 py-24 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Caffeine", value: "200mg" },
          { label: "Calories", value: "15" },
          { label: "Sadness", value: "0%" },
          { label: "Satisfaction", value: "100%" },
        ].map((stat, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div>
              <div className="text-4xl md:text-8xl font-black text-white mb-2 tracking-tighter">
                <CountUp to={stat.value} />
              </div>
              <div className="text-sm font-bold text-amber-600 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 py-24 sticky bottom-0 px-4 md:px-8 border-t border-white/5">
      <Reveal>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-[15vw] font-black leading-none text-neutral-900 select-none tracking-tighter">
              GOLDA
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-12 text-neutral-400 mt-8 md:mt-0 font-medium">
              <a href="#" className="hover:text-amber-500 transition-colors">
                INSTAGRAM
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                TWITTER
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                CONTACT
              </a>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
