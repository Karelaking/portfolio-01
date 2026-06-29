import { RiAddLine, RiDownloadLine } from "@remixicon/react"

import { Button } from "@/components/ui/button"

export default function PageHeader({title, description, action}: {title: string, description: string, action?: React.ReactNode}) {
  return (
    <section className="w-full bg-background px-6 py-12 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {action}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 border border-border bg-muted/30" />
          ))}
        </div>
      </div>
    </section>
  )
}
