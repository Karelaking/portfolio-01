import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RiGithubLine, RiLinkedinLine, RiTwitterXLine } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiArrowRightLine } from "@remixicon/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  RiDiscordFill,
  RiFigmaFill,
  RiGithubFill,
  RiGoogleFill,
  RiNotionFill,
  RiSlackFill,
  RiSupabaseFill,
  RiVercelFill,
} from "@remixicon/react";

const logos = [
  { name: "Slack", Icon: RiSlackFill },
  { name: "GitHub", Icon: RiGithubFill },
  { name: "Notion", Icon: RiNotionFill },
  { name: "Figma", Icon: RiFigmaFill },
  { name: "Vercel", Icon: RiVercelFill },
  { name: "Supabase", Icon: RiSupabaseFill },
  { name: "Google", Icon: RiGoogleFill },
  { name: "Discord", Icon: RiDiscordFill },
];

const faqs = [
  {
    q: "What is included in each plan?",
    a: "Every plan includes the core platform, unlimited projects, and access to the component library. Higher tiers add advanced analytics, priority support, and SSO.",
  },
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade or downgrade at any time from your billing settings, and changes are prorated automatically.",
  },
  {
    q: "Do you offer a free trial?",
    a: "All paid plans come with a 14-day free trial. No credit card is required to get started.",
  },
  {
    q: "How does billing work?",
    a: "We bill monthly or annually, and annual plans save you two months. You can cancel anytime with no hidden fees.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit and at rest, and we run regular third-party security audits to keep it safe.",
  },
];

const members = [
  {
    name: "Clara Hoffmann",
    role: "Co-founder & CEO",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Shapes strategy and culture. Previously founded two B2B SaaS companies and led growth at Stripe.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Marcus Tran",
    role: "Co-founder & CTO",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Architect behind the platform. Open-source contributor with a decade of distributed-systems experience.",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Amara Osei",
    role: "Head of Design",
    avatar: "https://i.pravatar.cc/150?img=49",
    bio: "Crafts interfaces that feel inevitable. Former principal designer at Figma and Linear.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Lena Kovač",
    role: "VP of Engineering",
    avatar: "https://i.pravatar.cc/150?img=24",
    bio: "Scales teams and codebases with equal care. Led engineering at three Series B startups.",
    social: { linkedin: "#", twitter: null, github: "#" },
  },
  {
    name: "Daniel Reyes",
    role: "Head of Product",
    avatar: "https://i.pravatar.cc/150?img=33",
    bio: "Turns customer problems into elegant solutions. Background in product management at Notion and Vercel.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
  {
    name: "Yuna Park",
    role: "Head of Marketing",
    avatar: "https://i.pravatar.cc/150?img=44",
    bio: "Builds brand from zero to recognizable. Previously ran marketing at Loom through their acquisition by Atlassian.",
    social: { linkedin: "#", twitter: "#", github: null },
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function Home() {
  return (
    <div className="flex min-h-screen h-full flex-col items-center justify-center">
      <div className="mx-auto w-full">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Trusted by teams at
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Powering the tools your team already loves
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
          {logos.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center justify-center gap-2.5 bg-background px-4 py-8 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-6 shrink-0" aria-hidden="true" />
              <span className="text-lg font-semibold tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* teams section */}
      <div className="mx-auto w-full mt-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-block border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Our Team
          </span>
          <h2 className="mt-5 text-4xl capitalize font-bold tracking-tight">
            The people behind me
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A small, focused team that cares deeply about craft, reliability,
            and the people who use what we build.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
          {members.map(({ name, role, avatar, bio, social }) => (
            <Card
              key={name}
              className="flex flex-col border-0 bg-card p-0 transition-colors duration-150 hover:bg-muted/40"
            >
              <CardContent className="flex flex-1 flex-col gap-5 p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="size-16 border border-border">
                    <AvatarImage
                      src={avatar}
                      alt={name}
                      className="grayscale"
                    />
                    <AvatarFallback className="text-sm font-medium">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-sm leading-none font-semibold text-foreground">
                      {name}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {role}
                    </span>
                    <div className="flex gap-0.5">
                      {social.linkedin && (
                        <Button
                          nativeButton={false}
                          variant="secondary"
                          size="icon-sm"
                          render={
                            <a
                              href={social.linkedin}
                              aria-label={`${name} on LinkedIn`}
                            />
                          }
                        >
                          <RiLinkedinLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                        </Button>
                      )}
                      {social.twitter && (
                        <Button
                          nativeButton={false}
                          variant="secondary"
                          size="icon-sm"
                          render={
                            <a
                              href={social.twitter}
                              aria-label={`${name} on X`}
                            />
                          }
                        >
                          <RiTwitterXLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                        </Button>
                      )}
                      {social.github && (
                        <Button
                          nativeButton={false}
                          variant="secondary"
                          size="icon-sm"
                          render={
                            <a
                              href={social.github}
                              aria-label={`${name} on GitHub`}
                            />
                          }
                        >
                          <RiGithubLine className="size-4 text-muted-foreground transition-colors hover:text-foreground" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* CTA section */}
      <div className="w-full border border-border bg-muted/30 px-6 py-12 text-center sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Start building faster today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Ship production-ready interfaces in minutes with composable blocks,
          sensible defaults, and zero configuration.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            render={<a href="#" />}
            nativeButton={false}
            className="w-full sm:w-auto"
          >
            Get Started
            <RiArrowRightLine data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            render={<a href="#" />}
            nativeButton={false}
            className="w-full sm:w-auto"
          >
            Read the Docs
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          No credit card required.
        </p>
      </div>
      {/* FAQ section */}
      <div className="w-full mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Answers to the questions we hear most often.
          </p>
        </div>
        <Accordion defaultValue={[faqs[0].q]} className="mt-10">
          {faqs.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="py-4 text-base font-medium">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
