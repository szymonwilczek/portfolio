"use client";

import { useEffect, useState, useMemo, memo } from "react";
import { GitBranch } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  totalContributions: number;
  weeks: { days: ContributionDay[] }[];
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-foreground/20 dark:bg-[#1a2028]",
  1: "bg-[#6db87a] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
};

const DayCell = memo(function DayCell({ day }: { day: ContributionDay }) {
  return (
    <div
      className={`w-[10.5px] h-[10.5px] rounded-[2px] ${LEVEL_COLORS[day.level]} hover:ring-1 hover:ring-primary cursor-pointer`}
      title={`${day.count} commits on ${day.date}`}
    />
  );
});

const WeekColumn = memo(function WeekColumn({ days }: { days: ContributionDay[] }) {
  return (
    <div className="flex flex-col gap-[3px]">
      {days.map((day, i) => (
        <DayCell key={i} day={day} />
      ))}
    </div>
  );
});

const Legend = memo(function Legend() {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[level]}`}
        />
      ))}
      <span>More</span>
    </div>
  );
});

export const GitHubHeatmap = memo(function GitHubHeatmap() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch("/api/github/contributions");
        if (res.ok) {
          const contributions = await res.json();
          setData(contributions);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const weeks = useMemo(() => data?.weeks || [], [data?.weeks]);

  return (
    <div className="relative rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-purple-500" />
          <h3 className="font-bold font-outfit text-xs uppercase tracking-widest text-muted-foreground">
            GitHub Activity
          </h3>
        </div>
        {data && (
          <span className="text-xs text-muted-foreground font-mono">
            {data.totalContributions} commits
          </span>
        )}
      </div>

      {loading ? (
        <div className="h-20 bg-muted animate-pulse rounded" />
      ) : error || !data ? (
        <div className="h-20 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Unable to load activity</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="overflow-x-auto py-1">
            <div className="flex justify-center mx-auto gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <WeekColumn key={weekIndex} days={week.days} />
              ))}
            </div>
          </div>
          <Legend />
        </div>
      )}
    </div>
  );
});
