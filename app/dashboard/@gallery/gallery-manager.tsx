"use client";
"use no memo";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiAddLine, RiEdit2Line, RiDeleteBin6Line, RiCloseLine } from "@remixicon/react";
import GalleryList from "@/components/gallery-list";
import { useRouter } from "next/navigation";
import { updateGalleryAction } from "@/app/actions";

type Contributor = {
  name: string;
  initials: string;
  avatar: string;
};

type TileItem = {
  id: number;
  label: string;
  tag: string;
  location: string;
  contributor: Contributor;
  featured: boolean;
  src: string;
  full: string;
};

type GalleryFormValues = {
  title: string;
  tag: string;
  url: string;
};

export default function GalleryManager({ initialTiles }: { initialTiles: TileItem[] }) {
  const router = useRouter();
  const [tiles, setTiles] = useState<TileItem[]>(initialTiles);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<GalleryFormValues>({
    defaultValues: {
      title: "",
      tag: "",
      url: "",
    }
  });

  const title = watch("title");
  const tag = watch("tag");
  const url = watch("url");

  const previewTiles = isEditing
    ? tiles.map((t, idx) =>
        idx === editIndex
          ? {
              ...t,
              label: title || t.label,
              tag: tag || t.tag,
              src: url || t.src,
              full: url || t.full,
            }
          : t
      )
    : title
    ? [
        {
          id: Date.now(),
          label: title,
          tag: tag,
          location: "Berlin, Germany",
          contributor: {
            name: "Alex Gonzalez",
            initials: "AG",
            avatar: "https://i.pravatar.cc/150?img=15",
          },
          featured: true,
          src: url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
          full: url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
        },
        ...tiles
      ]
    : tiles;

  const handleEdit = (index: number) => {
    const item = tiles[index];
    setEditIndex(index);
    setIsEditing(true);
    setValue("title", item.label);
    setValue("tag", item.tag);
    setValue("url", item.src);
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    const updated = tiles.filter((_, idx) => idx !== index);
    setTiles(updated);

    try {
      const res = await updateGalleryAction(updated);
      if (res.success) {
        toast.success("Gallery item deleted successfully!");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete gallery item.");
    }
  };

  const onSubmit = async (data: GalleryFormValues) => {
    try {
      const submittedTile: TileItem = {
        id: editIndex !== null && tiles[editIndex] ? tiles[editIndex].id : Date.now(),
        label: data.title,
        tag: data.tag,
        location: "Berlin, Germany",
        contributor: {
          name: "Alex Gonzalez",
          initials: "AG",
          avatar: "https://i.pravatar.cc/150?img=15",
        },
        featured: true,
        src: data.url,
        full: data.url,
      };

      let updated = [...tiles];
      if (isEditing && editIndex !== null) {
        updated[editIndex] = submittedTile;
      } else {
        updated = [submittedTile, ...updated];
      }

      const res = await updateGalleryAction(updated);
      if (res.success) {
        setTiles(updated);
        toast.success(isEditing ? "Gallery item updated successfully!" : "Gallery item added successfully!");
        setIsEditing(false);
        setEditIndex(null);
        reset();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save changes.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditIndex(null);
    reset();
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 1024);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gallery Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your photography portfolio, workspace snaps, and tag streams.
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditIndex(null);
              reset();
            }}
            className="w-fit text-xs gap-1.5 rounded-lg shrink-0"
          >
            <RiAddLine className="size-4" />
            Add New Photo
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor or Items List (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="text-base font-bold">
              {isEditing ? (editIndex !== null ? "Edit Photo" : "Add Photo") : "Photo Gallery Collection"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Fill in fields to save changes." : "Grid items currently featured in your photo streams."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Photo Title / Label
                  </label>
                  <input
                    id="title"
                    {...register("title", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tag" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Tag (e.g. Workspace, Cityscape)
                  </label>
                  <input
                    id="tag"
                    {...register("tag", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="url" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Image Unsplash URL
                  </label>
                  <input
                    id="url"
                    type="url"
                    {...register("url", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs gap-1.5 rounded-lg"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    <StrokeDraw>
                      <RiCloseLine className="size-4" />
                    </StrokeDraw>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="text-xs gap-1.5 rounded-lg"
                    disabled={isSubmitting}
                  >
                    <StrokeDraw>
                      <RiSaveLine className="size-4" />
                    </StrokeDraw>
                    {isSubmitting ? "Saving..." : "Save Photo"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {tiles.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No gallery photos found.</p>
                ) : (
                  tiles.map((t, idx) => (
                    <div key={`${t.label}-${idx}`} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                      <div className="min-w-0 flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="size-10 bg-muted border border-border rounded-md overflow-hidden shrink-0">
                          <img src={t.src} alt={t.label} className="size-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate text-foreground">{t.label}</p>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{t.tag}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleEdit(idx)}
                          className="p-1.5 hover:text-primary transition-colors hover:bg-muted rounded-md"
                          title="Edit"
                        >
                          <RiEdit2Line className="size-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="p-1.5 hover:text-destructive transition-colors hover:bg-muted rounded-md"
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Live Mockup Preview of Actual Page (3/5 width) */}
        <Card className="lg:col-span-3 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden sticky top-6">
          <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              Actual Page Preview (Desktop Viewport)
            </CardTitle>
          </CardHeader>
          <CardContent ref={containerRef} className="p-0 overflow-y-auto max-h-[550px] relative bg-background flex flex-col justify-start items-center">
            {/* Scale wrapper dynamically adjusted to container width */}
            <div 
              className="shrink-0 w-full"
              style={{
                width: "1024px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                paddingBottom: `calc(100% * (1 - ${scale}))`,
              }}
            >
              <div className="py-16">
                <GalleryList tiles={previewTiles} tags={["All"]} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
