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
import { updateExperienceAction } from "@/app/actions";
import { ImageSelector } from "@/components/image-selector";


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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<ExperienceFormValues>({
    defaultValues: {
      company: "",
      role: "",
      period: "",
      description: "",
      tagsString: "",
    }
  });

  const handleEdit = (index: number) => {
    const item = jobs[index];
    setEditIndex(index);
    setValue("company", item.company);
    setValue("role", item.role);
    setValue("period", item.period);
    setValue("description", item.description);
    setValue("tagsString", item.tags.join(", "));
    setImageUrl(item.image.url);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    reset();
    setImageUrl("");
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this job milestone?")) return;
    
    // If we delete the milestone currently being edited, cancel edit mode
    if (editIndex === index) {
      setEditIndex(null);
      reset();
      setImageUrl("");
    } else if (editIndex !== null && editIndex > index) {
      // Adjust edit index to prevent index mismatch
      setEditIndex(editIndex - 1);
    }

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
          url: imageUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80",
          width: 100,
          height: 100,
          alt: data.company
        }
      };

      let updated = [...jobs];
      if (editIndex !== null) {
        updated[editIndex] = submittedJob;
      } else {
        updated = [submittedJob, ...updated];
      }

      const res = await updateExperienceAction(updated);
      if (res.success) {
        setJobs(updated);
        toast.success(editIndex !== null ? "Milestone updated successfully!" : "Milestone added successfully!");
        setEditIndex(null);
        reset();
        setImageUrl("");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save milestone.");
    }
  };


  return (
    <div className="flex flex-col gap-6 w-full md:h-[calc(100vh-120px)] md:lg:h-[calc(100vh-140px)] md:overflow-hidden animate-in fade-in duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Experience Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full md:flex-1 md:min-h-0 items-start md:items-stretch pb-6 md:pb-2 overflow-y-auto md:overflow-visible">
        {/* Left Column: Form (scrollable on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {editIndex !== null ? "Edit Experience" : "Add New Milestone"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 px-5 md:flex-1 md:overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  id="company"
                  placeholder="e.g. Stripe"
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
                  placeholder="e.g. Senior Software Engineer"
                  {...register("role", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="period" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Period (e.g. 2024 - Present)
                </label>
                <input
                  id="period"
                  placeholder="e.g. 2024 - Present"
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
                  placeholder="Describe your role, accomplishments and impact..."
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
                  placeholder="e.g. Go, TypeScript, gRPC, React"
                  {...register("tagsString", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <ImageSelector
                value={imageUrl}
                onChange={setImageUrl}
                label="Company Logo"
                placeholderUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80"
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
                      onClick={() => { reset(); setImageUrl(""); }}
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
                      {isSubmitting ? "Adding..." : "Add Milestone"}
                    </Button>
                  </>
                )}
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Experience Milestones List (scrollable only on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">Existing Milestones</CardTitle>
            <CardDescription>
              List of active milestones rendered in the public timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <div className="flex flex-col gap-3">
              {jobs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No experience milestones currently featured.</p>
              ) : (
                jobs.map((j, idx) => (
                  <div 
                    key={`${j.company}-${j.role}-${idx}`} 
                    className={`flex items-center justify-between border p-3.5 rounded-lg gap-4 transition-all duration-300 ${
                      editIndex === idx 
                        ? "border-primary/50 bg-primary/5 shadow-xs" 
                        : "border-border/80 bg-muted/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground flex items-center gap-2">
                        {j.company}
                        {editIndex === idx && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider scale-90">
                            Editing
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{j.role} • {j.period}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className={`p-1.5 transition-colors rounded-md ${
                          editIndex === idx 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        }`}
                        title="Edit Milestone"
                      >
                        <RiEdit2Line className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors rounded-md"
                        title="Delete Milestone"
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
