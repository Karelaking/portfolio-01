"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RiAlertLine, RiRefreshLine } from "@remixicon/react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  useEffect(() => {
    console.error("App error boundary caught error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="mx-auto w-full max-w-md text-center border border-border bg-card p-8 rounded-none">
        <div className="mx-auto flex size-12 items-center justify-center border border-border bg-muted/30 rounded-none">
          <RiAlertLine className="size-6 text-destructive" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground">
          Something went wrong
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          An unexpected error occurred while loading this page. Please try reloading the segment or returning to the home page.
        </p>
        
        {error?.message && (
          <pre className="mt-4 border border-border bg-muted/20 p-3 font-mono text-[10px] text-left text-muted-foreground overflow-auto max-h-32 rounded-none">
            {error.message}
          </pre>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button onClick={reset} className="w-full rounded-none">
            <RiRefreshLine className="size-3.5" data-icon="inline-start" aria-hidden="true" />
            Try Again
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-none"
            render={<Link href="/" />}
            nativeButton={false}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
