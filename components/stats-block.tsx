"use client";

import React, { useEffect, useRef } from "react";
import { RiArrowUpLine } from "@remixicon/react";
import { motion, useMotionValue, useTransform, useInView, animate } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";

const stats = [
  { value: "12k+", label: "Active customers", delta: "+18%" },
  { value: "99.9%", label: "Uptime guarantee", delta: "+0.1%" },
  { value: "4.9/5", label: "Average rating", delta: "+0.3" },
  { value: "150+", label: "Countries served", delta: "+12" },
];

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Parse numeric part and suffix
  // e.g. "12k+" -> 12, "k+"
  // e.g. "99.9%" -> 99.9, "%"
  // e.g. "4.9/5" -> 4.9, "/5"
  const numericMatch = value.match(/[\d.]+/);
  const targetNum = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = numericMatch ? value.replace(numericMatch[0], "") : "";

  const motionValue = useMotionValue(0);
  const hasDecimals = value.includes(".");

  const displayValue = useTransform(motionValue, (latest) => {
    const formatted = hasDecimals 
      ? latest.toFixed(1) 
      : Math.round(latest).toString();
    return `${formatted}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, targetNum, {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1], // Custom premium easeOutExpo
      });
      return () => controls.stop();
    }
  }, [inView, targetNum, motionValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function StatsBlock() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="flex min-h-full w-full items-center justify-center bg-background text-foreground py-16">
      <div className="mx-auto w-full" ref={containerRef}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted at scale
          </h2>
          <p className="mt-3 text-muted-foreground">
            The numbers product teams rely on every day.
          </p>
        </div>

        <Separator className="mt-12" />
        <motion.dl
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-px bg-border md:grid-cols-4"
        >
          {stats.map(({ value, label, delta }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col items-center bg-background py-8 text-center"
            >
              <dt className="text-4xl font-bold tracking-tight sm:text-5xl tabular-nums">
                <Counter value={value} />
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{label}</dd>
              <Badge variant="secondary" className="mt-2 flex items-center gap-1">
                <StrokeDraw>
                  <RiArrowUpLine className="size-3.5 text-emerald-500" aria-hidden="true" />
                </StrokeDraw>
                {delta}
              </Badge>
            </motion.div>
          ))}
        </motion.dl>
        <Separator />
      </div>
    </section>
  );
}
