"use client";

import Reveal from "@/components/Reveal";

export default function BentoGrid() {
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
              src="/bento-1.webp"
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
              src="/bento-2.webp"
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
              src="/bento-3.webp"
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
