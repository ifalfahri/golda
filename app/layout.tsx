"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ReactLenis root>
        <body
          className={clsx(
            outfit.className,
            "antialiased bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden leading-none"
          )}
        >
          <Navbar />
          {children}
        </body>
      </ReactLenis>
    </html>
  );
}
