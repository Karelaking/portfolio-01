"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RiBriefcaseLine, RiCalendarLine, RiMapPinLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface TimelineJob {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

interface ScrollRevealTimelineProps extends React.ComponentProps<"div"> {
  jobs: TimelineJob[];
}

const defaultTitleClass = "text-base font-bold text-foreground leading-snug";
const imageClass =
  "absolute top-0 right-0 ml-auto w-auto h-full object-cover rounded-none transition-opacity duration-300 border border-border";

const getBarPercentageHeight = (scrollProgress: number, thresholdStart: number, thresholdEnd: number) => {
  if (scrollProgress < thresholdStart) {
    return 0;
  }
  if (scrollProgress > thresholdEnd) {
    return 100;
  }
  return ((scrollProgress - thresholdStart) / (thresholdEnd - thresholdStart)) * 100;
};

export function ScrollRevealTimeline({ jobs, className, ...props }: ScrollRevealTimelineProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  // 24vh is the height of a single card slot on desktop
  const slotHeightVal = 24;

  return (
    <div className={cn("bg-background w-full", className)} ref={containerRef} {...props}>
      <div className="max-w-[95vw] sm:max-w-6xl mx-auto">
        <div className="flex w-full mx-auto relative z-20">
          {/* Sticky wrapper only active on desktop (lg:) */}
          <div className="w-full lg:sticky lg:top-0 lg:flex lg:flex-col lg:items-start lg:justify-center lg:h-[100vh] lg:overflow-hidden py-6 lg:py-0">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full h-full items-stretch lg:items-center">
              
              {/* Left Side: Scrollable Timeline Window (only hides overflow on desktop) */}
              <div className="lg:!w-[55vw] !w-full lg:h-[72vh] lg:overflow-hidden relative flex flex-col justify-center">
                <div
                  className="flex flex-col lg:gap-0 gap-6 w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: typeof window !== "undefined" && window.innerWidth >= 1024
                      ? `translateY(${-scrollProgress * (jobs.length - 1) * slotHeightVal}vh)`
                      : "none",
                  }}
                >
                  {/* Top Padding Spacer on Desktop */}
                  <div className="hidden lg:block h-[24vh] shrink-0" />

                  {jobs.map((job, idx) => {
                    const stepSize = 1 / jobs.length;
                    const thresholdStart = idx * stepSize;
                    const thresholdEnd = (idx + 1) * stepSize;
                    const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd);
                    const isActive = barHeightPercentage > 0;

                    return (
                      <div
                        key={job.company + idx}
                        className="flex gap-4 md:gap-6 transition-opacity duration-300 opacity-100 lg:opacity-40 data-[active=true]:lg:opacity-100 lg:h-[24vh] lg:items-center shrink-0"
                        data-active={isActive}
                      >
                        {/* Left Column (Period) - Desktop */}
                        <div className="w-28 text-right shrink-0 hidden md:block pt-1">
                          <span className="text-xs font-mono font-semibold text-primary block leading-none">
                            {job.period}
                          </span>
                          <span className="text-[10px] text-muted-foreground mt-1 block">
                            {job.location}
                          </span>
                        </div>

                        {/* Middle Line & Node */}
                        <div className="relative flex flex-col items-center shrink-0 w-6 h-full">
                          <div className="absolute top-0 bottom-0 w-px bg-border" />
                          <div
                            className="absolute top-0 w-px bg-foreground transition-all hidden lg:block"
                            style={{
                              height: `${barHeightPercentage}%`,
                            }}
                          />
                          <div className={cn(
                            "relative z-10 mt-6 lg:mt-0 size-3.5 border border-border bg-background transition-colors rounded-none",
                            isActive && "lg:border-foreground lg:bg-primary",
                            "bg-muted-foreground/20" // default fall-back style on mobile
                          )} />
                        </div>

                        {/* Right Column (Card) */}
                        <div className="flex-1">
                          <Card className="border border-border bg-card shadow-none hover:bg-muted/10 transition-colors duration-150 rounded-none max-h-[22vh] overflow-y-auto lg:overflow-hidden">
                            <CardContent className="p-4 sm:p-5">
                              <div className="flex flex-col gap-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                  <h4 className={defaultTitleClass}>
                                    {job.role}
                                  </h4>
                                  <Badge variant="secondary" className="w-fit md:hidden flex items-center gap-1 rounded-none font-mono text-[9px] py-0 px-1.5">
                                    <RiCalendarLine className="size-3" />
                                    {job.period}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                                  <span className="flex items-center gap-1 font-semibold text-primary">
                                    <RiBriefcaseLine className="size-3" />
                                    {job.company}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <RiMapPinLine className="size-3" />
                                    {job.location}
                                  </span>
                                </div>
                              </div>

                              <p className="mt-3 text-[11px]/relaxed text-muted-foreground line-clamp-3 lg:line-clamp-2">
                                {job.description}
                              </p>

                              <div className="mt-4 flex flex-wrap gap-1">
                                {job.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="border border-border bg-muted/40 px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground font-medium rounded-none"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    );
                  })}

                  {/* Bottom Padding Spacer on Desktop */}
                  <div className="hidden lg:block h-[24vh] shrink-0" />
                </div>
              </div>

              {/* Right Side: Sticky Images (Desktop Only) */}
              <div className="hidden lg:flex flex-col justify-center items-center !w-[45vw] relative h-[70vh]">
                {jobs.map((job, idx) => {
                  const stepSize = 1 / jobs.length;
                  const thresholdStart = idx * stepSize;
                  const isActive = scrollProgress > thresholdStart - 0.05;

                  return (
                    <Image
                      key={job.company + idx + "-img"}
                      width={job.image.width}
                      height={job.image.height}
                      src={job.image.url}
                      alt={job.image.alt}
                      className={cn(imageClass, isActive ? "opacity-100 z-10" : "opacity-0 z-0")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* Scroll Spacer only visible/active on desktop */}
          <div className="hidden lg:block h-[250vh]" />
        </div>
      </div>
    </div>
  );
}
