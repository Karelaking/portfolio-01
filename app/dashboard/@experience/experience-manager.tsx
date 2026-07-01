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
import ExperienceTimeline from "@/components/experience-timeline";
import { useRouter } from "next/navigation";
import { updateExperienceAction } from "@/app/actions";

type JobItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

type ExperienceFormValues = {
  company: string;
  role: string;
  period: string;
  description: string;
  tagsString: string;
};

export default function ExperienceManager({ initialJobs }: { initialJobs: JobItem[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<ExperienceFormValues>({
    defaultValues: {
      company: "",
      role: "",
      period: "",
      description: "",
      tagsString: "",
    }
  });

  const company = watch("company");
  const role = watch("role");
  const period = watch("period");
  const description = watch("description");
  const tagsString = watch("tagsString");

  const jobTags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];

  const previewJobs = isEditing
    ? jobs.map((j, idx) =>
        idx === editIndex
          ? {
              ...j,
              company: company || j.company,
              role: role || j.role,
              period: period || j.period,
              description: description || j.description,
              tags: tagsString ? jobTags : j.tags,
            }
          : j
      )
    : company
    ? [
        {
          company,
          role,
          period,
          location: "San Francisco, CA",
          description,
          tags: jobTags,
          image: {
            url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80",
            width: 100,
            height: 100,
            alt: company,
          }
        },
        ...jobs
      ]
    : jobs;

  const handleEdit = (index: number) => {
    const item = jobs[index];
    setEditIndex(index);
    setIsEditing(true);
    setValue("company", item.company);
    setValue("role", item.role);
    setValue("period", item.period);
    setValue("description", item.description);
    setValue("tagsString", item.tags.join(", "));
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this job milestone?")) return;
    const updated = jobs.filter((_, idx) => idx !== index);
    setJobs(updated);

    try {
      const res = await updateExperienceAction(updated);
      if (res.success) {
        toast.success("Milestone deleted successfully!");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete milestone.");
    }
  };

  const onSubmit = async (data: ExperienceFormValues) => {
    try {
      const formattedTags = data.tagsString ? data.tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
      const submittedJob: JobItem = {
        company: data.company,
        role: data.role,
        period: data.period,
        location: "Berlin, Germany",
        description: data.description,
        tags: formattedTags,
        image: {
          url: editIndex !== null && jobs[editIndex] ? jobs[editIndex].image.url : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80",
          width: 100,
          height: 100,
          alt: data.company
        }
      };

      let updated = [...jobs];
      if (isEditing && editIndex !== null) {
        updated[editIndex] = submittedJob;
      } else {
        updated = [submittedJob, ...updated];
      }

      const res = await updateExperienceAction(updated);
      if (res.success) {
        setJobs(updated);
        toast.success(isEditing ? "Milestone updated successfully!" : "Milestone added successfully!");
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
          <h1 className="text-2xl font-bold tracking-tight">Experience Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your professional career milestone timeline and responsibilities.
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
            Add New Milestone
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor or Items List (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="text-base font-bold">
              {isEditing ? (editIndex !== null ? "Edit Milestone" : "Add Milestone") : "Career Timeline"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Fill in fields to save changes." : "Milestones currently featured on your resume timeline."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Company Name
                  </label>
                  <input
                    id="company"
                    {...register("company", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Job Title / Role
                  </label>
                  <input
                    id="role"
                    {...register("role", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="period" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Period (e.g., 2021 - 2023)
                  </label>
                  <input
                    id="period"
                    {...register("period", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register("description", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tagsString" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Skills Used (Comma Separated)
                  </label>
                  <input
                    id="tagsString"
                    {...register("tagsString", { required: true })}
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
                    {isSubmitting ? "Saving..." : "Save Milestone"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {jobs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No experience milestones found.</p>
                ) : (
                  jobs.map((j, idx) => (
                    <div key={`${j.company}-${j.role}-${idx}`} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{j.company}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">{j.role} • {j.period}</p>
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
          <CardContent ref={containerRef} className="p-0 overflow-hidden relative aspect-video bg-background flex items-start justify-center">
            {/* Scale wrapper dynamically adjusted to container width */}
            <div 
              className="shrink-0"
              style={{
                width: "1024px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              <ExperienceTimeline jobs={previewJobs} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
