"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { StrokeDraw } from "@/components/stroke-draw";
import { 
  RiArrowRightLine, 
  RiMapPinLine,
  RiLayoutGridLine,
  RiListUnordered
} from "@remixicon/react";
import Image from "next/image";

type Contributor = {
  name: string;
  initials: string;
  avatar: string;
};

type Tile = {
  id: number;
  label: string;
  location: string;
  contributor: Contributor;
  tag: string;
  featured: boolean;
  src: string;
  full: string;
};

interface GalleryListProps {
  tiles: Tile[];
  tags: string[];
}

export default function GalleryList({ tiles, tags }: GalleryListProps) {
  const [active, setActive] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const id = useId();

  const visible = active === "All" ? tiles : tiles.filter((t) => t.tag === active);

  return (
    <>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border pb-6">
        <ToggleGroup
          variant="outline"
          size="sm"
          value={[active]}
          onValueChange={(value) => {
            const next = value[0];
            if (next) setActive(next);
          }}
          aria-label="Filter photos by tag"
          className="flex-wrap justify-center sm:justify-start"
        >
          {tags.map((tag) => (
            <ToggleGroupItem
              key={tag}
              value={tag}
              aria-label={`Show ${tag} photos`}
              className="text-xs font-medium tracking-wide"
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="flex bg-muted/30 rounded-md p-1 border border-border">
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
                layoutId={`${id}-bg-gallery`}
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
                layoutId={`${id}-bg-gallery`}
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
        className={`mt-8 grid gap-2 ${
          view === "grid" 
            ? "grid-cols-2 bg-border sm:grid-cols-3 md:grid-cols-4" 
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        <AnimatePresence>
          {visible.map((tile, index) => (
            <motion.div
              key={tile.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6, delay: index * 0.05 }}
              className={view === "grid" ? "aspect-square" : "aspect-video"}
            >
              <Dialog>
                <DialogTrigger
                  render={
                    <button
                      type="button"
                      aria-label={`View ${tile.label}`}
                      className="group size-full relative overflow-hidden bg-muted text-left focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-xs"
                    />
                  }
                >
              <Image
                fill
                src={tile.src}
                alt={tile.label}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xs filter grayscale group-hover:filter-none"
              />

              <div className="absolute inset-0 flex flex-col justify-between bg-foreground/0 p-3 transition-colors duration-300 group-hover:bg-foreground/70">
                <div className="flex items-start justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-semibold tracking-wide"
                  >
                    {tile.tag}
                  </Badge>
                  {tile.featured && (
                    <span className="size-1.5 bg-primary" title="Featured" />
                  )}
                </div>

                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-xs font-semibold tracking-wide text-background">
                    {tile.label}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <RiMapPinLine
                      className="size-3 shrink-0 text-background/70"
                      aria-hidden="true"
                    />
                    <span className="truncate text-[10px] text-background/70">
                      {tile.location}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 border-t border-background/20 pt-2">
                    <Avatar className="size-5">
                      <AvatarImage
                        src={tile.contributor.avatar}
                        alt={tile.contributor.name}
                        className="grayscale"
                      />
                      <AvatarFallback className="text-[8px]">
                        {tile.contributor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate text-[10px] text-background/80">
                      {tile.contributor.name}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent showCloseButton className="gap-0 p-0 sm:max-w-2xl">
              <DialogTitle className="sr-only">{tile.label}</DialogTitle>
              <DialogDescription className="sr-only">
                {tile.label}, {tile.location}, photographed by{" "}
                {tile.contributor.name}.
              </DialogDescription>
              <div className="relative aspect-4/3 w-full overflow-hidden border-b border-border bg-muted">
                <Image
                  src={tile.full}
                  alt={tile.label}
                  className="size-full object-cover"
                  fill
                />
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-tight text-foreground">
                      {tile.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <RiMapPinLine
                        className="size-3 shrink-0"
                        aria-hidden="true"
                      />
                      {tile.location}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-semibold tracking-wide uppercase"
                  >
                    {tile.tag}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={tile.contributor.avatar}
                        alt={tile.contributor.name}
                        className="grayscale"
                      />
                      <AvatarFallback className="text-[9px]">
                        {tile.contributor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-foreground">
                      {tile.contributor.name}
                    </span>
                  </div>
                  <DialogClose
                    render={<Button variant="outline" size="sm" />}
                  >
                    Close
                  </DialogClose>
                </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          Showing {visible.length} of {tiles.length} photos
        </p>
        <Button
          variant="ghost"
          className="gap-1.5 text-xs font-medium"
          render={<a href="#" />}
          nativeButton={false}
        >
          View Full Collection
          <RiArrowRightLine className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </>
  );
}
