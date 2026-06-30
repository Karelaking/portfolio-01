"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { StrokeDraw } from "@/components/stroke-draw";
import {
  RiBriefcaseLine,
  RiMapPinLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";
import type { TimelineJob } from "@/components/scroll-reveal-timeline";

interface ExperienceTimelineProps {
  jobs: TimelineJob[];
}

export default function ExperienceTimeline({ jobs }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.2,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="w-full relative py-4" ref={containerRef}>
      {/* Grid background behind the timeline */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-10 w-full max-w-5xl h-full -z-20 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
        }}
      />

      {/* --- DESKTOP TIMELINE (md breakpoint and up) --- */}
      <div className="hidden md:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative flex flex-col gap-24 max-w-5xl mx-auto px-4"
        >
          {/* Center connector line for desktop */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-border/60 -translate-x-1/2 pointer-events-none" />

          {/* Scroll Line Tracer for desktop */}
          <motion.div
            className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-primary origin-top -translate-x-1/2 pointer-events-none shadow-[0_0_8px_var(--primary)]"
            style={{ scaleY }}
          />

          {jobs.map((job, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={job.company + idx}
                variants={itemVariants}
                className={cn(
                  "relative grid grid-cols-[1fr_80px_1fr] items-start gap-0",
                  isEven ? "text-right" : "text-left",
                )}
              >
                {/* Left Column (Job Info for Even, description/image for Odd) */}
                <div
                  className={cn(
                    "flex flex-col gap-3",
                    isEven ? "col-start-1" : "col-start-3 order-last",
                  )}
                >
                  <div className="flex flex-col gap-1.5">
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-2",
                        isEven ? "justify-end" : "justify-start",
                      )}
                    >
                      <Badge
                        variant="outline"
                        className="font-mono text-xs border-primary/30 text-primary"
                      >
                        {job.period}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <StrokeDraw>
                          <RiMapPinLine className="size-3.5" />
                        </StrokeDraw>
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {job.role}
                    </h3>
                    <h4 className="text-lg font-semibold text-primary flex items-center gap-1.5 justify-start md:justify-items-start Even:md:justify-end">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5",
                          isEven ? "flex-row-reverse" : "flex-row",
                        )}
                      >
                        <StrokeDraw>
                          <RiBriefcaseLine className="size-4" />
                        </StrokeDraw>
                        {job.company}
                      </span>
                    </h4>
                  </div>

                  {/* Grayscale hover-to-color Image */}
                  <div
                    className={cn(
                      "relative w-full max-w-md mt-4 overflow-hidden border border-border/80 bg-muted/40 aspect-video rounded-xl group/img",
                      isEven ? "ml-auto" : "mr-auto",
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 z-0 opacity-20 group-hover/img:opacity-40 transition-opacity duration-500 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, var(--border) 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <Image
                      fill
                      loading="eager"
                      src={job.image.url}
                      alt={job.image.alt}
                      className="object-cover z-10 transition-all duration-700 grayscale group-hover/img:grayscale-0 group-hover/img:scale-105"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent z-20 pointer-events-none" />
                  </div>
                </div>

                {/* Middle node connector */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 flex items-center justify-center z-20">
                  <div className="relative group/node flex items-center justify-center">
                    <div className="absolute size-8 rounded-full bg-primary/20 animate-ping group-hover/node:bg-primary/35 transition-all duration-300" />
                    <div className="relative size-4 border-2 border-primary bg-background rounded-full transition-transform duration-300 group-hover/node:scale-125 z-10 flex items-center justify-center">
                      <div className="size-1.5 bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Right Column (Description and details for Even, Job Info for Odd) */}
                <div
                  className={cn(
                    "flex flex-col gap-4 px-8",
                    isEven ? "col-start-3" : "col-start-1 text-right",
                  )}
                >
                  <div className="bg-card/50 backdrop-blur-xs border border-border/80 p-5 rounded-2xl hover:border-primary/40 transition-all duration-300">
                    <p className="text-sm/relaxed text-muted-foreground">
                      {job.description}
                    </p>

                    <div
                      className={cn(
                        "mt-5 flex flex-wrap gap-1.5",
                        isEven ? "justify-start" : "justify-end",
                      )}
                    >
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground tracking-wide font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- MOBILE TIMELINE (below md breakpoint) --- */}
      <div className="block md:hidden px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative flex flex-col gap-12 pl-8"
        >
          {/* Left connector line for mobile */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border/60 pointer-events-none" />

          {/* Scroll Line Tracer for mobile */}
          <motion.div
            className="absolute left-4 top-2 bottom-2 w-0.5 bg-primary origin-top pointer-events-none shadow-[0_0_8px_var(--primary)]"
            style={{ scaleY }}
          />

          {jobs.map((job, idx) => (
            <motion.div
              key={job.company + idx + "-mobile"}
              variants={itemVariants}
              className="relative flex flex-col gap-4"
            >
              {/* Node connector on the line */}
              <div className="absolute -left-4 top-2 -translate-x-1/2 flex items-center justify-center z-20">
                <div className="relative flex items-center justify-center">
                  <div className="absolute size-6 rounded-full bg-primary/20 animate-ping" />
                  <div className="relative size-3.5 border-2 border-primary bg-background rounded-full z-10 flex items-center justify-center">
                    <div className="size-1.5 bg-primary rounded-full" />
                  </div>
                </div>
              </div>

              {/* Mobile Card */}
              <div className="bg-card/50 backdrop-blur-xs border border-border/80 p-5 rounded-xl hover:border-primary/40 transition-all duration-300 flex flex-col gap-4">
                {/* Header info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="font-mono text-[10px] border-primary/30 text-primary"
                    >
                      {job.period}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mt-1">
                    {job.role}
                  </h3>
                  <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5 mt-0.5">
                    <StrokeDraw>
                      <RiBriefcaseLine className="size-3.5" />
                    </StrokeDraw>
                    {job.company}
                  </h4>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                    <StrokeDraw>
                      <RiMapPinLine className="size-3.5" />
                    </StrokeDraw>
                    {job.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs/relaxed text-muted-foreground">
                  {job.description}
                </p>

                {/* Job image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/60 mt-1">
                  <Image
                    fill
                    loading="eager"
                    src={job.image.url}
                    alt={job.image.alt}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[9px] text-muted-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
