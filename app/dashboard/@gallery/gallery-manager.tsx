"use client";
"use no memo";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiDeleteBin6Line, RiEdit2Line, RiCloseLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { updateGalleryAction } from "@/app/actions";
import { ImageSelector } from "@/components/image-selector";


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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<GalleryFormValues>({
    defaultValues: {
      title: "",
      tag: "",
      url: "",
    }
  });

  const handleEdit = (index: number) => {
    const item = tiles[index];
    setEditIndex(index);
    setValue("title", item.label);
    setValue("tag", item.tag);
    setValue("url", item.src);
    setImageUrl(item.src);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    reset();
    setImageUrl("");
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    // If we delete the item currently being edited, cancel edit mode
    if (editIndex === index) {
      setEditIndex(null);
      reset();
      setImageUrl("");
    } else if (editIndex !== null && editIndex > index) {
      // Adjust edit index to prevent index mismatch
      setEditIndex(editIndex - 1);
    }

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
    if (!imageUrl) {
      toast.error("Please upload an image or provide an image URL first.");
      return;
    }

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
        src: imageUrl,
        full: imageUrl,
      };

      let updated = [...tiles];
      if (editIndex !== null) {
        updated[editIndex] = submittedTile;
      } else {
        updated = [submittedTile, ...updated];
      }

      const res = await updateGalleryAction(updated);
      if (res.success) {
        setTiles(updated);
        toast.success(editIndex !== null ? "Gallery item updated successfully!" : "Gallery item added successfully!");
        setEditIndex(null);
        reset();
        setImageUrl("");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save gallery item.");
    }
  };


  return (
    <div className="flex flex-col gap-6 w-full md:h-[calc(100vh-120px)] md:lg:h-[calc(100vh-140px)] md:overflow-hidden animate-in fade-in duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Gallery Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add new photography/work assets and manage existing items in your public gallery.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full md:flex-1 md:min-h-0 items-start md:items-stretch pb-6 md:pb-2 overflow-y-auto md:overflow-visible">
        {/* Left Column: Form (scrollable on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {editIndex !== null ? "Edit Gallery Item" : "Add New Item"}
            </CardTitle>
            <CardDescription>
              {editIndex !== null ? "Modify the gallery fields below to update existing details." : "Create a new visual card to feature on your public gallery page."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Item Label / Title
                </label>
                <input
                  id="title"
                  placeholder="e.g. Workspace Redesign"
                  {...register("title", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tag" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category Tag (e.g. WORKSPACE, CODING, ARCHITECTURE)
                </label>
                <input
                  id="tag"
                  placeholder="e.g. WORKSPACE"
                  {...register("tag", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <ImageSelector
                value={imageUrl}
                onChange={setImageUrl}
                label="Gallery Photo"
                placeholderUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              />


              <Separator className="my-2" />

              <div className="flex items-center justify-end gap-3 pb-2">
                {editIndex !== null ? (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs gap-1.5 rounded-lg"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiCloseLine className="size-4" />
                      </StrokeDraw>
                      Cancel Edit
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs gap-1.5 rounded-lg"
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiSaveLine className="size-4" />
                      </StrokeDraw>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs gap-1.5 rounded-lg"
                      onClick={() => reset()}
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiRefreshLine className="size-4" />
                      </StrokeDraw>
                      Reset Form
                    </Button>
                    <Button
                      type="submit"
                      className="text-xs gap-1.5 rounded-lg"
                      disabled={isSubmitting}
                    >
                      <StrokeDraw>
                        <RiSaveLine className="size-4" />
                      </StrokeDraw>
                      {isSubmitting ? "Adding..." : "Add Item"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Items List (scrollable only on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">Existing Gallery Items</CardTitle>
            <CardDescription>
              List of active visual assets rendered in the public gallery.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <div className="flex flex-col gap-3">
              {tiles.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No gallery items currently featured.</p>
              ) : (
                tiles.map((t, idx) => (
                  <div 
                    key={`${t.label}-${idx}`} 
                    className={`flex items-center justify-between border p-3.5 rounded-lg gap-4 transition-all duration-300 ${
                      editIndex === idx 
                        ? "border-primary/50 bg-primary/5 shadow-xs" 
                        : "border-border/80 bg-muted/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground flex items-center gap-2">
                        {t.label}
                        {editIndex === idx && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider scale-90">
                            Editing
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{t.tag} • {t.location}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className={`p-1.5 transition-colors rounded-md ${
                          editIndex === idx 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        }`}
                        title="Edit Item"
                      >
                        <RiEdit2Line className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors rounded-md"
                        title="Delete Item"
                      >
                        <RiDeleteBin6Line className="size-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
