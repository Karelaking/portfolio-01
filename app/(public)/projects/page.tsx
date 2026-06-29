"use client";

import React from "react";
import { RiArrowDownLine } from "@remixicon/react";
import { ScrollRevealProjects, ProjectItem } from "@/components/scroll-reveal-projects";

const projects: ProjectItem[] = [
  {
    title: "Next.js Production Boilerplate",
    description:
      "A complete Next.js starter kit with built-in authentication, database integration (PostgreSQL via Supabase), email workflows, and pre-configured CI/CD deployment scripts.",
    tag: "Fullstack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "GitHub Actions"],
    github: "https://github.com",
    demo: "https://nextjs.org",
    image: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Next.js dashboard web application interface",
    },
  },
  {
    title: "Rust Dev-Proxy CLI",
    description:
      "A blazing fast Rust-based command-line tool designed to configure local proxy setups and port routing automatically, accelerating environment setups for microservice architectures.",
    tag: "CLI Tool",
    tags: ["Rust", "CLI", "Docker", "Networking"],
    github: "https://github.com",
    demo: null,
    image: {
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Developer workspace showing code IDE and CLI outputs",
    },
  },
  {
    title: "Go API Gateway",
    description:
      "A lightweight, high-performance API gateway built in Go, featuring automated rate-limiting, JWT authentication validation, CORS management, and Prometheus metrics tracking.",
    tag: "Backend",
    tags: ["Go", "Redis", "Prometheus", "Docker", "gRPC"],
    github: "https://github.com",
    demo: "https://go.dev",
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Go API gateway server analytics logs",
    },
  },
  {
    title: "Figma-to-Tailwind Design Engine",
    description:
      "A Node.js build-pipeline package that automatically generates Tailwind CSS design tokens and variables directly from Figma design API specs, keeping code and designs in sync.",
    tag: "Tooling",
    tags: ["Node.js", "TypeScript", "Figma API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://npmjs.com",
    image: {
      url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Figma canvas dashboard displaying design components",
    },
  },
];

const Page = (): React.ReactNode => {
  return (
    <section className="w-full bg-background text-foreground py-16">
      {/* Intro Header */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 mb-12 text-center">
        <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Portfolio
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
          Interactive Design & Build Work
        </h2>
        <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
          Scroll down to explore developer tools, fullstack systems, and design packages I have engineered from the ground up.
        </p>
      </div>

      {/* Scroll Reveal Projects Grid */}
      <ScrollRevealProjects projects={projects} />
    </section>
  );
};

export default Page;