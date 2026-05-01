"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "blog-light-theme-nudge-shown";

export function ReadingThemeNudge() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!resolvedTheme) return;
    if (resolvedTheme !== "dark") return;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return;

    sessionStorage.setItem(SESSION_KEY, "1");

    const id = window.setTimeout(() => {
      toast.custom(
        (t) => (
          <div className="w-full sm:w-[360px] rounded-lg border border-border/60 bg-background/95 backdrop-blur-md shadow-lg p-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 text-primary p-1.5">
                <Sun className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground">
                  Prefer easier reading?
                </p>
                <p className="text-xs text-muted-foreground">
                  Light theme is tuned for long-form reading. Want to switch?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toast.dismiss(t)}
              >
                Keep dark
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setTheme("light");
                  toast.dismiss(t);
                }}
              >
                Switch to light
              </Button>
            </div>
          </div>
        ),
        { duration: 10000 },
      );
    }, 600);

    return () => window.clearTimeout(id);
  }, [resolvedTheme, setTheme]);

  return null;
}
