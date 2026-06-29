"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiGithubLine, RiLink } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  title: string;
  description: string;
  tag: string;
  tags: string[];
  github: string;
  demo: string | null;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

interface ScrollRevealProjectsProps extends React.ComponentProps<"div"> {
  projects: ProjectItem[];
}

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

export function ScrollRevealProjects({ projects, className, ...props }: ScrollRevealProjectsProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [mobileActiveIdx, setMobileActiveIdx] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileScroll = React.useCallback(() => {
    const cardElements = document.querySelectorAll("[data-project-card]");
    if (cardElements.length === 0) return;

    const viewportCenter = window.innerHeight / 2;
    let closestIdx = 0;
    let minDistance = Infinity;

    cardElements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setMobileActiveIdx(closestIdx);
  }, []);

  React.useEffect(() => {
    if (isDesktop) return;

    handleMobileScroll();

    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    window.addEventListener("resize", handleMobileScroll);
    return () => {
      window.removeEventListener("scroll", handleMobileScroll);
      window.removeEventListener("resize", handleMobileScroll);
    };
  }, [isDesktop, handleMobileScroll]);

  // 28vh is the height of a single card slot on desktop
  const slotHeightVal = 28;

  const desktopActiveIdx = Math.min(
    Math.max(Math.round(scrollProgress * (projects.length - 1)), 0),
    projects.length - 1
  );
  const activeIdx = isDesktop ? desktopActiveIdx : mobileActiveIdx;

  return (
    <div className={cn("bg-background w-full", className)} ref={containerRef} {...props}>
      <div className="max-w-[95vw] sm:max-w-6xl mx-auto">
        <div className="flex w-full mx-auto relative z-20">
          {/* Sticky wrapper only active on desktop (lg:) */}
          <div className="w-full lg:sticky lg:top-0 lg:flex lg:flex-col lg:items-start lg:justify-center lg:h-screen lg:overflow-hidden py-6 lg:py-0">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full h-full items-stretch lg:items-center">

              {/* Left Side: Scrollable Projects Window */}
              <div
                className="lg:w-[55vw]! w-full! lg:h-[84vh] lg:overflow-hidden h-auto overflow-visible relative flex flex-col lg:justify-start justify-center py-4 lg:py-0"
              >
                <div
                  className="flex flex-col gap-0 w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: isDesktop
                      ? `translateY(${-scrollProgress * Math.max(projects.length - 3, 0) * slotHeightVal}vh)`
                      : "none",
                  }}
                >
                  {projects.map((project, idx) => {
                    const stepSize = 1 / projects.length;
                    const thresholdStart = idx * stepSize;
                    const thresholdEnd = (idx + 1) * stepSize;
                    const barHeightPercentage = getBarPercentageHeight(scrollProgress, thresholdStart, thresholdEnd);
                    const isActive = idx === activeIdx;

                    return (
                      <div
                        key={project.title + idx}
                        data-project-card
                        className="flex gap-4 md:gap-6 transition-all duration-300 opacity-40 data-[active=true]:opacity-100 lg:h-[28vh] h-auto lg:items-center shrink-0 w-full py-4 lg:py-0"
                        data-active={isActive}
                      >
                        {/* Middle Line & Node */}
                        <div className="relative flex flex-col items-center shrink-0 w-6 h-full">
                          <div className="absolute top-0 bottom-0 w-px bg-border" />
                          <div
                            className="absolute top-0 w-px bg-foreground transition-all"
                            style={{
                              height: `${barHeightPercentage}%`,
                            }}
                          />
                          <div className={cn(
                            "relative z-10 size-3.5 border border-border bg-background transition-colors rounded-none",
                            isActive && "border-foreground bg-primary",
                            "bg-muted-foreground/20"
                          )} />
                        </div>

                        {/* Right Column (Project Card) */}
                        <div className="flex-1">
                          <Card className="border border-border bg-card shadow-none hover:bg-muted/10 transition-colors duration-150 rounded-none max-h-none lg:max-h-[26vh] overflow-visible lg:overflow-hidden">
                            <CardHeader className="gap-1 p-3 sm:p-4 pb-1">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="rounded-none text-[9px] py-0 px-1.5">{project.tag}</Badge>
                              </div>
                              <CardTitle className="text-sm font-bold text-foreground leading-snug mt-1">
                                {project.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 sm:px-4 pb-2">
                              <p className="text-[11px]/relaxed text-muted-foreground line-clamp-none lg:line-clamp-2">
                                {project.description}
                              </p>
                            </CardContent>
                            <CardFooter className="flex flex-col items-stretch gap-2 p-3 sm:p-4 border-t border-border/40">
                              <div className="flex flex-wrap gap-1">
                                {project.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="border border-border bg-muted/40 px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground font-medium rounded-none"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between gap-3 pt-0.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[10px] h-7 px-2 font-medium gap-1 rounded-none"
                                  render={
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" />
                                  }
                                  nativeButton={false}
                                >
                                  <RiGithubLine className="size-3.5" />
                                  Source
                                </Button>
                                {project.demo && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[10px] h-7 px-2 font-medium gap-1 rounded-none"
                                    render={
                                      <a href={project.demo} target="_blank" rel="noopener noreferrer" />
                                    }
                                    nativeButton={false}
                                  >
                                    Demo
                                    <RiLink className="size-3" />
                                  </Button>
                                )}
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Sticky Images (Desktop Only) */}
              <div className="hidden lg:flex flex-col justify-center items-center w-[45vw]! relative h-[84vh]">
                {projects.map((project, idx) => {
                  const isActive = idx === activeIdx;

                  return (
                    <Image
                      key={project.title + idx + "-img"}
                      width={project.image.width}
                      height={project.image.height}
                      src={project.image.url}
                      alt={project.image.alt}
                      className={cn(imageClass, isActive ? "opacity-100 z-10" : "opacity-0 z-0")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* Scroll Spacer only visible/active on desktop */}
          <div className="hidden lg:block h-[200vh]" />
        </div>
      </div>
    </div>
  );
}
