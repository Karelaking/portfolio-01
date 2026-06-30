"use client";

import { useState, useId } from "react"
import { motion } from "motion/react"
import {
  RiArrowRightLine,
  RiLayoutGridLine,
  RiListUnordered
} from "@remixicon/react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { StrokeDraw } from "@/components/stroke-draw"
import { cn } from "@/lib/utils"

export type Item = {
  title: string
  description: string
  tag: string
  progress: number
  techIcon: React.ElementType
}

export type RoadmapColumn = {
  status: string
  icon: React.ElementType
  items: Item[]
}

export default function RoadmapBlock({ columns }: { columns: RoadmapColumn[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const id = useId();

  return (
    <section className="flex w-full items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="text-center sm:text-left">
            <Badge variant="outline" className="mb-4">
              Skill & Expertise Map
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Technical Proficiency
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto sm:mx-0">
              A comprehensive breakdown of my core technical skills, the tools I use daily, and my current proficiency levels across the stack.
            </p>
          </div>

          <div className="bg-muted/30 rounded-md p-1 border border-border shrink-0 hidden sm:flex self-center sm:self-end">
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
                  layoutId={`${id}-bg-skills`}
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
                  layoutId={`${id}-bg-skills`}
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
            view === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"
          )}
        >
          {columns.map((column) => (
            <motion.div layout key={column.status} className="flex flex-col gap-4">
              <motion.div layout className="flex items-center gap-2 border-b border-border pb-2">
                <column.icon
                  className="size-5 text-primary"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-bold">{column.status}</h3>
              </motion.div>

              <motion.ul layout className="flex flex-col gap-4">
                {column.items.map((item) => (
                  <motion.li
                    key={item.title}
                    layout
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className={cn(
                      "group flex border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-sm rounded-xl overflow-hidden",
                      view === "grid" 
                        ? "flex-col gap-4" 
                        : "flex-col sm:flex-row justify-between gap-6"
                    )}
                  >
                    {/* Left Block: Tag, Icon+Title, Description */}
                    <motion.div layout className={cn("flex flex-col gap-2", view === "list" && "sm:flex-1")}>
                      <motion.div layout className="flex justify-start items-start">
                        <Badge variant="secondary" className="w-fit text-[10px] tracking-wide uppercase">
                          {item.tag}
                        </Badge>
                      </motion.div>
                      
                      <motion.div layout className="flex items-center gap-3 mt-1">
                        <motion.div layout className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                          <item.techIcon className="size-5" />
                        </motion.div>
                        <motion.h4 layout className="text-base font-bold text-foreground transition-colors group-hover:text-primary">{item.title}</motion.h4>
                      </motion.div>
                      
                      <motion.p layout className="text-sm/relaxed text-muted-foreground mt-2">
                        {item.description}
                      </motion.p>
                    </motion.div>

                    {/* Right Block: Proficiency & Button */}
                    <motion.div layout className={cn("flex flex-col gap-4 justify-end", view === "list" && "sm:w-[220px] shrink-0 sm:pb-1")}>
                      <motion.div layout className="flex flex-col gap-2">
                        <motion.div layout className="flex justify-between items-center">
                          <motion.span layout className="text-[10px] uppercase font-bold text-muted-foreground">Proficiency</motion.span>
                          <motion.span layout className="text-xs font-bold text-primary tabular-nums">
                            {item.progress}%
                          </motion.span>
                        </motion.div>
                        <motion.div layout>
                          <Progress
                            value={item.progress}
                            aria-label={`${item.title} proficiency`}
                            className="h-1.5"
                          />
                        </motion.div>
                      </motion.div>
                      <motion.div layout>
                        <Button variant="outline" size="sm" className="w-full gap-2 text-xs font-semibold" render={<Link href="/projects" />} nativeButton={false}>
                          Browse Projects
                          <RiArrowRightLine className="size-3.5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
