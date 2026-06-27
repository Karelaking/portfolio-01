import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import StatsBlock from "@/components/stats-block";

const Page = (): React.ReactNode => {
  return (
    <section className="flex w-full min-h-svh items-center justify-center bg-background py-16 text-foreground flex-col gap-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative overflow-hidden border border-border">
          <Image
            width={1200}
            height={900}
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="The Acme team collaborating in the office"
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
            Our story
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-balance">
            From a side project to a platform teams trust
          </h2>
          <div className="mt-5 flex flex-col gap-4 text-[15px]/relaxed text-muted-foreground">
            <p>
              We were two engineers tired of rebuilding the same interfaces on
              every project. So we started collecting the patterns that worked
              and shaped them into something anyone could reach for.
            </p>
            <p>
              Seven years later, that collection has grown into a platform used
              by teams in more than forty countries, from solo founders to
              enterprises shipping at scale.
            </p>
          </div>
        </div>
      </div>
      <StatsBlock />
    </section>
  );
};

export default Page;
