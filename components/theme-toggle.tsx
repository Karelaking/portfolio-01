"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggleCircular } from "@/components/theme-toggle-circular";
import { RiSunLine, RiMoonLine } from "@remixicon/react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-input/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 outline-none"
        aria-label="Toggle theme"
      >
        <RiSunLine className="size-4" />
      </button>
    );
  }

  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeToggleCircular theme={currentTheme} onToggle={toggleTheme}>
      <button
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-input/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 outline-none cursor-pointer"
        aria-label="Toggle theme"
      >
        {currentTheme === "dark" ? (
          <RiSunLine className="size-4" />
        ) : (
          <RiMoonLine className="size-4" />
        )}
      </button>
    </ThemeToggleCircular>
  );
}
