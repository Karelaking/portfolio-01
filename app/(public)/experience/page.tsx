import React from "react";
import ExperienceTimeline from "@/components/experience-timeline";
import { getTimelineJobs } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career milestones, professional software engineering achievements, and technical systems built at Stripe, Linear, and Vercel.",
};

const Page = async (): Promise<React.ReactNode> => {
  const timelineJobs = await getTimelineJobs();

  return (
    <section className="w-full bg-background text-foreground py-16 overflow-hidden">
      {/* Intro Header */}
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 mb-16 text-center">
        <Badge variant="outline" className="mb-4">
          Experience
        </Badge>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
          Professional Journey
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
          Explore my key engineering achievements and the professional systems I built at Stripe, Linear, and Vercel.
        </p>
      </div>

      {/* Unified Custom Experience Timeline Component */}
      <div className="w-full">
        <ExperienceTimeline jobs={timelineJobs} />
      </div>
    </section>
  );
};

export default Page;