import React from "react";
import { RiArrowDownLine } from "@remixicon/react";
import { ScrollRevealProjects } from "@/components/scroll-reveal-projects";
import { getProjects } from "@/lib/data";

const Page = async (): Promise<React.ReactNode> => {
  const projects = await getProjects();

  return (
    <section className="w-full bg-background text-foreground py-16">
      {/* Intro Header */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 mb-12 text-center">
        <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Portfolio
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
          Selected Open-Source Work
        </h2>
        <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
          Scroll down to explore some of the most impactful open-source projects, tools, and systems I have designed and built.
        </p>
      </div>

      {/* Unified Scroll Reveal Projects Component */}
      <ScrollRevealProjects projects={projects} />
      
      {/* Scroll indicator for mobile (optional) */}
      <div className="flex justify-center mt-12 md:hidden">
         <RiArrowDownLine className="size-6 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
};

export default Page;