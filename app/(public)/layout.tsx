
import FooterBlock from '@/components/footer-block';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetFooter } from '@/components/ui/sheet';
import { RiArrowRightLine, RiMenuLine } from '@remixicon/react';
import React from 'react';

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Expertise", href: "/expertise" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col bg-background text-foreground">
        <header className="relative flex h-16 w-full items-center border-b border-border px-6">
          <a href="#" className="flex shrink-0 items-center gap-2.5">
            <div className="grid grid-cols-2 gap-0.5" aria-hidden="true">
              <div className="size-2.5 bg-primary" />
              <div className="size-2.5 bg-primary" />
              <div className="size-2.5 bg-primary" />
              <div className="size-2.5 bg-primary" />
            </div>
            <span className="text-base font-bold tracking-tight">Acme</span>
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                render={<a href={link.href} />}
                nativeButton={false}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3">
            <Button
              render={<a href="#" />}
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Sign In
            </Button>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <Button
              render={<a href="#" />}
              nativeButton={false}
              size="sm"
              className="hidden sm:inline-flex"
            >
              Start Free Trial
              <RiArrowRightLine data-icon="inline-end" aria-hidden="true" />
            </Button>

            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="md:hidden" />
                }
                aria-label="Open menu"
              >
                <RiMenuLine aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-xs">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5">
                    <div
                      className="grid grid-cols-2 gap-0.5"
                      aria-hidden="true"
                    >
                      <div className="size-2 bg-primary" />
                      <div className="size-2 bg-primary" />
                      <div className="size-2 bg-primary" />
                      <div className="size-2 bg-primary" />
                    </div>
                    Acme
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-2">
                  {navLinks.map((link) => (
                    <SheetClose
                      key={link.label}
                      render={<a href={link.href} />}
                      nativeButton={false}
                      className="px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {link.label}
                    </SheetClose>
                  ))}
                </nav>
                <SheetFooter>
                  <Button
                    render={<a href="#" />}
                    nativeButton={false}
                    variant="ghost"
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    render={<a href="#" />}
                    nativeButton={false}
                    className="w-full"
                  >
                    Start Free Trial
                    <RiArrowRightLine
                      data-icon="inline-end"
                      aria-hidden="true"
                    />
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="flex-1 px-6 mx-auto w-full max-w-6xl">
          {children}
        </div>
        <FooterBlock  />
      </main>
    </>
  );
}

export default Layout