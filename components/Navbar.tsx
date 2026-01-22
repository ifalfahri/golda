"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import NotesModal from "./NotesModal";

const menuItems = [
  { title: "HOME", href: "#" },
  { title: "SHOP", href: "#" },
  { title: "WHOLESALE", href: "#" },
  { title: "LOCATIONS", href: "#" },
  { title: "STORY", href: "#" },
];

const socialLinks = ["Instagram", "Twitter", "Notes"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  // Lock scroll when menu is open
  // We use simple document.body style manipulation
  if (typeof document !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  return (
    <>
      <NotesModal isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="fixed top-8 right-8 z-60 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-neutral-900/50 backdrop-blur-md transition-colors hover:bg-neutral-800"
      >
        <span
          className={clsx(
            "block h-0.5 w-6 bg-white transition-transform duration-300",
            isOpen ? "translate-y-2 rotate-45" : "",
          )}
        />
        <span
          className={clsx(
            "block h-0.5 w-6 bg-white transition-opacity duration-300",
            isOpen ? "opacity-0" : "",
          )}
        />
        <span
          className={clsx(
            "block h-0.5 w-6 bg-white transition-transform duration-300",
            isOpen ? "-translate-y-2 -rotate-45" : "",
          )}
        />
      </button>

      {/* Logo (Fixed top left) */}
      <div className="fixed top-8 left-8 z-60 mix-blend-difference">
        <h1 className="text-2xl font-black tracking-tighter text-white">
          GOLDA.
        </h1>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-neutral-950 p-8 pt-32 md:flex-row md:p-32"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="text-6xl font-black tracking-tighter text-white transition-colors hover:text-amber-500 md:text-8xl"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-8 md:justify-end md:text-right">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
                  Socials
                </h3>
                <div className="flex flex-col gap-2 md:items-end">
                  {socialLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => {
                        if (link === "Notes") {
                          setIsNotesOpen(true);
                        }
                      }}
                      className="text-xl font-medium text-white hover:text-amber-500 transition-colors text-right"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
                  Contact
                </h3>
                <p className="text-xl font-medium text-white">
                  hello@goldacoffee.com
                </p>
                <p className="text-xl font-medium text-white">
                  +1 (555) 000-0000
                </p>
              </motion.div>
            </div>

            {/* Background Texture/Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-amber-900/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
