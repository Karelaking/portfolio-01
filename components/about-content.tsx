"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import StatsBlock from "@/components/stats-block";
import { StrokeDraw } from "@/components/stroke-draw";
import { JsonLd, getPersonSchema } from "@/components/json-ld";
import {
  RiCheckLine,
  RiCodeBoxLine,
  RiPulseLine,
  RiShieldKeyholeLine,
  RiSparkling2Line,
} from "@remixicon/react";

const defaultTags = ["TypeScript", "Next.js", "Go", "Python", "Rust", "Tailwind CSS", "PostgreSQL", "Docker"];

// Framer motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function AboutContent({
  journeyTitle,
  bioParagraph1,
  bioParagraph2,
  experienceYears,
  skillsList,
}: {
  journeyTitle?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  experienceYears?: number;
  skillsList?: string[];
} = {}) {
  const [terminalText, setTerminalText] = useState("");
  const terminalCommand = "alex-cli deploy --prod";

  // Simulate typing effect on mount or card trigger
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < terminalCommand.length) {
        setTerminalText((prev) => prev + terminalCommand[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 75);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex w-full min-h-svh items-center justify-center bg-background py-16 text-foreground flex-col gap-16">
      <JsonLd schema={getPersonSchema()} />

      {/* --- Section 1: Journey (Scroll Reveal using whileInView) --- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 md:my-16 mb-34"
      >
        <motion.div variants={fadeInUp} className="relative overflow-hidden border border-border w-full h-full rounded-lg aspect-video group shadow-xl">
          {/* Subtle grid layer */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <Image
            fill
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Alex Gonzalez working on software development projects"
            className="aspect-4/3 w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-background/5 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10"
          />
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col">
          <Badge variant="outline" className="mb-4 w-fit border-primary/20 text-primary">
            My Journey
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {journeyTitle || "Crafting elegant software architectures and intuitive interfaces"}
          </h1>
          <div className="mt-5 flex flex-col gap-4 text-[15px]/relaxed text-muted-foreground">
            <p>
              {bioParagraph1 || "I am a software engineer dedicated to building clean, maintainable, and highly performant digital systems. My passion lies in bridging the gap between intricate backend systems and beautiful frontend designs."}
            </p>
            <p>
              {bioParagraph2 || "Over the past seven years, I have collaborated with startups and established teams to design and implement scalable component libraries, automated CI/CD pipelines, and high-performance server architectures."}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* --- Section 2: Development Principles (Pulsing Grid Cards) --- */}
      <div className="mx-auto w-full">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Development Principles
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Clean code, scalable systems
          </h2>
          <p className="mt-3 text-muted-foreground">
            A developer toolkit designed for maintainability, speed, and standard compliance.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3 rounded-xl overflow-hidden"
        >
          {/* Card 1: Lead tile with terminal snippet */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col justify-between gap-8 bg-background p-8 md:col-span-2 md:row-span-2 group/card relative overflow-hidden"
          >
            {/* Glow backdrop on hover */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <span className="flex size-14 items-center justify-center border border-border bg-muted rounded-lg group-hover/card:border-primary/30 transition-colors">
                <StrokeDraw>
                  <RiSparkling2Line className="size-7 text-primary" aria-hidden="true" />
                </StrokeDraw>
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Modern build &amp; automation pipelines
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                Optimized bundling, static site rendering, and automated deployment integrations. I build tooling and pipelines that accelerate team productivity.
              </p>
            </div>

            <div
              className="border border-border bg-muted/40 p-5 font-mono text-xs leading-relaxed rounded-lg group-hover/card:border-primary/20 transition-all duration-300 shadow-inner"
              aria-hidden="true"
            >
              <p className="text-muted-foreground">
                <span className="text-foreground">$</span> {terminalText}
                <span className="animate-pulse font-bold text-primary">|</span>
              </p>
              {terminalText.length === terminalCommand.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 flex flex-col gap-1"
                >
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    <StrokeDraw>
                      <RiCheckLine className="size-3.5 text-emerald-500" />
                    </StrokeDraw>
                    Bundle optimized in 2.4s
                  </p>
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    <StrokeDraw>
                      <RiCheckLine className="size-3.5 text-emerald-500" />
                    </StrokeDraw>
                    Deployed to production at gonzalez.dev
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Card 2: Stat tile */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col justify-between gap-6 bg-background p-8 group/card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="flex size-10 items-center justify-center border border-border bg-muted rounded-lg group-hover/card:border-primary/30 transition-colors">
              <StrokeDraw>
                <RiPulseLine className="size-5 text-primary" aria-hidden="true" />
              </StrokeDraw>
            </span>
            <div>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl tabular-nums text-primary">
                {experienceYears !== undefined ? `${experienceYears}+ Years` : "7+ Years"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Professional software engineering experience
              </p>
            </div>
          </motion.div>

          {/* Card 3: Feature tile */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col gap-4 bg-background p-8 group/card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <span className="flex size-10 items-center justify-center border border-border bg-muted rounded-lg group-hover/card:border-primary/30 transition-colors">
              <StrokeDraw>
                <RiShieldKeyholeLine className="size-5 text-primary" aria-hidden="true" />
              </StrokeDraw>
            </span>
            <div>
              <h3 className="text-base font-semibold">Secure &amp; standard compliant</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Implementing secure authentication protocols, CORS limits, TLS compliance, and strict input validation.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Full-width tile with tech tags */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="flex flex-col gap-5 bg-background p-8 md:col-span-3 group/card relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div>
              <span className="flex size-10 items-center justify-center border border-border bg-muted rounded-lg group-hover/card:border-primary/30 transition-colors">
                <StrokeDraw>
                  <RiCodeBoxLine className="size-5 text-primary" aria-hidden="true" />
                </StrokeDraw>
              </span>
              <h3 className="mt-4 text-base font-semibold">
                An engineered developer experience
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Using strongly-typed structures, comprehensive documentation, clear component hierarchy, and automated linting.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 z-10">
              {(skillsList || defaultTags).map((tag) => (
                <span
                  key={tag}
                  className="border border-border/80 bg-muted/40 px-2.5 py-1 font-mono text-xs font-semibold text-muted-foreground rounded-full hover:border-primary/45 hover:text-primary transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Section 3: Scale Stats Block --- */}
      <StatsBlock />
    </section>
  );
}
