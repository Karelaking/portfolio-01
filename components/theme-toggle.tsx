"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-8 h-16 flex justify-center items-start overflow-visible">
        {/* Placeholder cord & handle */}
        <svg width="24" height="64" className="text-muted-foreground/30">
          <line x1="12" y1="0" x2="12" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="30" width="8" height="18" rx="1" fill="currentColor" />
        </svg>
      </div>
    );
  }

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  const handlePullClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const x = e.clientX;
    const y = e.clientY;

    // 1. Pull down the cord string
    await controls.start({
      y: 18,
      transition: { type: "spring", stiffness: 350, damping: 12 },
    });

    // 2. Trigger the circular transition at the peak of the pull
    const doc = document as any;
    if (!doc.startViewTransition) {
      setTheme(currentTheme === "dark" ? "light" : "dark");
    } else {
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);
      document.documentElement.style.setProperty("--transition-speed", "0.5s");
      document.documentElement.style.setProperty("--transition-blur", "0px");

      const isDark = currentTheme === "dark";
      const targetTheme = isDark ? "to-light" : "to-dark";
      document.documentElement.setAttribute("data-theme-transition", targetTheme);

      try {
        const transition = doc.startViewTransition(() => {
          setTheme(currentTheme === "dark" ? "light" : "dark");
        });
        await transition.finished;
      } catch (err) {
        console.error("View transition failed:", err);
      } finally {
        document.documentElement.removeAttribute("data-theme-transition");
      }
    }

    // 3. Snap back the cord
    await controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 450, damping: 10 },
    });

    setIsTransitioning(false);
  };

  return (
    <div
      onClick={handlePullClick}
      className="relative w-8 h-16 flex justify-center items-start overflow-visible cursor-pointer select-none"
      title={`Pull to switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
      style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
    >
      <motion.div
        animate={controls}
        className="relative flex flex-col items-center"
        style={{ originY: 0 }}
      >
        {/* Hanging string */}
        <svg width="24" height="64" className="overflow-visible">
          {/* The string cord */}
          <line
            x1="12"
            y1="0"
            x2="12"
            y2="30"
            className="stroke-muted-foreground/60 dark:stroke-muted-foreground/40"
            strokeWidth="1.5"
            strokeDasharray="1.5 1.5"
          />

          {/* Cylinder handle (the blind pull) */}
          <g transform="translate(12, 30)">
            {/* Connector ring */}
            <circle
              cx="0"
              cy="0"
              r="2"
              fill="none"
              className="stroke-muted-foreground/80 dark:stroke-muted-foreground/60"
              strokeWidth="1.2"
            />

            {/* Main handle */}
            <rect
              x="-5"
              y="2"
              width="10"
              height="22"
              rx="1"
              className={cn(
                "transition-colors duration-200",
                currentTheme === "dark"
                  ? "fill-neutral-900 stroke-neutral-700"
                  : "fill-neutral-100 stroke-neutral-300"
              )}
              strokeWidth="1"
            />

            {/* Glowing Indicator dot */}
            <circle
              cx="0"
              cy="13"
              r="2"
              className={cn(
                "transition-all duration-300",
                currentTheme === "dark"
                  ? "fill-amber-400"
                  : "fill-neutral-400"
              )}
              style={{
                filter: currentTheme === "dark" ? "drop-shadow(0 0 3px rgba(251, 191, 36, 0.8))" : "none"
              }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

// Utility to handle conditional classes cleanly inside the file
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
