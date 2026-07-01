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
import ExpertiseBlock from "@/components/expertise-block";
import { useRouter } from "next/navigation";
import { updateExpertiseAction } from "@/app/actions";

type SkillItem = {
  title: string;
  tag: string;
  progress: number;
  description: string;
};

type SkillColumn = {
  status: string;
  items: SkillItem[];
};

type ExpertiseFormValues = {
  columnName: string;
  title: string;
  tag: string;
  progress: number;
  description: string;
};

export default function ExpertiseManager({ initialColumns }: { initialColumns: SkillColumn[] }) {
  const router = useRouter();
  const [columns, setColumns] = useState<SkillColumn[]>(initialColumns);
  const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSkillIndex, setEditSkillIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<ExpertiseFormValues>({
    defaultValues: {
      columnName: "",
      title: "",
      tag: "",
      progress: 80,
      description: "",
    }
  });

  const title = watch("title");
  const tag = watch("tag");
  const progress = watch("progress");
  const description = watch("description");

  // Real-time preview generator
  const previewColumns = columns.map((col, cIdx) => {
    if (cIdx !== selectedColumnIdx) return col;
    
    // Generate items array including the current add/edit changes
    let previewItems = [...col.items];
    if (isEditing && editSkillIndex !== null) {
      previewItems[editSkillIndex] = {
        title: title || previewItems[editSkillIndex].title,
        tag: tag || previewItems[editSkillIndex].tag,
        progress: Number(progress) || previewItems[editSkillIndex].progress,
        description: description || previewItems[editSkillIndex].description,
      };
    } else if (title) {
      previewItems = [
        ...previewItems,
        {
          title,
          tag,
          progress: Number(progress),
          description,
        }
      ];
    }
    
    return {
      ...col,
      items: previewItems,
    };
  });

  const handleEdit = (skillIdx: number) => {
    const item = columns[selectedColumnIdx].items[skillIdx];
    setEditSkillIndex(skillIdx);
    setIsEditing(true);
    setValue("columnName", columns[selectedColumnIdx].status);
    setValue("title", item.title);
    setValue("tag", item.tag);
    setValue("progress", item.progress);
    setValue("description", item.description);
  };

  const handleDelete = async (skillIdx: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    
    const updated = columns.map((col, cIdx) => {
      if (cIdx !== selectedColumnIdx) return col;
      return {
        ...col,
        items: col.items.filter((_, sIdx) => sIdx !== skillIdx)
      };
    });
    setColumns(updated);

    try {
      const res = await updateExpertiseAction(updated);
      if (res.success) {
        toast.success("Skill deleted successfully!");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete skill.");
    }
  };

  const onSubmit = async (data: ExpertiseFormValues) => {
    try {
      const newSkill: SkillItem = {
        title: data.title,
        tag: data.tag,
        progress: Number(data.progress),
        description: data.description,
      };

      const updated = columns.map((col, cIdx) => {
        if (cIdx !== selectedColumnIdx) return col;
        
        let updatedItems = [...col.items];
        if (isEditing && editSkillIndex !== null) {
          updatedItems[editSkillIndex] = newSkill;
        } else {
          updatedItems.push(newSkill);
        }

        return {
          ...col,
          status: data.columnName || col.status,
          items: updatedItems,
        };
      });

      const res = await updateExpertiseAction(updated);
      if (res.success) {
        setColumns(updated);
        toast.success(isEditing ? "Skill updated successfully!" : "Skill added successfully!");
        setIsEditing(false);
        setEditSkillIndex(null);
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
    setEditSkillIndex(null);
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
          <h1 className="text-2xl font-bold tracking-tight">Expertise Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage competency categories, skills, and progress bars featured in your expertise portfolio block.
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => {
              setIsEditing(true);
              setEditSkillIndex(null);
              reset();
              setValue("columnName", columns[selectedColumnIdx].status);
            }}
            className="w-fit text-xs gap-1.5 rounded-lg shrink-0"
          >
            <RiAddLine className="size-4" />
            Add New Skill
          </Button>
        )}
      </div>

      {/* Category selector tabs */}
      <div className="flex border-b border-border/60 gap-4 overflow-x-auto pb-px">
        {columns.map((col, idx) => (
          <button
            key={col.status}
            onClick={() => {
              setSelectedColumnIdx(idx);
              handleCancel();
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
              selectedColumnIdx === idx
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {col.status}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor or Items List (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="text-base font-bold">
              {isEditing ? (editSkillIndex !== null ? "Edit Skill" : "Add Skill") : `Skills under ${columns[selectedColumnIdx]?.status}`}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Modify attributes and save." : "Skills currently rendered in this column."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="columnName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category / Column Name
                  </label>
                  <input
                    id="columnName"
                    {...register("columnName", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Skill Title
                  </label>
                  <input
                    id="title"
                    {...register("title", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tag" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Icon Tag (e.g. SYSTEMS, FRONTEND, DEV)
                  </label>
                  <input
                    id="tag"
                    {...register("tag", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="progress" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Progress Percentage ({progress}%)
                  </label>
                  <input
                    id="progress"
                    type="range"
                    min="1"
                    max="100"
                    {...register("progress", { required: true })}
                    className="w-full bg-transparent accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    {...register("description", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
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
                    {isSubmitting ? "Saving..." : "Save Skill"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {columns[selectedColumnIdx]?.items.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No skills found in this column.</p>
                ) : (
                  columns[selectedColumnIdx]?.items.map((skill, idx) => (
                    <div key={`${skill.title}-${idx}`} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{skill.title}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">{skill.tag} • {skill.progress}%</p>
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
              <div className="py-16 px-4">
                <ExpertiseBlock columns={previewColumns as any} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
