"use client";

import React from 'react'
import { ThemeProvider } from "next-themes";
import { ScrollProgress } from './scroll-progress';
import { TooltipProvider } from "@/components/ui/tooltip";

const Provider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <ScrollProgress />
        {children}
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default Provider;