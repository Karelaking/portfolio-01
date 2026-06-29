"use client";

import React from "react";
import { LoaderBars } from "@/components/bars";

export default function Loading(): React.ReactNode {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-4">
        <LoaderBars count={5} barHeight={40} barWidth={5} gap={5} duration={1.2} />
        <p className="text-xs font-mono font-medium tracking-widest text-muted-foreground uppercase animate-pulse">
          Loading Systems...
        </p>
      </div>
    </div>
  );
}
