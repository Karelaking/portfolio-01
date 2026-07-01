"use client";
"use no memo";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiDeleteBin6Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { updateProjectsAction } from "@/app/actions";

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

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      github: "",
      demo: "",
      tagsString: "",
    }
  });

  const handleDelete = async (index: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
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
      const newProject: ProjectItem = {
        title: data.title,
        tag: data.tag,
        description: data.description,
        tags: formattedTags,
        github: data.github,
        demo: data.demo || null,
        image: {
          url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
          width: 800,
          height: 600,
          alt: data.title
        }
      };

      const updated = [newProject, ...projects];

      const res = await updateProjectsAction(updated);
      if (res.success) {
        setProjects(updated);
        toast.success("Project added successfully!");
        reset();
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
        {/* Left Column: Add New Project Form (h-fit, no internal scrolling or scrollbars) */}
        <Card className="border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden h-fit flex flex-col">
          <CardHeader className="border-b border-border/40 bg-muted/10 shrink-0">
            <CardTitle className="text-base font-bold">Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
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

              <Separator className="my-2" />

              <div className="flex items-center justify-end gap-3 pb-2">
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
                  {isSubmitting ? "Adding..." : "Add Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Existing Projects List (md:h-full, scrollable only on desktop) */}
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
                  <div key={`${p.title}-${idx}`} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate text-foreground">{p.title}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{p.description}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="p-1.5 hover:text-destructive transition-colors hover:bg-muted rounded-md shrink-0"
                      title="Delete Project"
                    >
                      <RiDeleteBin6Line className="size-4" />
                    </button>
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
