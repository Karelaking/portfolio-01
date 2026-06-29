import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RiBriefcaseLine, RiCalendarLine, RiMapPinLine } from "@remixicon/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience - Alex Gonzalez",
  description: "Work history and professional experience of Alex Gonzalez, Software Engineer and Web Developer.",
};

const jobs = [
  {
    role: "Senior Software Engineer",
    company: "Stripe",
    period: "2024 - Present",
    location: "Berlin, Germany (Remote)",
    description:
      "Led the migration of billing pipelines to a serverless gRPC architecture, reducing batch transaction latency by 42%. Collaborated with design and product teams to launch new checkout portals using Next.js and Tailwind CSS.",
    tags: ["Go", "TypeScript", "React", "gRPC", "PostgreSQL", "AWS"],
  },
  {
    role: "Full Stack Developer",
    company: "Linear",
    period: "2022 - 2024",
    location: "Berlin, Germany (Hybrid)",
    description:
      "Designed and implemented real-time offline sync protocols for high-speed client interfaces. Built highly reusable components for the internal design system, focusing on keyboard navigation and accessibility standards (WCAG).",
    tags: ["React", "TypeScript", "Node.js", "GraphQL", "WebSockets", "CSS Modules"],
  },
  {
    role: "Frontend Engineer",
    company: "Vercel",
    period: "2020 - 2022",
    location: "Remote",
    description:
      "Contributed to Next.js core features, focusing on image optimization and middleware rendering paths. Supported enterprise clients in optimizing codebases to achieve perfect Lighthouse Core Web Vital scores.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Webpack", "Edge Functions"],
  },
  {
    role: "Software Engineering Intern",
    company: "Red Hat",
    period: "2019 - 2020",
    location: "Munich, Germany",
    description:
      "Maintained and automated container deployments using Ansible and Kubernetes operators. Configured Prometheus monitoring dashboards and custom alerts for microservice health metrics.",
    tags: ["Python", "Go", "Kubernetes", "Docker", "Ansible", "Prometheus"],
  },
];

const Page = (): React.ReactNode => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-background py-20 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Resume
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl capitalize">
            Professional Work Experience
          </h2>
          <p className="mt-3 text-base text-muted-foreground px-4 sm:px-24">
            A history of building high-performance web systems, contributing to open-source software, and collaborating with top-tier product teams.
          </p>
        </div>

        <div className="relative border-l border-border pl-6 ml-4 sm:ml-8 flex flex-col gap-10">
          {jobs.map((job, idx) => (
            <div key={job.company + idx} className="relative group">
              {/* timeline point dot */}
              <div className="absolute -left-[31px] top-1.5 size-4 rounded-full border border-border bg-background transition-colors group-hover:bg-primary" />

              <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-snug">
                        {job.role}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-semibold text-primary">
                          <RiBriefcaseLine className="size-3.5" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <RiMapPinLine className="size-3.5" />
                          {job.location}
                        </span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="w-fit flex items-center gap-1">
                      <RiCalendarLine className="size-3" />
                      {job.period}
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground font-medium rounded-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;