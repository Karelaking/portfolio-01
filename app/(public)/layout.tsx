import { AppRoutes } from "@/.next/dev/types/routes";
import FooterBlock from "@/components/footer-block";
import MobileNav from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import React from "react";

const navLinks: { label: string; href: AppRoutes }[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Expertise", href: "/expertise" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col bg-background text-foreground">
        <header className="relative flex h-16 w-full items-center border-b border-border px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="text-base font-bold tracking-tight">Alex Gonzalez</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <ThemeToggle />
            <MobileNav navLinks={navLinks} />
          </div>
        </header>

        <div className="flex-1 px-4 sm:px-6 mx-auto w-full max-w-6xl">{children}</div>
        <FooterBlock />
      </main>
    </>
  );
};

export default Layout;
