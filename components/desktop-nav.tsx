"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Route } from "next";

type NavLink = {
  label: string;
  href: Route;
};

export default function DesktopNav({ navLinks }: { navLinks: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="ml-auto hidden items-center gap-1.5 md:flex relative">
      {navLinks.map((link) => {
        // Handle exact matching for home "/", and prefix matching for sub-routes
        const isActive = link.href === "/" 
          ? pathname === "/" 
          : pathname.startsWith(link.href as string);

        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "relative px-3 py-1.5 text-sm font-medium transition-colors duration-300 rounded-lg select-none",
              isActive 
                ? "text-foreground font-semibold" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="activeNavBackground"
                className="absolute inset-0 bg-muted/80 dark:bg-muted/40 rounded-lg -z-10"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
