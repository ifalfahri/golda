"use client";

import { motion, AnimatePresence } from "motion/react";

export default function NotesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-70 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-80 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-neutral-900 p-8 text-center text-white shadow-2xl border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h3 className="text-2xl font-bold mb-6 text-amber-500">
              Project Notes
            </h3>

            <div className="space-y-6 text-neutral-300">
              <p>
                Made by{" "}
                <a
                  href="https://ifalf.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-500 underline decoration-amber-500/50 underline-offset-4 transition-colors"
                >
                  Aldo Ifal Fahri
                </a>{" "}
                as a learning purpose only.
              </p>

              <div className="p-4 bg-neutral-950 rounded-xl border border-white/5">
                <p className="text-sm text-neutral-500 mb-2 uppercase tracking-widest font-bold">
                  Repository
                </p>
                <a
                  href="https://github.com/ifalfahri/golda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-amber-500 transition-colors break-all"
                >
                  github.com/ifalfahri/golda
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
