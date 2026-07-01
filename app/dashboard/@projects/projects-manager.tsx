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
import { ScrollRevealProjects } from "@/components/scroll-reveal-projects";
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm<ProjectFormValues>({
    defaultValues: {
      title: "",
      tag: "",
      description: "",
      github: "",
      demo: "",
      tagsString: "",
    }
  });

  // Watch for real-time preview simulation
  const title = watch("title");
  const tag = watch("tag");
  const description = watch("description");
  const github = watch("github");
  const demo = watch("demo");
  const tagsString = watch("tagsString");

  const projectTags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(Boolean) : [];

  // Generate preview project array
  const previewProjects = isEditing
    ? projects.map((p, idx) =>
        idx === editIndex
          ? {
              ...p,
              title: title || p.title,
              tag: tag || p.tag,
              description: description || p.description,
              tags: tagsString ? projectTags : p.tags,
              github: github || p.github,
              demo: demo || p.demo,
            }
          : p
      )
    : title
    ? [
        {
          title,
          tag,
          description,
          tags: projectTags,
          github,
          demo: demo || null,
          image: {
            url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
            width: 800,
            height: 600,
            alt: title
          }
        },
        ...projects
      ]
    : projects;

  const handleEdit = (index: number) => {
    const item = projects[index];
    setEditIndex(index);
    setIsEditing(true);
    setValue("title", item.title);
    setValue("tag", item.tag);
    setValue("description", item.description);
    setValue("github", item.github);
    setValue("demo", item.demo || "");
    setValue("tagsString", item.tags.join(", "));
  };

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
      const submittedProject: ProjectItem = {
        title: data.title,
        tag: data.tag,
        description: data.description,
        tags: formattedTags,
        github: data.github,
        demo: data.demo || null,
        image: {
          url: editIndex !== null && projects[editIndex] ? projects[editIndex].image.url : "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80",
          width: 800,
          height: 600,
          alt: data.title
        }
      };

      let updated = [...projects];
      if (isEditing && editIndex !== null) {
        updated[editIndex] = submittedProject;
      } else {
        updated = [submittedProject, ...updated];
      }

      const res = await updateProjectsAction(updated);
      if (res.success) {
        setProjects(updated);
        toast.success(isEditing ? "Project updated successfully!" : "Project added successfully!");
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

  // ResizeObserver to calculate scale
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
          <h1 className="text-2xl font-bold tracking-tight">Projects Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your open-source application entries and feature highlights.
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
            Add New Project
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor or Items List (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader className="border-b border-border/40 bg-muted/10">
            <CardTitle className="text-base font-bold">
              {isEditing ? (editIndex !== null ? "Edit Project" : "Add Project") : "All Projects"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Fill in fields to save changes." : "List of projects currently featured on the site."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Project Title
                  </label>
                  <input
                    id="title"
                    {...register("title", { required: true })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tag" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Tag (e.g., SYSTEMS, FRONTEND)
                  </label>
                  <input
                    id="tag"
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
                      {...register("demo")}
                      className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                    />
                  </div>
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
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {projects.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No projects found. Click Add New to create one.</p>
                ) : (
                  projects.map((p, idx) => (
                    <div key={p.title} className="flex items-center justify-between border border-border/80 bg-muted/10 p-3.5 rounded-lg gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-foreground">{p.title}</p>
                        <p className="text-xs text-muted-foreground truncate mt-1">{p.description}</p>
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
              <ScrollRevealProjects projects={previewProjects} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
