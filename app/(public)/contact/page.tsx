"use client";

import { RiMailSendLine, RiMapPin2Line, RiPhoneLine, RiEarthLine } from "@remixicon/react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = ["Freelance Project", "Full-time / Contract Role", "General Inquiry", "Collaboration / Open Source"];

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
          <Card className="w-full">
            <form
              className="flex flex-col gap-(--card-spacing)"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success(
                  "Message sent successfully. I'll get back to you shortly!",
                );
              }}
            >
              <CardHeader>
                <CardTitle className="text-sm font-semibold">
                  Send a message
                </CardTitle>
                <CardDescription>
                  Tell me a bit about what you need.
                </CardDescription>
              </CardHeader>

              <Separator />

              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input id="name" type="text" placeholder="Jane Doe" required />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="topic">Topic</FieldLabel>
                    <Select name="topic">
                      <SelectTrigger id="topic" className="w-full">
                        <SelectValue placeholder="Select a topic…" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOPICS.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      rows={6}
                      className="min-h-32 resize-none"
                      placeholder="How can I help you?"
                      required
                    />
                  </Field>
                </FieldGroup>
              </CardContent>

              <CardFooter className="flex flex-col items-stretch gap-4">
                <div className="flex items-center gap-2.5">
                  <Checkbox id="consent" name="consent" required />
                  <label
                    htmlFor="consent"
                    className="text-xs leading-snug font-normal text-muted-foreground"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  <RiMailSendLine data-icon="inline-start" />
                  Send Message
                </Button>
              </CardFooter>
            </form>
          </Card>

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
