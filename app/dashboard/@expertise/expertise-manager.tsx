"use client";
"use no memo";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiDeleteBin6Line, RiEdit2Line, RiCloseLine } from "@remixicon/react";
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

export default function ExpertiseManager({ initialColumns }: { initialColumns: SkillColumn[] }): React.JSX.Element {
  const router = useRouter();
  const [columns, setColumns] = useState<SkillColumn[]>(initialColumns);
  const [selectedColumnIdx, setSelectedColumnIdx] = useState<number>(0);
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

  const progress = watch("progress");

  const handleEdit = (skillIdx: number) => {
    const item = columns[selectedColumnIdx].items[skillIdx];
    setEditSkillIndex(skillIdx);
    setValue("columnName", columns[selectedColumnIdx].status);
    setValue("title", item.title);
    setValue("tag", item.tag);
    setValue("progress", item.progress);
    setValue("description", item.description);
  };

  const handleCancelEdit = () => {
    setEditSkillIndex(null);
    reset();
  };

  const handleDelete = async (skillIdx: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;

    // If we delete the skill currently being edited, cancel edit mode
    if (editSkillIndex === skillIdx) {
      setEditSkillIndex(null);
      reset();
    } else if (editSkillIndex !== null && editSkillIndex > skillIdx) {
      // Adjust edit index to prevent index mismatch
      setEditSkillIndex(editSkillIndex - 1);
    }

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
        
        const updatedItems = [...col.items];
        if (editSkillIndex !== null) {
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
        toast.success(editSkillIndex !== null ? "Skill updated successfully!" : "Skill added successfully!");
        setEditSkillIndex(null);
        reset();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save skill.");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full md:h-[calc(100vh-120px)] md:lg:h-[calc(100vh-140px)] md:overflow-hidden animate-in fade-in duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Expertise Settings</h1>
      </div>

      {/* Category selector tabs */}
      <div className="flex border-b border-border/60 gap-4 overflow-x-auto pb-px shrink-0">
        {columns.map((col, idx) => (
          <button
            key={col.status}
            onClick={() => {
              setSelectedColumnIdx(idx);
              handleCancelEdit();
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

      <div className="grid gap-6 md:grid-cols-2 w-full md:flex-1 md:min-h-0 items-start md:items-stretch pb-6 md:pb-2 overflow-y-auto md:overflow-visible">
        {/* Left Column: Form (h-fit, no internal scrollbars) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden h-fit flex flex-col">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {editSkillIndex !== null ? "Edit Skill" : "Add New Skill"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 px-5">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="columnName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category / Column Name
                </label>
                <input
                  id="columnName"
                  placeholder="e.g. SYSTEMS"
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
                  placeholder="e.g. Go (Golang)"
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
                  placeholder="e.g. SYSTEMS"
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
                  placeholder="Describe your expertise level and practical projects..."
                  {...register("description", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pb-2">
                {editSkillIndex !== null ? (
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
                      onClick={() => {
                        reset();
                        setValue("columnName", columns[selectedColumnIdx]?.status);
                      }}
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
                      {isSubmitting ? "Adding..." : "Add Skill"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Skills List (scrollable only on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {`Skills under ${columns[selectedColumnIdx]?.status}`}
            </CardTitle>
            <CardDescription>
              List of active competencies featured in this category.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <div className="flex flex-col gap-3">
              {columns[selectedColumnIdx]?.items.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No skills currently in this category.</p>
              ) : (
                columns[selectedColumnIdx]?.items.map((skill, idx) => (
                  <div 
                    key={`${skill.title}-${idx}`} 
                    className={`flex items-center justify-between border p-3.5 rounded-lg gap-4 transition-all duration-300 ${
                      editSkillIndex === idx 
                        ? "border-primary/50 bg-primary/5 shadow-xs" 
                        : "border-border/80 bg-muted/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground flex items-center gap-2">
                        {skill.title}
                        {editSkillIndex === idx && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider scale-90">
                            Editing
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{skill.tag} • {skill.progress}%</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className={`p-1.5 transition-colors rounded-md ${
                          editSkillIndex === idx 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        }`}
                        title="Edit Skill"
                      >
                        <RiEdit2Line className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors rounded-md"
                        title="Delete Skill"
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
