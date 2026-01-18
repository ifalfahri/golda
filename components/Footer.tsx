"use client";

import Reveal from "@/components/Reveal";

export default function Footer() {
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
