"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiArrowRightLine, RiTimeLine, RiLayoutGridLine, RiListUnordered } from "@remixicon/react";
import { StrokeDraw } from "@/components/stroke-draw";

const featured = {
  category: "Engineering",
  title: "How I cut API latency by 60% with edge caching",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  excerpt:
    "Our monolith was fast enough, until it wasn't. We traced the bottleneck to cold database reads on every request and rearchitected the caching layer in three weeks.",
  author: { name: "Alex Gonzalez", initials: "AG", img: 47 },
  date: "Jun 9, 2026",
  readTime: "7 Min Read",
};

const categories = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Methodology",
] as const;

const posts = [
  {
    category: "Design",
    title: "Building a token system that survives a rebrand",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    excerpt:
      "Semantic tokens feel abstract until your brand color changes overnight.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 12 },
    date: "May 28, 2026",
    readTime: "5 Min Read",
  },
  {
    category: "Product",
    title: "What 1,200 user interviews taught us about onboarding",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    excerpt:
      "Drop-off at step two had nothing to do with the UI, it was a mental model gap.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 45 },
    date: "May 14, 2026",
    readTime: "9 Min Read",
  },
  {
    category: "Engineering",
    title: "Shipping a type-safe API layer without a build step",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    excerpt:
      "We replaced our codegen pipeline with inferred types and never looked back.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 13 },
    date: "May 2, 2026",
    readTime: "6 Min Read",
  },
  {
    category: "Methodology",
    title: "Why I focus on remote-first engineering workflows",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    excerpt:
      "Three years of hybrid work taught me where collaboration actually happens in distributed projects.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 44 },
    date: "Apr 19, 2026",
    readTime: "4 Min Read",
  },
  {
    category: "Design",
    title: "A practical guide to accessible color contrast",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    excerpt:
      "Pass WCAG without sacrificing the palette your brand team fought for.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 15 },
    date: "Apr 5, 2026",
    readTime: "8 Min Read",
  },
  {
    category: "Product",
    title: "Pricing experiments that doubled our trial conversion",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    excerpt:
      "Small framing changes on the pricing page moved the needle more than discounts.",
    author: { name: "Alex Gonzalez", initials: "AG", img: 41 },
    date: "Mar 22, 2026",
    readTime: "5 Min Read",
  },
];

export default function BlogBlock() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const id = useId();

  const visible =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="flex min-h-svh w-full justify-center bg-background py-16 text-foreground">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            My Blog
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Writing about software engineering & web development
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Engineering deep dives, design notes, and system architecture decisions from projects I design and build.
          </p>
        </div>

        <Card className="group mb-12 overflow-hidden p-0 md:grid md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden bg-muted md:aspect-auto md:h-full">
            <Image
              fill
              src={featured.image}
              alt={featured.title}
              className="size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            />
            <span className="absolute top-4 right-4 flex items-center gap-1 bg-background/85 px-2 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm">
              <RiTimeLine className="size-3" />
              {featured.readTime}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <Badge className="w-fit">{featured.category}</Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {featured.title}
            </h2>
            <p className="text-muted-foreground">{featured.excerpt}</p>
            <div className="flex items-center gap-3">
              <Avatar className="size-9 border border-border">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
                  alt={featured.author.name}
                  className="grayscale object-cover"
                />
                <AvatarFallback>{featured.author.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-foreground">{featured.author.name}</p>
                <p className="text-muted-foreground">{featured.date}</p>
              </div>
            </div>
            <div>
              <Button render={<a href="#" />} nativeButton={false}>
                Read Article
                <RiArrowRightLine data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {categories.map((category) => {
              const isActive = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-none border px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="bg-muted/30 rounded-md p-1 border border-border shrink-0 hidden sm:flex">
            <button
              onClick={() => setView("grid")}
              className={`group p-1.5 sm:p-2 rounded-sm transition-colors relative z-10 flex items-center justify-center ${
                view === "grid"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              {view === "grid" && (
                <motion.div
                  layoutId={`${id}-bg`}
                  className="absolute inset-0 bg-background rounded-sm -z-10 shadow-sm border border-border/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <StrokeDraw>
                <RiLayoutGridLine className="size-4" />
              </StrokeDraw>
            </button>
            <button
              onClick={() => setView("list")}
              className={`group p-1.5 sm:p-2 rounded-sm transition-colors relative z-10 flex items-center justify-center ${
                view === "list"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              {view === "list" && (
                <motion.div
                  layoutId={`${id}-bg`}
                  className="absolute inset-0 bg-background rounded-sm -z-10 shadow-sm border border-border/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <StrokeDraw>
                <RiListUnordered className="size-4" />
              </StrokeDraw>
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className={cn(
            "grid gap-6",
            view === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" 
              : "grid-cols-1 mx-auto"
          )}
        >
          <AnimatePresence>
            {visible.map((post, index) => (
              <motion.div
                key={post.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6, delay: index * 0.05 }}
                className={cn(
                  "rounded-xl border bg-card text-card-foreground shadow group flex h-full overflow-hidden p-0 transition-shadow hover:shadow-md",
                  view === "grid" ? "flex-col" : "flex-col sm:flex-row"
                )}
              >
                <motion.div 
                  layout
                  className={cn(
                    "relative overflow-hidden bg-muted",
                    view === "grid" ? "aspect-video" : "sm:w-72 shrink-0 aspect-video sm:aspect-auto sm:h-full"
                  )}
                >
                  <Image
                    fill
                    src={post.image}
                    alt={post.title}
                    className="size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-background/85 px-2 py-0.5 text-[11px] font-medium text-foreground backdrop-blur-sm">
                    <RiTimeLine className="size-3" />
                    {post.readTime}
                  </span>
                </motion.div>

                <motion.div 
                  layout 
                  className={cn("flex flex-col flex-1", view === "list" && "justify-center")}
                >
                  <CardHeader className="gap-2 px-5 pt-5">
                    <Badge variant="secondary" className="w-fit">
                      {post.category}
                    </Badge>
                    <CardTitle className="text-lg leading-snug">
                      <a
                        href="#"
                        className="transition-colors group-hover:text-primary font-bold"
                      >
                        {post.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 px-5">
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="items-center gap-3 px-5 pb-5">
                    <Avatar className="size-8 border border-border">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
                        alt={post.author.name}
                        className="grayscale object-cover"
                      />
                      <AvatarFallback className="text-xs">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 text-xs">
                      <p className="truncate font-medium text-foreground">
                        {post.author.name}
                      </p>
                      <p className="text-muted-foreground">{post.date}</p>
                    </div>
                  </CardFooter>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
