import React from "react";

const LANGUAGE_COLORS: Record<string, string> = {
  Rust: "#dea584",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  C: "#555555",
  "C++": "#f34b7d",
  "Embedded C": "#555555",
  Java: "#b07219",
  Go: "#00ADD8",
  Python: "#3572A5",
  Lua: "#000080",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

interface LanguageIconProps {
  language?: string;
  children?: string;
  className?: string;
}

export function LanguageIcon({
  language,
  children,
  className = "",
}: LanguageIconProps) {
  const lang = language || children;
  if (!lang) return null;

  const color = LANGUAGE_COLORS[lang] || "#8b949e";

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-xs text-muted-foreground ${className}`}
    >
      <span
        className="w-3 h-3 rounded-full shrink-0 inline-block border border-black/10 dark:border-white/10"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="font-medium font-jetbrains text-xs text-foreground/80">
        {lang}
      </span>
    </div>
  );
}
