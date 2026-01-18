"use client";

import Reveal from "@/components/Reveal";
import { useRef, useEffect } from "react";
import { useInView } from "motion/react";
import { animate } from "motion";

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
      onUpdate(value: number) {
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

export default function Stats() {
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
