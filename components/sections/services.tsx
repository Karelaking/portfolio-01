import {
  RiSparkling2Line,
  RiCpuLine,
  RiLayout5Line,
  RiCommandLine,
} from "@remixicon/react";

export default function ServicesSection() {
  return (
    <div className="mx-auto w-full max-w-5xl mt-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-block border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          My Services
        </span>
        <h2 className="mt-5 text-4xl capitalize font-bold tracking-tight">
          How I can help you
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A handpicked set of professional services focused on delivering rich, premium web applications.
        </p>
      </div>

      <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
        {/* Main tile: Frontend */}
        <div className="flex flex-col justify-between gap-8 bg-background p-8 md:col-span-2 md:row-span-2">
          <div>
            <span className="flex size-14 items-center justify-center border border-border bg-muted">
              <RiSparkling2Line className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              Frontend Engineering
            </h3>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Crafting interactive, accessible (WCAG), and search-engine optimized (SEO) user interfaces using React, Next.js, and TypeScript.
            </p>
          </div>
          <div
            className="border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed"
            aria-hidden="true"
          >
            <p className="text-muted-foreground">
              <span className="text-foreground">const</span> app = {"{"}
            </p>
            <p className="pl-4 text-muted-foreground">framework: <span className="text-foreground">&quot;Next.js&quot;</span>,</p>
            <p className="pl-4 text-muted-foreground">lighthouseScore: <span className="text-foreground">100</span>,</p>
            <p className="pl-4 text-muted-foreground">accessibility: <span className="text-foreground">&quot;A++&quot;</span></p>
            <p className="text-muted-foreground">{"}"};</p>
          </div>
        </div>

        {/* Backend Tile */}
        <div className="flex flex-col justify-between gap-6 bg-background p-8">
          <div>
            <span className="flex size-10 items-center justify-center border border-border bg-muted">
              <RiCpuLine className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold">Backend Architecture</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Designing Go and Node.js microservices, Postgres database schemas, and REST/gRPC gateways.
            </p>
          </div>
        </div>

        {/* UI/UX Tile */}
        <div className="flex flex-col gap-4 bg-background p-8">
          <div>
            <span className="flex size-10 items-center justify-center border border-border bg-muted">
              <RiLayout5Line className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold">UI/UX & Design Systems</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Translating Figma screens into clean CSS code and robust Tailwind-based shared component libraries.
            </p>
          </div>
        </div>

        {/* DevOps & Pipelines */}
        <div className="flex flex-col gap-5 bg-background p-8 md:col-span-3">
          <div>
            <span className="flex size-10 items-center justify-center border border-border bg-muted">
              <RiCommandLine className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-base font-semibold">
              DevOps & Automation Pipelines
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Configuring Docker files, multi-stage compilation, GitHub Actions deployment triggers, and cloud pipelines for seamless, stable delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Docker", "CI/CD", "AWS", "Vercel", "Kubernetes"].map((tool) => (
              <span
                key={tool}
                className="border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs font-medium text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
