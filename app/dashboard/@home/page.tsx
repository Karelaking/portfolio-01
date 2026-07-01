"use client";
"use no memo";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine } from "@remixicon/react";
import { HeroSection } from "@/components/hero-section";

import { updateHeroAction } from "@/app/actions";

import { useRouter } from "next/navigation";

type HeroFormValues = {
  greeting: string;
  name: string;
  role: string;
  subheading: string;
  resumeUrl: string;
  githubUrl: string;
};

export default function HomeEditor() {
  const router = useRouter();

  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm<HeroFormValues>({
    defaultValues: {
      greeting: "HELLO",
      name: "Alex Gonzalez",
      role: "Senior Software Engineer",
      subheading: "I design and build reliable, highly performant systems, custom automation tooling, and beautiful web interfaces.",
      resumeUrl: "https://alexgonzalez.dev/resume.pdf",
      githubUrl: "https://github.com/alexgonzalez",
    }
  });

  // Real-time values watcher for preview
  const greeting = watch("greeting");
  const name = watch("name");
  const role = watch("role");
  const subheading = watch("subheading");
  const resumeUrl = watch("resumeUrl");
  const githubUrl = watch("githubUrl");

  const onSubmit = async (data: HeroFormValues) => {
    try {
      const res = await updateHeroAction(data);
      if (res.success) {
        toast.success("Hero settings updated successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update settings.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save changes.");
    }
  };



  // ResizeObserver to calculate real-time scale factor
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setScale(width / 1024);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hero Section Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize the main entrance copy, roles, and profile links shown on the homepage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-bold">Edit Hero Section</CardTitle>
            <CardDescription>
              Modify values below to update the homepage main section.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="greeting" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
                  <span>Default Greeting</span>
                  <span className="text-[10px] lowercase font-normal text-muted-foreground">comma-separated for cycling animation</span>
                </label>
                <input
                  id="greeting"
                  placeholder="e.g. HELLO, HOLA, BONJOUR"
                  {...register("greeting", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>


              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Profile Name
                </label>
                <input
                  id="name"
                  {...register("name", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="role" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Primary Job Title / Role
                </label>
                <input
                  id="role"
                  {...register("role", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subheading" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Hero Subheading
                </label>
                <textarea
                  id="subheading"
                  rows={3}
                  {...register("subheading", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="resumeUrl" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Resume URL
                  </label>
                  <input
                    id="resumeUrl"
                    type="url"
                    {...register("resumeUrl")}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="githubUrl" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    GitHub Profile Link
                  </label>
                  <input
                    id="githubUrl"
                    type="url"
                    {...register("githubUrl")}
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
                  {isSubmitting ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </form>
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
              <HeroSection
                greeting={greeting}
                name={name}
                role={role}
                subheading={subheading}
                resumeUrl={resumeUrl}
                githubUrl={githubUrl}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
