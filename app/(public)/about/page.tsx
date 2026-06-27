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

const tags = ["TypeScript", "Go", "Python", "Rust", "CLI", "REST"];

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
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Why teams switch
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to ship
            </h2>
            <p className="mt-3 text-muted-foreground">
              A focused toolkit that scales from your first commit to your
              millionth request.
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
                  Intelligent build pipeline
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
                  Caching, parallelism, and preview environments work out of the
                  box. Push a branch and get a live URL in seconds.
                </p>
              </div>

              <div
                className="border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed"
                aria-hidden="true"
              >
                <p className="text-muted-foreground">
                  <span className="text-foreground">$</span> acme deploy
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                  <RiCheckLine className="size-3.5 text-foreground" />
                  Built in 8.2s
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                  <RiCheckLine className="size-3.5 text-foreground" />
                  Live at acme.app
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
                  99.99%
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Uptime over the last 90 days
                </p>
              </div>
            </div>

            {/* Feature tile */}
            <div className="flex flex-col gap-4 bg-background p-8">
              <span className="flex size-10 items-center justify-center border border-border bg-muted">
                <RiShieldKeyholeLine className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold">Secure by default</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Automatic TLS, secrets, and access controls.
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
                  A developer experience you will not fight
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Typed SDKs, a fast CLI, and clear logs mean less time reading
                  docs and more time building.
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
