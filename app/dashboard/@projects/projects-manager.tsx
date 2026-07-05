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
import { updateProjectsAction } from "@/app/actions";
import { ImageSelector } from "@/components/image-selector";


type ProjectItem = {
  title: string;
  tag: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
  image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

type ProjectFormValues = {
  title: string;
  tag: string;
  description: string;
  github: string;
  demo: string;
  tagsString: string;
};

export default function ProjectsManager({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      github: "",
      demo: "",
      tagsString: "",
    }
  });

  const handleEdit = (index: number) => {
    const p = projects[index];
    setEditIndex(index);
    setValue("title", p.title);
    setValue("tag", p.tag);
    setValue("description", p.description);
    setValue("tagsString", p.tags.join(", "));
    setValue("github", p.github);
    setValue("demo", p.demo || "");
    setImageUrl(p.image.url);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    reset();
    setImageUrl("");
  };

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    // If we delete the project currently being edited, cancel edit mode
    if (editIndex === index) {
      setEditIndex(null);
      reset();
      setImageUrl("");
    } else if (editIndex !== null && editIndex > index) {
      // Adjust edit index to prevent index mismatch
      setEditIndex(editIndex - 1);
    }

    const updated = projects.filter((_, idx) => idx !== index);
    setProjects(updated);

    try {
      const res = await updateProjectsAction(updated);
      if (res.success) {
        toast.success("Project deleted successfully!");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete project.");
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const formattedTags = data.tagsString ? data.tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];
      const submittedProject: ProjectItem = {
        title: data.title,
        tag: data.tag,
        description: data.description,
        tags: formattedTags,
        github: data.github,
        demo: data.demo || null,
        image: {
          url: imageUrl || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
          width: 800,
          height: 600,
          alt: data.title
        }
      };

      let updated = [...projects];
      if (editIndex !== null) {
        updated[editIndex] = submittedProject;
      } else {
        updated = [submittedProject, ...updated];
      }

      const res = await updateProjectsAction(updated);
      if (res.success) {
        setProjects(updated);
        toast.success(editIndex !== null ? "Project updated successfully!" : "Project added successfully!");
        setEditIndex(null);
        reset();
        setImageUrl("");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save project.");
    }
  };


  return (
    <div className="flex flex-col gap-6 w-full md:h-[calc(100vh-120px)] md:lg:h-[calc(100vh-140px)] md:overflow-hidden animate-in fade-in duration-300">
      <div className="shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Projects Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full md:flex-1 md:min-h-0 items-start md:items-stretch pb-6 md:pb-2 overflow-y-auto md:overflow-visible">
        {/* Left Column: Form (scrollable on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">
              {editIndex !== null ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Project Title
                </label>
                <input
                  id="title"
                  placeholder="e.g. HyperSync Protocol"
                  {...register("title", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tag" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category Tag (e.g. SYSTEMS, FRONTEND)
                </label>
                <input
                  id="tag"
                  placeholder="e.g. SYSTEMS"
                  {...register("tag", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe your project, features and architecture..."
                  {...register("description", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="tagsString" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Technologies (Comma Separated)
                </label>
                <input
                  id="tagsString"
                  placeholder="e.g. TypeScript, Go, WebAssembly"
                  {...register("tagsString", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="github" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    GitHub URL
                  </label>
                  <input
                    id="github"
                    type="url"
                    placeholder="https://github.com/..."
                    {...register("github", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="demo" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Demo URL (Optional)
                  </label>
                  <input
                    id="demo"
                    type="url"
                    placeholder="https://..."
                    {...register("demo")}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>
              </div>

              <ImageSelector
                value={imageUrl}
                onChange={setImageUrl}
                label="Project Screenshot"
                placeholderUrl="https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80"
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
                      {isSubmitting ? "Adding..." : "Add Project"}
                    </Button>
                  </>
                )}
              </div>

            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Projects List (scrollable only on desktop) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden flex flex-col md:h-full">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">Existing Projects</CardTitle>
            <CardDescription>
              List of active projects rendered in the public portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:flex-1 md:overflow-y-auto">
            <div className="flex flex-col gap-3">
              {projects.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No projects currently featured.</p>
              ) : (
                projects.map((p, idx) => (
                  <div 
                    key={`${p.title}-${idx}`} 
                    className={`flex items-center justify-between border p-3.5 rounded-lg gap-4 transition-all duration-300 ${
                      editIndex === idx 
                        ? "border-primary/50 bg-primary/5 shadow-xs" 
                        : "border-border/80 bg-muted/10"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground flex items-center gap-2">
                        {p.title}
                        {editIndex === idx && (
                          <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider scale-90">
                            Editing
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEdit(idx)}
                        className={`p-1.5 transition-colors rounded-md ${
                          editIndex === idx 
                            ? "text-primary bg-primary/10 hover:bg-primary/20" 
                            : "text-muted-foreground hover:text-primary hover:bg-muted"
                        }`}
                        title="Edit Project"
                      >
                        <RiEdit2Line className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors rounded-md"
                        title="Delete Project"
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
