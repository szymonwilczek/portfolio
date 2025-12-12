"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { Code2, Clock } from "lucide-react";

interface WakaTimeData {
  totalHours: number;
  languages: { name: string; percent: number }[];
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Rust: "#DEA584",
  Python: "#3776AB",
  C: "#A8B9CC",
  "C++": "#00599C",
  Lua: "#000080",
  Go: "#00ADD8",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Markdown: "#083FA1",
  JSON: "#292929",
  YAML: "#CB171E",
  Bash: "#4EAA25",
};

const LanguageBar = memo(function LanguageBar({
  name,
  percent,
  animatedPercent
}: {
  name: string;
  percent: number;
  animatedPercent: number;
}) {
  const backgroundColor = LANGUAGE_COLORS[name] || "hsl(var(--primary))";

  return (
    <div className="space-y-0.5">
      <div className="flex justify-between text-[10px]">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-muted-foreground font-mono">
          {percent.toFixed(0)}%
        </span>
      </div>
      <div className="h-1.5 bg-foreground/20 rounded-sm overflow-hidden">
        <div
          className="h-full rounded-sm will-change-[width]"
          style={{
            width: `${animatedPercent}%`,
            backgroundColor,
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
});

const LoadingState = memo(function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="h-10 bg-foreground/20 animate-pulse rounded" />
      <div className="space-y-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3 bg-foreground/20 animate-pulse rounded" />
        ))}
      </div>
    </div>
  );
});

const ErrorState = memo(function ErrorState() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-muted/50 rounded-md flex items-center justify-center">
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm text-foreground">No Data</p>
        <p className="text-xs text-muted-foreground">WakaTime unavailable</p>
      </div>
    </div>
  );
});

export const WakaTimeStats = memo(function WakaTimeStats() {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/wakatime/stats");
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
          requestAnimationFrame(() => {
            setIsAnimated(true);
          });
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const languages = useMemo(() =>
    data?.languages?.slice(0, 5) || [],
    [data?.languages]
  );

  const formattedHours = useMemo(() =>
    data?.totalHours?.toFixed(1) || "0",
    [data?.totalHours]
  );

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Code2 className="h-4 w-4 text-blue-500" />
        <h3 className="font-bold font-outfit text-xs uppercase tracking-widest text-muted-foreground">
          Weekly Coding
        </h3>
      </div>

      {loading ? (
        <LoadingState />
      ) : error || !data ? (
        <ErrorState />
      ) : (
        <div className="space-y-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground font-mono">
              {formattedHours}
            </span>
            <span className="text-xs text-muted-foreground">hrs this week</span>
          </div>

          <div className="space-y-1.5">
            {languages.map((lang) => (
              <LanguageBar
                key={lang.name}
                name={lang.name}
                percent={lang.percent}
                animatedPercent={isAnimated ? lang.percent : 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
