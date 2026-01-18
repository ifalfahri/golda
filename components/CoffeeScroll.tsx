"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 240;

export default function CoffeeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      const promises = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          const frameIndex = i.toString().padStart(3, "0");
          img.src = `/sequence/ezgif-frame-${frameIndex}.jpg`;
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            loadedImages[i - 1] = img; // Store in correct index
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image ${i}`);
            // Resolve anyway to prevent blocking
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index - 1]; // arrays are 0-indexed
    if (!img) return;

    // Responsive cover scale (Fill Screen)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Cover Logic:
    // If canvas is wider than image (relative to aspect), we fit width and crop height?
    // Wait, cover means:
    // If canvasAspect > imgAspect (Canvas is wider), we need to match Width, and Height depends on aspect.
    // drawWidth = canvasWidth. drawHeight = canvasWidth / imgAspect.
    // If drawHeight < canvasHeight (which it will be if canvas is VERY wide), then we have gaps.
    // So if canvas is wider than image aspect, we must scale by Width to fill width, but does height cover?
    // imgAspect = w/h.
    // If canvasAspect > imgAspect, then canvas is relatively wider.
    // Example: Image 1:1. Canvas 2:1.
    // If we match width, drawHeight = 2/1 = 2. Canvas Height 1. So it covers. Correct.

    if (canvasAspect > imgAspect) {
      // Canvas is wider/flatter than image
      // Match Width
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller/thinner than from image
      // Match Height
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Optional: Draw background color if needed to fill gaps?
    // Assuming body background handles it, or we draw bg here.
    // ctx.fillStyle = "#000"; // Fallback
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const safeIndex = Math.min(Math.max(Math.floor(latest), 1), FRAME_COUNT);
    if (!isLoading && images.length > 0) {
      requestAnimationFrame(() => renderFrame(safeIndex));
    }
  });

  // Initial render after loading
  useEffect(() => {
    if (!isLoading && images.length > 0) {
      renderFrame(1);
    }
  }, [isLoading, images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render current frame
        const current = currentIndex.get();
        const safeIndex = Math.min(
          Math.max(Math.floor(current), 1),
          FRAME_COUNT
        );
        if (!isLoading && images.length > 0) {
          renderFrame(safeIndex);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoading, images, currentIndex]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-neutral-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          // Set width/height via JS, but styles ensure full size
        />

        {/* Loading Overlay */}
        <div
          className={clsx(
            "pointer-events-none absolute inset-0 flex items-end pb-20 justify-center bg-black transition-opacity duration-500",
            isLoading ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-center font-sans">
            <p className="mb-2 text-sm text-neutral-400">
              Brewing Experience...
            </p>
            <div className="h-1 w-32 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-full bg-amber-600 transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Text Overlays - Managed here or parent? 
            Prompt said "Overlay text sections that fade in/out".
            We can put them here linked to scroll progress.
        */}
        <ScrollOverlays progress={scrollYProgress} />
      </div>
    </div>
  );
}

function ScrollOverlays({ progress }: { progress: any }) {
  // Opacity transforms for different sections
  // 0-25%: Title
  // 25-50%: Left Slogan
  // 50-75%: Right Slogan
  // 75-100%: CTA

  const opacityTitle = useTransform(progress, [0, 0.1, 0.2], [1, 1, 0]);
  const yTitle = useTransform(progress, [0, 0.2], [0, -50]);

  const opacitySlogan1 = useTransform(
    progress,
    [0.15, 0.25, 0.35, 0.45],
    [0, 1, 1, 0]
  );
  const ySlogan1 = useTransform(progress, [0.15, 0.45], [50, -50]);

  const opacitySlogan2 = useTransform(
    progress,
    [0.45, 0.55, 0.65, 0.75],
    [0, 1, 1, 0]
  );
  const ySlogan2 = useTransform(progress, [0.45, 0.75], [50, -50]);

  const opacityCTA = useTransform(progress, [0.75, 0.85, 1], [0, 1, 1]);
  const scaleCTA = useTransform(progress, [0.75, 1], [0.9, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center">
      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ opacity: opacityTitle, y: yTitle }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-white md:text-9xl">
            GOLDA
          </h1>
          <p className="mt-4 text-xl font-light tracking-widest text-amber-500 uppercase">
            Premium Cold Brew
          </p>
        </motion.div>
      </div>

      {/* Slogan Left */}
      <div className="absolute inset-0 flex items-center justify-start px-8 md:px-24">
        <motion.div
          style={{ opacity: opacitySlogan1, y: ySlogan1 }}
          className="max-w-xl text-left"
        >
          <h2 className="text-4xl font-semibold leading-tighter text-neutral-200 md:text-6xl">
            Most <br />
            <span className="text-amber-500">Affordable</span>
          </h2>
        </motion.div>
      </div>

      {/* Slogan Right */}
      <div className="absolute inset-0 flex items-center justify-end px-8 md:px-24">
        <motion.div
          style={{ opacity: opacitySlogan2, y: ySlogan2 }}
          className="max-w-xl text-right"
        >
          <h2 className="text-4xl font-semibold leading-tighter text-neutral-200 md:text-6xl">
            Tastes like <br />
            <span className="text-amber-500">Pure Gold</span>
          </h2>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ opacity: opacityCTA, scale: scaleCTA }}
          className="text-center pointer-events-auto"
        >
          <h2 className="mb-8 text-5xl font-bold tracking-tighter text-white">
            Ready to Sip?
          </h2>
          <button className="group relative overflow-hidden rounded-full bg-amber-600 px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10">ORDER NOW</span>
            <div className="absolute inset-0 z-0 scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100 origin-left" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
