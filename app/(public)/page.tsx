import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  RiGithubLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiSparkling2Line,
  RiCpuLine,
  RiLayout5Line,
  RiCommandLine,
  RiCheckLine,
  RiArrowRightLine,
} from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  { name: "React / Next.js", Icon: RiVercelFill },
  { name: "GitHub / CI-CD", Icon: RiGithubFill },
  { name: "Supabase / DB", Icon: RiSupabaseFill },
  { name: "Figma UI/UX", Icon: RiFigmaFill },
  { name: "Slack Collaboration", Icon: RiSlackFill },
  { name: "Notion Docs", Icon: RiNotionFill },
  { name: "Google Cloud", Icon: RiGoogleFill },
  { name: "Discord Support", Icon: RiDiscordFill },
];

const faqs = [
  {
    q: "What is your primary technology stack?",
    a: "I specialize in TypeScript, React, Next.js, and Node.js for frontend and full-stack development, combined with Go and Python for high-performance backend microservices and data pipelines.",
  },
  {
    q: "Do you work with remote teams and agencies?",
    a: "Yes, absolutely. I have worked with distributed teams across Europe and the US, adapting seamlessly to agile workflows, async communication, and tight development sprints.",
  },
  {
    q: "What is your approach to code quality and testing?",
    a: "I follow DRY and SOLID design principles, maintain a clean repository structure, write comprehensive unit and integration tests, and utilize CI/CD workflows to ensure stable, production-ready deployments.",
  },
  {
    q: "How do we collaborate on a new project?",
    a: "We start with a discovery call to align on technical requirements and design specs. I then outline a clear implementation roadmap, set up staging previews, and maintain full transparency through regular demo sessions.",
  },
  {
    q: "Are you open to full-time opportunities or contract roles?",
    a: "I am open to contract engagements, freelance consultancies, and select full-time roles where I can build impactful products with passionate teams.",
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
      <HeroSection />

      {/* Logos section */}
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

      {/* Services Features Block */}
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

      {/* Team section */}
      <div className="mx-auto w-full max-w-5xl mt-24">
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
                      className="grayscale object-cover"
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

      {/* FAQ section */}
      <div className="w-full max-w-5xl mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have questions about how we can work together? Here are some quick answers.
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
