import React from "react";
import { RiArrowDownLine } from "@remixicon/react";
import { ScrollRevealTimeline, TimelineJob } from "@/components/scroll-reveal-timeline";
import RoadmapBlock from "@/components/roadmap-block";

const timelineJobs: TimelineJob[] = [
  {
    role: "Senior Software Engineer",
    company: "Stripe",
    period: "2024 - Present",
    location: "Berlin, Germany (Remote)",
    description:
      "Led the migration of billing pipelines to a serverless gRPC architecture, reducing batch transaction latency by 42%. Collaborated with design and product teams to launch new checkout portals using Next.js and Tailwind CSS.",
    tags: ["Go", "TypeScript", "React", "gRPC", "PostgreSQL", "AWS"],
    image: {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Stripe billing analytics dashboard interface",
    },
  },
  {
    role: "Full Stack Developer",
    company: "Linear",
    period: "2022 - 2024",
    location: "Berlin, Germany (Hybrid)",
    description:
      "Designed and implemented real-time offline sync protocols for high-speed client interfaces. Built highly reusable components for the internal design system, focusing on keyboard navigation and accessibility standards (WCAG).",
    tags: ["React", "TypeScript", "Node.js", "GraphQL", "WebSockets", "CSS Modules"],
    image: {
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Developer workspace showing code editor and Linear configurations",
    },
  },
  {
    role: "Frontend Engineer",
    company: "Vercel",
    period: "2020 - 2022",
    location: "Remote",
    description:
      "Contributed to Next.js core features, focusing on image optimization and middleware rendering paths. Supported enterprise clients in optimizing codebases to achieve perfect Lighthouse Core Web Vital scores.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Webpack", "Edge Functions"],
    image: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      width: 600,
      height: 450,
      alt: "Rendering performance chart analytics and Lighthouse checks",
    },
  },
];

const Page = (): React.ReactNode => {
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
        <RoadmapBlock />
      </div>
    </section>
  );
};

export default Page;