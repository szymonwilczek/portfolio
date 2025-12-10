'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface TimelineEntry {
  id: number | string;
  date: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

interface TimelineProps {
  items: TimelineEntry[];
  className?: string;
}

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("w-full max-w-3xl flex flex-col space-y-8", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="grid grid-cols-[24px_1fr] gap-6"
          >
            <div className="relative flex flex-col items-center">
              <div
                className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background",
                  item.isCurrent
                    ? "border-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]"
                    : "border-muted-foreground/30"
                )}
              >
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    item.isCurrent ? "bg-emerald-500" : "bg-muted-foreground/30"
                  )}
                />
              </div>

              {!isLast && (
                <div className="absolute top-6 bottom-[-2.5rem] w-0.5 bg-border" />
              )}
            </div>

            <div className="flex flex-col gap-1 pb-2">
              <span
                className={cn(
                  "text-sm font-mono font-bold tracking-wide w-fit px-2 py-0.5 rounded",
                  item.isCurrent
                    ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "text-muted-foreground bg-secondary/50"
                )}
              >
                {item.date}
              </span>

              <h3 className="text-lg font-semibold text-foreground mt-1 leading-tight">
                {item.title}
              </h3>

              <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
