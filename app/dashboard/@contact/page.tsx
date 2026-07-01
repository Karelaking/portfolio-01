"use client";
"use no memo";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StrokeDraw } from "@/components/stroke-draw";
import { RiSaveLine, RiRefreshLine, RiMapPin2Line, RiEarthLine, RiPhoneLine } from "@remixicon/react";
import ContactForm from "@/components/contact-form";

import { updateContactAction } from "@/app/actions";

import { useRouter } from "next/navigation";

type ContactFormValues = {
  location: string;
  remoteInfo: string;
  email: string;
};

export default function ContactEditor() {
  const router = useRouter();

  const { register, handleSubmit, reset, watch, formState: { isSubmitting } } = useForm<ContactFormValues>({
    defaultValues: {
      location: "Berlin, Germany",
      remoteInfo: "Available worldwide (UTC+1 / UTC+2 timezone alignment)",
      email: "alex@gonzalez.dev",
    }
  });

  const location = watch("location");
  const remoteInfo = watch("remoteInfo");
  const email = watch("email");

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await updateContactAction(data);
      if (res.success) {
        toast.success("Contact details updated successfully!");
        router.refresh();
      } else {
        toast.error("Failed to update contact details.");
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
        <h1 className="text-2xl font-bold tracking-tight">Contact Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update primary details (office location, remote capabilities, emails) shown on your contact profile.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5 w-full items-start">
        {/* Left Column: Form Editor (40% width) */}
        <Card className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-xs rounded-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-bold">Edit Contact Details</CardTitle>
            <CardDescription>
              Modify office metrics below. Syncs with contact card highlights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Office Location
                </label>
                <input
                  id="location"
                  {...register("location", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="remoteInfo" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Remote Work Policy
                </label>
                <input
                  id="remoteInfo"
                  {...register("remoteInfo", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Contact Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded-lg focus:outline-hidden focus:border-primary/50"
                />
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
          <CardContent ref={containerRef} className="p-0 overflow-y-auto max-h-[550px] relative bg-muted/10 flex flex-col justify-start items-center">
            {/* Scale wrapper dynamically adjusted to container width */}
            <div 
              className="shrink-0"
              style={{
                width: "1024px",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                paddingBottom: `calc(100% * (1 - ${scale}))`,
              }}
            >
              <div className="p-12 w-full grid gap-8 md:grid-cols-2">
                <ContactForm />
                <div className="flex flex-col gap-6">
                  {/* Location radius */}
                  <div className="relative h-44 w-full overflow-hidden border border-border bg-card">
                    <div className="absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/5" />
                    <span className="absolute top-1/2 left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <RiMapPin2Line className="size-4" />
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Card className="border border-border/60">
                      <CardContent className="flex items-center gap-3 py-3">
                        <span className="flex size-8 items-center justify-center border border-border bg-muted">
                          <RiMapPin2Line className="size-4 text-muted-foreground" />
                        </span>
                        <div>
                          <p className="text-[11px] font-bold">Location</p>
                          <p className="text-[10px] text-muted-foreground">{location}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-border/60">
                      <CardContent className="flex items-center gap-3 py-3">
                        <span className="flex size-8 items-center justify-center border border-border bg-muted">
                          <RiEarthLine className="size-4 text-muted-foreground" />
                        </span>
                        <div>
                          <p className="text-[11px] font-bold">Remote Work</p>
                          <p className="text-[10px] text-muted-foreground">{remoteInfo}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-border/60">
                      <CardContent className="flex items-center gap-3 py-3">
                        <span className="flex size-8 items-center justify-center border border-border bg-muted">
                          <RiPhoneLine className="size-4 text-muted-foreground" />
                        </span>
                        <div>
                          <p className="text-[11px] font-bold">Primary Contact</p>
                          <p className="text-[10px] text-muted-foreground">{email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
