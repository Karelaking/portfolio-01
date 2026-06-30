import React from "react";
import { ScrollRevealTimeline } from "@/components/scroll-reveal-timeline";
import RoadmapBlock from "@/components/roadmap-block";
import { getTimelineJobs, getRoadmapColumns } from "@/lib/data";

const Page = async (): Promise<React.ReactNode> => {
  const timelineJobs = await getTimelineJobs();
  const roadmapColumns = await getRoadmapColumns();

  return (
    <section className="w-full bg-background text-foreground py-16">
      {/* Intro Header */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 mb-12 text-center">
        <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Resume
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
          Interactive Work Experience
        </h2>
        <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
          Scroll down to explore my key engineering achievements and the professional projects I built at Stripe, Linear, and Vercel.
        </p>
      </div>

      {/* Unified Scroll Reveal Timeline Component */}
      <ScrollRevealTimeline jobs={timelineJobs} />

      {/* Skills Roadmap Block */}
      <div className="mt-20">
        <RoadmapBlock columns={roadmapColumns} />
      </div>
    </section>
  );
};

export default Page;