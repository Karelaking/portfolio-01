import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "@remixicon/react";

export default function CtaSection() {
  return (
    <div className="w-full max-w-5xl mt-24 border border-border bg-muted/30 px-6 py-12 text-center sm:px-12 sm:py-16">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Let&apos;s build something exceptional together.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
        Looking for a freelance engineer, a contract developer, or a new teammate? Let&apos;s discuss how I can add value to your project.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          render={<a href="/contact" />}
          nativeButton={false}
          className="w-full sm:w-auto"
        >
          Get In Touch
          <RiArrowRightLine data-icon="inline-end" aria-hidden="true" />
        </Button>
        <Button
          variant="secondary"
          render={<a href="/projects" />}
          nativeButton={false}
          className="w-full sm:w-auto"
        >
          View Projects
        </Button>
      </div>
    </div>
  );
}
