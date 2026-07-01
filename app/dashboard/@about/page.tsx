"use client";
"use no memo";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine } from "@remixicon/react";
import { Separator } from "@/components/ui/separator";
import AboutContent from "@/components/about-content";

import { updateAboutAction } from "@/app/actions";

import { useRouter } from "next/navigation";

type AboutFormValues = {
  journeyTitle: string;
  bioParagraph1: string;
  bioParagraph2: string;
  experienceYears: number;
  skillsList: string;
};

export default function AboutEditor() {
  const router = useRouter();

  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm<AboutFormValues>({
    defaultValues: {
      journeyTitle: "Crafting elegant software architectures and intuitive interfaces",
      bioParagraph1: "I am a software engineer dedicated to building clean, maintainable, and highly performant digital systems. My passion lies in bridging the gap between intricate backend systems and beautiful frontend designs.",
      bioParagraph2: "Over the past seven years, I have collaborated with startups and established teams to design and implement scalable component libraries, automated CI/CD pipelines, and high-performance server architectures.",
      experienceYears: 7,
      skillsList: "TypeScript, Next.js, Go, Python, Rust, Tailwind CSS, PostgreSQL, Docker",
    }
  });

  // Watch values for real-time preview rendering
  const journeyTitle = watch("journeyTitle");
  const bioParagraph1 = watch("bioParagraph1");
  const bioParagraph2 = watch("bioParagraph2");
  const experienceYears = watch("experienceYears");
  const skillsList = watch("skillsList");

  const onSubmit = async (data: AboutFormValues) => {
    try {
      const tagsArray = data.skillsList.split(",").map(t => t.trim()).filter(Boolean);
      const res = await updateAboutAction({
        journeyTitle: data.journeyTitle,
        bioParagraph1: data.bioParagraph1,
        bioParagraph2: data.bioParagraph2,
        experienceYears: Number(data.experienceYears),
        skillsList: tagsArray,
      });
      if (res.success) {
        toast.success("About settings updated successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update settings.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save changes.");
    }
  };



  const tags = skillsList ? skillsList.split(",").map(t => t.trim()).filter(Boolean) : [];

  // ResizeObserver to calculate real-time scale factor
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About Section Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update the journey biography paragraphs, skills list tags, and metrics shown on your about profile.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-bold">Edit Profile Content</CardTitle>
            <CardDescription>
              Modify biography paragraphs and skills. Changes sync directly to the public About page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="journeyTitle" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Journey Heading
                </label>
                <input
                  id="journeyTitle"
                  {...register("journeyTitle", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bioParagraph1" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bio Paragraph 1
                </label>
                <textarea
                  id="bioParagraph1"
                  rows={4}
                  {...register("bioParagraph1", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bioParagraph2" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Bio Paragraph 2
                </label>
                <textarea
                  id="bioParagraph2"
                  rows={4}
                  {...register("bioParagraph2", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50 resize-y"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="experienceYears" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Years of Experience
                  </label>
                  <input
                    id="experienceYears"
                    type="number"
                    {...register("experienceYears", { required: true, min: 0 })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="skillsList" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Core Technologies (Comma Separated)
                  </label>
                  <input
                    id="skillsList"
                    {...register("skillsList", { required: true })}
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

        {/* Right Column: Live Mockup Preview of Actual About Page (3/5 width) */}
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
              className="shrink-0"
              style={{
                width: "1024px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                paddingBottom: `calc(100% * (1 - ${scale}))`, // Adjust padding to compensate for scaled transform gap
              }}
            >
              <AboutContent
                journeyTitle={journeyTitle}
                bioParagraph1={bioParagraph1}
                bioParagraph2={bioParagraph2}
                experienceYears={experienceYears ? parseInt(experienceYears.toString()) : undefined}
                skillsList={tags}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
