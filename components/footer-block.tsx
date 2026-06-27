import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

export default function FooterBlock() {
  return (
    <section className="flex w-full flex-col items-stretch bg-background text-foreground">
      <Separator />
      <footer className="w-full px-6 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex size-6 items-center justify-center bg-primary"
              aria-hidden="true"
            >
              <div className="size-2.5 bg-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">Acme</span>
              <span className="text-xs text-muted-foreground">
                Build fast. Ship faster.
              </span>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-5 gap-y-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="shrink-0 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Acme, Inc.
          </p>
        </div>
      </footer>
    </section>
  )
}
