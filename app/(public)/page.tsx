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

const specialties = [
  {
    name: "Frontend Engineering",
    role: "Next.js / TypeScript / Tailwind CSS",
    avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&q=80",
    bio: "Crafting beautiful, accessible (WCAG compliant), and lightning-fast user interfaces with modern React paradigms, server-side rendering, and micro-interactions.",
    social: { linkedin: "#", github: "#", twitter: null },
  },
  {
    name: "Backend Architecture",
    role: "Go / Node.js / PostgreSQL / REST & gRPC",
    avatar: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=150&q=80",
    bio: "Designing robust database schemas, secure REST/GraphQL APIs, rate-limiting layers, and high-throughput server runtimes that scale effortlessly.",
    social: { linkedin: "#", github: "#", twitter: null },
  },
  {
    name: "UI/UX & Design Systems",
    role: "Figma / Component Library Design",
    avatar: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=150&q=80",
    bio: "Bridging the gap between design and engineering by designing scalable design systems, design tokens, and highly reusable, pixel-perfect UI component libraries.",
    social: { linkedin: "#", github: null, twitter: "#" },
  },
  {
    name: "Performance & SEO Audit",
    role: "Next.js Optimization / Lighthouse Analysis",
    avatar: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80",
    bio: "Diagnosing rendering bottlenecks, optimizing bundle sizes, implementing edge caching, and ensuring SEO best practices to hit perfect Core Web Vitals.",
    social: { linkedin: "#", github: null, twitter: null },
  },
  {
    name: "DevOps & Cloud Pipelines",
    role: "Docker / GitHub Actions / Vercel / AWS",
    avatar: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=150&q=80",
    bio: "Configuring automated test runs, multi-stage Docker builds, staging environments, and self-healing cloud deployments for seamless delivery pipelines.",
    social: { linkedin: "#", github: "#", twitter: null },
  },
  {
    name: "Consultancy & System Design",
    role: "Tech Stack Decisions / Rearchitecture",
    avatar: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&q=80",
    bio: "Evaluating legacy systems, defining technical migration plans, advising on headless transitions, and mapping complex business requirements into clean architectures.",
    social: { linkedin: "#", github: null, twitter: "#" },
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
    <div className="flex min-h-screen h-full flex-col items-center justify-center py-16">
      <div className="mx-auto w-full max-w-5xl">
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
      {/* specialties section */}
      <div className="mx-auto w-full max-w-5xl mt-24">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-block border border-border px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Specialties
          </span>
          <h2 className="mt-5 text-4xl capitalize font-bold tracking-tight">
            How I can help you
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A software engineer focused on code craftsmanship, system reliability,
            and delivering rich, premium user experiences.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
          {specialties.map(({ name, role, avatar, bio, social }) => (
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
