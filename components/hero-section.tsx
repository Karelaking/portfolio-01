"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ZoomHollowText } from "@/components/zoom-hollow";
import { StrokeDraw } from "@/components/stroke-draw";
import {
  RiUserLine,
  RiDownloadLine,
  RiReactjsLine,
  RiNextjsLine,
  RiTailwindCssLine,
} from "@remixicon/react";

export function HeroSection() {
  const greetings = [
    "HOLA",
    "BONJOUR",
    "CIAO",
    "नमस्ते",
    "こんにちは",
    "你好",
    "مَرْحَبًا",
    "ПРИВЕТ",
    "ΓΕΙΑ",
  ];

  return (
    <section className="relative w-full min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-20">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft backlighting radial glows */}
        <motion.div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ambient grid design (CSS grid background) */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
        {/* Left Side: Typography and Call to Action */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-6 max-w-2xl">
          {/* Animated greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center gap-2 border border-border bg-muted/40 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono tracking-wider text-muted-foreground uppercase rounded-none"
          >
            <motion.span
              animate={{ rotate: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", repeatDelay: 1 }}
              className="inline-block origin-bottom-right"
            >
              👋
            </motion.span>
            PORTFOLIO SITE
          </motion.div>

          {/* Main Headline with multi-language ZoomHollowText */}
          <div className="w-full flex flex-col space-y-1">
            <div className="h-[70px] sm:h-[80px] lg:h-[100px] flex items-center overflow-visible">
              <ZoomHollowText
                words={greetings}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-primary uppercase"
                strokeWidth={1.5}
                interval={2000}
                duration={0.7}
              />
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
            >
              I&apos;M ALEX GONZALEZ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
              className="text-xs sm:text-base lg:text-lg font-medium text-primary tracking-wide font-mono mt-1"
            >
              FULL-STACK DEVELOPER & SOFTWARE ENGINEER
            </motion.p>
          </div>

          {/* Intro Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="text-sm sm:text-base lg:text-lg leading-relaxed text-muted-foreground max-w-xl"
          >
            Specialized in crafting premium web applications, custom interactive UI animations, 
            and scalable backend architectures. I translate complex logic into clean, 
            performant, and stunning user experiences.
          </motion.p>

          {/* Action Buttons with Micro-animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4"
          >
            <Button
              className="group h-11 sm:h-12 px-5 sm:px-6 text-sm font-semibold rounded-none relative overflow-hidden transition-all duration-300 gap-2"
              render={<Link href="/about" />}
            >
              <RiUserLine className="size-4 sm:size-4 group-hover:scale-110 transition-transform" />
              About Me
            </Button>

            <Button
              variant="outline"
              className="group h-11 sm:h-12 px-5 sm:px-6 text-sm font-semibold border-border bg-background hover:bg-muted/10 rounded-none relative overflow-hidden transition-all duration-300 gap-2"
              render={<a href="/resume.pdf" download />}
            >
              <StrokeDraw>
                <RiDownloadLine className="size-4 sm:size-4" />
              </StrokeDraw>
              Download CV
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Animated Portrait and Tech Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[320px] sm:h-[380px] lg:h-[460px] w-full mt-4 lg:mt-0">
          
          {/* Clean Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4, rotate: 1 }}
            className="relative size-[230px] sm:size-[260px] lg:size-[310px] bg-card border border-border shadow-2xl p-2 sm:p-3 z-10 rounded-none group"
          >
            <div className="relative w-full h-full overflow-hidden bg-muted">
              <Image
                src="/developer_portrait.png"
                alt="Alex Gonzalez Portrait"
                fill
                sizes="(max-width: 640px) 230px, (max-width: 1024px) 260px, 310px"
                priority
                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Staggered Static Technology Badges Overlapping the Corners */}
          {/* Badge 1: Next.js */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            whileHover={{ y: -3 }}
            className="absolute top-4 sm:top-10 left-4 sm:left-12 z-20 flex items-center gap-1 sm:gap-1.5 bg-background border border-border px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm hover:shadow-md rounded-none select-none transition-shadow duration-300"
          >
            <StrokeDraw>
              <RiNextjsLine className="size-3.5 sm:size-4" />
            </StrokeDraw>
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-tight">NEXT.JS</span>
          </motion.div>

          {/* Badge 2: React */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            whileHover={{ y: -3 }}
            className="absolute bottom-4 sm:bottom-12 left-2 sm:left-8 z-20 flex items-center gap-1 sm:gap-1.5 bg-background border border-border px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm hover:shadow-md rounded-none select-none transition-shadow duration-300"
          >
            <StrokeDraw>
              <RiReactjsLine className="size-3.5 sm:size-4 text-[#61DAFB]" />
            </StrokeDraw>
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-tight text-[#61DAFB]">REACT</span>
          </motion.div>

          {/* Badge 3: Tailwind */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
            whileHover={{ y: -3 }}
            className="absolute top-10 sm:top-20 right-2 sm:right-6 z-20 flex items-center gap-1 sm:gap-1.5 bg-background border border-border px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm hover:shadow-md rounded-none select-none transition-shadow duration-300"
          >
            <StrokeDraw>
              <RiTailwindCssLine className="size-3.5 sm:size-4 text-[#38BDF8]" />
            </StrokeDraw>
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-tight text-[#38BDF8]">TAILWIND</span>
          </motion.div>

          {/* Badge 4: TypeScript */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
            whileHover={{ y: -3 }}
            className="absolute bottom-8 sm:bottom-16 right-4 sm:right-10 z-20 flex items-center gap-1 sm:gap-1.5 bg-background border border-border px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm hover:shadow-md rounded-none select-none transition-shadow duration-300"
          >
            <span className="text-[9px] sm:text-[10px] font-black text-[#3178C6] border border-[#3178C6]/30 px-1 py-0.5 rounded-none font-mono leading-none">TS</span>
            <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-tight text-[#3178C6]">TYPESCRIPT</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
