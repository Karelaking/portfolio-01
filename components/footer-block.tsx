import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import type { Route } from "next"

const NAV_LINKS: { label: string; href: Route }[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Expertise", href: "/expertise" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
]

export default function FooterBlock() {
  return (
    <section className="flex w-full flex-col items-stretch bg-background text-foreground">
      <Separator />
      <footer className="w-full px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-3 md:flex-row md:text-left text-center">
            <div
              className="flex size-6 items-center justify-center bg-primary"
              aria-hidden="true"
            >
              <div className="size-2.5 bg-primary-foreground" />
            </div>
            <div className="flex flex-col items-center md:items-start leading-none">
              <span className="text-sm font-bold tracking-tight">Alex Gonzalez</span>
              <span className="text-xs text-muted-foreground">
                Software Engineer & Web Developer
              </span>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-xs"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground text-center md:text-right md:shrink-0">
            &copy; {new Date().getFullYear()} Alex Gonzalez. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  )
}
