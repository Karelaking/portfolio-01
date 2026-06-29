"use client";

import React from 'react'
import { ThemeProvider } from "next-themes";
import { ScrollProgress } from './scroll-progress';

const Provider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollProgress />
      {children}
    </ThemeProvider>
  )
}

export default Provider;