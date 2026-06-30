"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiTimeLine, RiLayoutGridLine, RiListUnordered } from "@remixicon/react";
import { StrokeDraw } from "@/components/stroke-draw";
import Image from "next/image";

type Post = {
  category: string;
  title: string;
  image: string;
  excerpt: string;
  author: { name: string; initials: string; img: number };
  date: string;
  readTime: string;
};

interface BlogListProps {
  categories: readonly string[];
  posts: Post[];
}

export default function BlogList({ categories, posts }: BlogListProps) {
  const [active, setActive] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const id = useId();

  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
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
                layoutId={`${id}-bg-blog`}
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
                layoutId={`${id}-bg-blog`}
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
    </>
  );
}
