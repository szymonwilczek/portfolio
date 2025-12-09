"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { HamburgerIcon } from "./HamburgerIcon";
import { Logo } from "./Logo";
import { ThemeToggler } from "./ThemeToggler";

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> { }

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const navigationLinks = [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Works" },
      { href: "/about", label: "About" },
    ];

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };

      checkWidth();
      window.addEventListener("resize", checkWidth);
      return () => window.removeEventListener("resize", checkWidth);
    }, []);

    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.RefObject<HTMLElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">

          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          {!isMobile && (
            <NavigationMenu>
              <NavigationMenuList>
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        active={pathname === link.href}
                        className={navigationMenuTriggerStyle()}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}

          <div className="flex items-center gap-2">
            <ThemeToggler />

            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="group"
                    aria-label="Menu"
                  >
                    <HamburgerIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 flex flex-col gap-4">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
