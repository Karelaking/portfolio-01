"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { RiArrowRightLine, RiMenuLine } from "@remixicon/react";
import React from "react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavProps {
  navLinks: NavLink[];
}

const MobileNav = ({ navLinks }: MobileNavProps): React.ReactNode => {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-input/50 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 outline-none md:hidden"
        aria-label="Open menu"
      >
        <RiMenuLine className="size-4" aria-hidden="true" />
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
            Alex Gonzalez
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
            render={<a href="/contact" />}
            nativeButton={false}
            className="w-full"
          >
            Get in Touch
            <RiArrowRightLine
              data-icon="inline-end"
              aria-hidden="true"
            />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
