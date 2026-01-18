"use client";

import Reveal from "@/components/Reveal";

export default function Testimonial() {
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
