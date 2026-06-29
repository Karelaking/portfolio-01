import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiGithubLine, RiLink, RiArrowRightLine } from "@remixicon/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Alex Gonzalez",
  description: "Explore the collection of web applications, developer tools, and open-source libraries built by Alex Gonzalez.",
};

const projects = [
  {
    title: "Next.js Production Boilerplate",
    description:
      "A complete Next.js starter kit with built-in authentication, database integration (PostgreSQL via Supabase), email workflows, and pre-configured CI/CD deployment scripts.",
    tag: "Fullstack",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "GitHub Actions"],
    github: "https://github.com",
    demo: "https://nextjs.org",
  },
  {
    title: "Rust Dev-Proxy CLI",
    description:
      "A blazing fast Rust-based command-line tool designed to configure local proxy setups and port routing automatically, accelerating environment setups for microservice architectures.",
    tag: "CLI Tool",
    tags: ["Rust", "CLI", "Docker", "Networking"],
    github: "https://github.com",
    demo: null,
  },
  {
    title: "Go API Gateway",
    description:
      "A lightweight, high-performance API gateway built in Go, featuring automated rate-limiting, JWT authentication validation, CORS management, and Prometheus metrics tracking.",
    tag: "Backend",
    tags: ["Go", "Redis", "Prometheus", "Docker", "gRPC"],
    github: "https://github.com",
    demo: "https://go.dev",
  },
  {
    title: "Figma-to-Tailwind Design Engine",
    description:
      "A Node.js build-pipeline package that automatically generates Tailwind CSS design tokens and variables directly from Figma design API specs, keeping code and designs in sync.",
    tag: "Tooling",
    tags: ["Node.js", "TypeScript", "Figma API", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://npmjs.com",
  },
];

const Page = (): React.ReactNode => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Portfolio
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Design and build of my engineering ideas
          </h2>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            Explore a curated selection of developer tools, fullstack systems, and design packages I have engineered from the ground up.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col h-full hover:shadow-md transition-shadow duration-150">
              <CardHeader className="gap-2 p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{project.tag}</Badge>
                </div>
                <CardTitle className="text-xl font-bold text-foreground leading-snug mt-2">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 px-6 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-stretch gap-4 p-6 border-t border-border/40 mt-auto">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-border bg-muted/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground font-medium rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-medium gap-1.5"
                    render={
                      <a href={project.github} target="_blank" rel="noopener noreferrer" />
                    }
                    nativeButton={false}
                  >
                    <RiGithubLine className="size-4" />
                    Source Code
                  </Button>
                  {project.demo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium gap-1.5"
                      render={
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" />
                      }
                      nativeButton={false}
                    >
                      Live Demo
                      <RiLink className="size-3.5" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;