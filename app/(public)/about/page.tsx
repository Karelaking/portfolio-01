import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StatsBlock from "@/components/stats-block";
import {
  RiCheckLine,
  RiCodeBoxLine,
  RiPulseLine,
  RiShieldKeyholeLine,
  RiSparkling2Line,
} from "@remixicon/react";
import { Metadata } from "next";
import { JsonLd, getPersonSchema } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Alex Gonzalez, his journey as a software engineer, core design principles, and building modern, high-performance web systems.",
};

const tags = ["TypeScript", "Next.js", "Go", "Python", "Rust", "Tailwind CSS", "PostgreSQL", "Docker"];

const Page = (): React.ReactNode => {
  return (
    <section className="flex w-full min-h-svh items-center justify-center bg-background py-16 text-foreground flex-col gap-16">
      <JsonLd schema={getPersonSchema()} />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 md:my-16 mb-34">
        <div className="relative overflow-hidden border border-border w-full h-full rounded-lg aspect-video">
          <Image
            fill
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Alex Gonzalez working on software development projects"
            className="aspect-4/3 w-full object-cover grayscale"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/50 via-background/5 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/10"
          />
        </div>

        <div className="flex flex-col">
          <Badge variant="outline" className="mb-4 w-fit">
            My Journey
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Crafting elegant software architectures and intuitive interfaces
          </h1>
          <div className="mt-5 flex flex-col gap-4 text-[15px]/relaxed text-muted-foreground">
            <p>
              I am a software engineer dedicated to building clean, maintainable, and highly performant digital systems. 
              My passion lies in bridging the gap between intricate backend systems and beautiful frontend designs.
            </p>
            <p>
              Over the past seven years, I have collaborated with startups and established teams to design and implement 
              scalable component libraries, automated CI/CD pipelines, and high-performance server architectures.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Development Principles
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Clean code, scalable systems
          </h2>
          <p className="mt-3 text-muted-foreground">
            A developer toolkit designed for maintainability, speed, and standard compliance.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
          {/* Lead tile: feature + terminal snippet */}
          <div className="flex flex-col justify-between gap-8 bg-background p-8 md:col-span-2 md:row-span-2">
            <div>
              <span className="flex size-14 items-center justify-center border border-border bg-muted">
                <RiSparkling2Line className="size-7" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Modern build & automation pipelines
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                Optimized bundling, static site rendering, and automated deployment integrations. I build tooling and pipelines that accelerate team productivity.
              </p>
            </div>

            <div
              className="border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed"
              aria-hidden="true"
            >
              <p className="text-muted-foreground">
                <span className="text-foreground">$</span> alex-cli deploy --prod
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <RiCheckLine className="size-3.5 text-foreground" />
                Bundle optimized in 2.4s
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                <RiCheckLine className="size-3.5 text-foreground" />
                Deployed to production at gonzalez.dev
              </p>
            </div>
          </div>

          {/* Stat tile */}
          <div className="flex flex-col justify-between gap-6 bg-background p-8">
            <span className="flex size-10 items-center justify-center border border-border bg-muted">
              <RiPulseLine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-4xl font-bold tracking-tight tabular-nums">
                7+ Years
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Professional software engineering experience
              </p>
            </div>
          </div>

          {/* Feature tile */}
          <div className="flex flex-col gap-4 bg-background p-8">
            <span className="flex size-10 items-center justify-center border border-border bg-muted">
              <RiShieldKeyholeLine className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-semibold">Secure & standard compliant</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Implementing secure authentication protocols, CORS limits, TLS compliance, and strict input validation.
              </p>
            </div>
          </div>

          {/* Full-width tile: feature + tech tags */}
          <div className="flex flex-col gap-5 bg-background p-8 md:col-span-3">
            <div>
              <span className="flex size-10 items-center justify-center border border-border bg-muted">
                <RiCodeBoxLine className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold">
                An engineered developer experience
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Using strongly-typed structures, comprehensive documentation, clear component hierarchy, and automated linting.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <StatsBlock />
    </section>
  );
};

export default Page;
