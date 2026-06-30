import { RiMailSendLine, RiMapPin2Line, RiPhoneLine, RiEarthLine } from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import ContactForm from "@/components/contact-form";

const Page = (): React.ReactNode => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center bg-muted/30 py-12 sm:py-16 text-foreground">
      <Toaster />
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <Badge variant="secondary">
            <RiMailSendLine data-icon="inline-start" />
            Contact
          </Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Let&apos;s talk about your project
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send me a message regarding collaboration opportunities, job offers, or freelancing. I typically respond within one business day.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ContactForm />

          <div className="flex flex-col gap-6">
            <div
              className="relative h-52 w-full overflow-hidden border border-border bg-muted/40"
              aria-hidden="true"
            >
              <div className="absolute inset-0 grid grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-border/40 last:border-r-0"
                  />
                ))}
              </div>
              <div className="absolute inset-0 grid grid-rows-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-border/40 last:border-b-0"
                  />
                ))}
              </div>

              {/* location radius */}
              <div className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 bg-primary/3" />
              <div className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/4" />

              {/* marker */}
              <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-background/70">
                <RiMapPin2Line className="size-5" />
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <Card>
                <CardContent className="flex items-start gap-3 py-5">
                  <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-muted">
                    <RiMapPin2Line
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Location</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Berlin, Germany
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-3 py-5">
                  <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-muted">
                    <RiEarthLine
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Remote Work</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Available worldwide (UTC+1 / UTC+2 timezone alignment)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-3 py-5">
                  <span className="flex size-8 shrink-0 items-center justify-center border border-border bg-muted">
                    <RiPhoneLine
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">Primary Contact</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      alex@gonzalez.dev
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
