import React from "react";

export type BadgeVariant =
  | "Public"
  | "Public archive"
  | "Archived"
  | "Manifest"
  | "Contribution"
  | "Experiment"
  | "Academic"
  | string;

const BADGE_STYLES: Record<string, string> = {
  Public: "border-border/80 text-muted-foreground bg-muted/40",
  "Public archive":
    "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10",
  Archived:
    "border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10",
  Manifest:
    "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10",
  Contribution:
    "border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  Experiment:
    "border-cyan-500/40 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10",
  Academic:
    "border-indigo-500/40 text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
  Maintained:
    "border-teal-500/40 text-teal-600 dark:text-teal-400 bg-teal-500/10",
};

interface ProjectBadgeProps {
  badge?: string | string[];
  archived?: boolean;
  className?: string;
}

export function ProjectBadge({
  badge,
  archived,
  className = "",
}: ProjectBadgeProps) {
  let badgeList: string[] = [];

  if (Array.isArray(badge)) {
    badgeList = badge;
  } else if (typeof badge === "string" && badge.trim() !== "") {
    badgeList = [badge.trim()];
  } else if (archived) {
    badgeList = ["Public archive"];
  } else {
    badgeList = ["Public"];
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 shrink-0 ${className}`}
    >
      {badgeList.map((badgeItem, index) => {
        const styleClass =
          BADGE_STYLES[badgeItem] ||
          "border-border/80 text-muted-foreground bg-muted/40";

        return (
          <span
            key={index}
            className={`text-[11px] font-medium font-jetbrains border px-2 py-0.5 rounded-full shrink-0 transition-colors ${styleClass}`}
          >
            {badgeItem}
          </span>
        );
      })}
    </div>
  );
}
