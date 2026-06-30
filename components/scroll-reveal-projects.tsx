"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiGithubLine, RiLink } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { StrokeDraw } from "@/components/stroke-draw";

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

  // Height of a single card slot on desktop
  const slotHeightVal = 30;

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
                      ? `translateY(${-scrollProgress * Math.max(projects.length - 2.5, 0) * slotHeightVal}vh)`
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
                        className="flex gap-4 md:gap-6 transition-all duration-350 opacity-40 data-[active=true]:opacity-100 lg:h-[30vh] h-auto lg:items-center shrink-0 w-full py-4 lg:py-3.5"
                        data-active={isActive}
                      >
                        {/* Middle Line & Node */}
                        <div className="relative flex flex-col items-center shrink-0 w-6 h-full">
                          <div className="absolute top-0 bottom-0 w-px bg-border/60" />
                          <div
                            className="absolute top-0 w-px bg-primary transition-all shadow-[0_0_8px_var(--primary)]"
                            style={{
                              height: `${barHeightPercentage}%`,
                            }}
                          />
                          <div className={cn(
                            "relative z-10 size-3 border border-border bg-background transition-all duration-300 rounded-full flex items-center justify-center",
                            isActive ? "border-primary scale-110 shadow-[0_0_8px_var(--primary)]" : ""
                          )}>
                            <div className={cn(
                              "size-1 rounded-full transition-colors",
                              isActive ? "bg-primary" : "bg-muted-foreground/35"
                            )} />
                          </div>
                        </div>

                        {/* Right Column (Refined Project Card) */}
                        <div className="flex-1">
                          <Card className={cn(
                            "border border-border/80 bg-card/45 backdrop-blur-xs shadow-xs transition-all duration-300 rounded-xl overflow-hidden hover:scale-[1.01] hover:shadow-sm relative group/card",
                            isActive ? "border-primary/45 bg-card/85 shadow-xs" : "hover:border-border-hover"
                          )}>
                            {/* Decorative Glow Overlay */}
                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <CardHeader className="gap-0.5 p-3 sm:p-3.5 pb-0.5">
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="rounded-full text-[7.5px] font-mono tracking-wide py-0 px-2 border border-primary/10 text-primary bg-primary/5">
                                  {project.tag}
                                </Badge>
                              </div>
                              <CardTitle className="text-xs sm:text-sm font-bold text-foreground leading-snug mt-0.5 group-hover/card:text-primary transition-colors">
                                {project.title}
                              </CardTitle>
                            </CardHeader>
                            
                            <CardContent className="px-3 sm:px-3.5 pb-1.5">
                              <p className="text-[10px]/relaxed text-muted-foreground line-clamp-none lg:line-clamp-2">
                                {project.description}
                              </p>
                            </CardContent>

                            <CardFooter className="flex flex-col items-stretch gap-2 p-2.5 sm:p-3 border-t border-border/30 bg-muted/15">
                              {/* Tech Badges */}
                              <div className="flex flex-wrap gap-1">
                                {project.tags.map((t) => (
                                  <span
                                    key={t}
                                    className="border border-border bg-background px-1.5 py-0.1 font-mono text-[7px] text-muted-foreground font-semibold rounded-full hover:border-primary/30 hover:text-primary transition-colors duration-200"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                              {/* Source/Demo Buttons */}
                              <div className="flex items-center justify-between gap-3 pt-0.5">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-[8.5px] h-6 px-2.5 font-semibold gap-1 rounded-lg hover:bg-muted group/btn"
                                  render={
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" />
                                  }
                                  nativeButton={false}
                                >
                                  <StrokeDraw>
                                    <RiGithubLine className="size-2.5 group-hover/btn:rotate-12 transition-transform duration-200" />
                                  </StrokeDraw>
                                  Source Code
                                </Button>
                                {project.demo && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[8.5px] h-6 px-2.5 font-semibold gap-1 rounded-lg border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 group/btn"
                                    render={
                                      <a href={project.demo} target="_blank" rel="noopener noreferrer" />
                                    }
                                    nativeButton={false}
                                  >
                                    Live Demo
                                    <StrokeDraw>
                                      <RiLink className="size-2.5 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                                    </StrokeDraw>
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

              {/* Right Side: Sticky Images (Desktop Only) with premium floating frame */}
              <div className="hidden lg:flex flex-col justify-center items-center w-[45vw]! relative h-[84vh] px-8">
                {/* Floating dot-grid background for depth */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-12 translate-y-12 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative w-full aspect-9/16 rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-muted/30">
                  {projects.map((project, idx) => {
                    const isActive = idx === activeIdx;

                    return (
                      <div
                        key={project.title + idx + "-img-container"}
                        className={cn(
                          "absolute inset-0 transition-all duration-700 ease-in-out",
                          isActive
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-95 z-0",
                        )}
                      >
                        <Image
                          fill
                          src={project.image.url}
                          alt={project.image.alt}
                          className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                          sizes="450px"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/30 to-transparent pointer-events-none" />
                      </div>
                    );
                  })}
                </div>
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
