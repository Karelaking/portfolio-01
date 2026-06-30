import { getLogos } from "@/lib/data";

export default async function TechStackSection() {
  const logos = await getLogos();

  return (
    <div className="mx-auto w-full max-w-5xl mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          My Tech Stack
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          Building modern, high-performance web applications
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
        {logos.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex items-center justify-center gap-2.5 bg-background px-4 py-8 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon className="size-6 shrink-0" aria-hidden="true" />
            <span className="text-base font-semibold tracking-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
