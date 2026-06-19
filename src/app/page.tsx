"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scene } from "@/components/3d/Scene";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Github,
  Briefcase,
  Terminal,
  Mail,
  FileText,
} from "lucide-react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { Section, SectionTitle } from "@/components/layout/Section";
import { Paragraph } from "@/components/layout/Paragraph";
import { DiscordIcon } from "@/components/icons/DicordIcon";
import { toast } from "sonner";
import { getActiveEvent } from "@/config/events";
import { EVENT_TOASTS } from "@/config/eventToasts";
import { useEffect } from "react";
import { useTheme } from "next-themes";

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    date: "2025",
    title: "Linux Kernel Contributor",
    description:
      "Searching for and fixing bugs in mainline - UAF, Out-of-bounds reads, races across filesystems and some drivers.",
    isCurrent: true,
    urls: [
      {
        name: "View on kernel.org",
        url: "https://lore.kernel.org/all/?q=swilczek.lx@gmail.com",
      },
    ],
  },
  {
    id: 2,
    date: "2025",
    title: "Web Developer @ FAMUR",
    description:
      "Backend-heavy web apps for the mining industry. PHP, legacy data, not glamorous. The kind of system nobody notices until it loses a row - so it doesn't.",
    isCurrent: false,
  },
  {
    id: 3,
    date: "2023",
    title: "Computer Science Student",
    description:
      "Currently in the 6th semester at Silesian University of Technology. Focusing on software engineering principles and their application in modern development.",
    isCurrent: true,
  },
  {
    id: 4,
    date: "2022",
    title: "Freelance Full-stack Developer",
    description:
      'Built apps for whoever was paying. Learned that "done" means it works on the client\'s machine, not mine.',
    isCurrent: false,
  },
  {
    id: 5,
    date: "2017",
    title: "First Lines of Code",
    description:
      "Wrote my first code. Most of it didn't compile. Kept going anyway - turns out that's the whole job.",
    isCurrent: false,
  },
  {
    id: 6,
    date: "2005",
    title: "Hello World",
    description: "Born in Poland - PID: 1.",
    isCurrent: false,
  },
];

export default function Home() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const hasShown = sessionStorage.getItem("has-shown-event-toast");
    if (hasShown) return;

    const activeEvent = getActiveEvent(new Date());

    if (activeEvent && EVENT_TOASTS[activeEvent]) {
      const config = EVENT_TOASTS[activeEvent];
      const isDark = resolvedTheme === "dark";
      const palette = isDark ? config.palette.dark : config.palette.light;

      const timer = setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        toast(config.title, {
          description: config.description,
          icon: config.icon,
          duration: 4000,
          position: isMobile ? "bottom-center" : "top-right",
          style: {
            "--toast-bg": palette.bg,
            "--toast-text": palette.text,
            "--toast-border": palette.border,
            "--toast-muted": palette.muted,
          } as React.CSSProperties,
        });

        sessionStorage.setItem("has-shown-event-toast", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-background transition-colors duration-300">
      <Section className="-mt-12 z-10 relative" noAnimation={true}>
        <div className="relative flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl tracking-wider font-jetbrains font-bold">
              Szymon Wilczek
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Systems programmer. Mostly C, mostly Linux.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="sm" className="font-semibold">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="absolute top-6 right-6 md:static"
              >
                <Link
                  href="/Szymon-Wilczek-CV_ENG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="mr-2 h-4 w-4" /> View CV
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="https://github.com/szymonwilczek" target="_blank">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="relative shrink-0 pr-8 select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl rotate-3 transition-transform duration-300 pointer-events-none">
              <Image
                src="/avatar.png"
                alt="Szymon Wilczek"
                fill
                className="object-cover object-center transition-all duration-500 sepia-[.5] dark:sepia-[.4] dark:hue-rotate-[190deg] dark:brightness-[0.85] dark:contrast-[1.1]"
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay="delay-100">
        <SectionTitle icon={Terminal}>About</SectionTitle>
        <Paragraph>
          The degree is almost done. It taught me a lot, but still less than a
          few weeks of reading the kernel source did. <br /> I care about how
          things actually work - what the bytes do, where the memory goes, why
          the lock is there. Most of what I do is reading other people's code,
          figuring out why it falls over, and making it fall over <i>less</i>.
        </Paragraph>
      </Section>

      <Section delay="delay-200">
        <h4 className="text-sm font-jetbrains font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Technologies I Mostly Work With
        </h4>
        <div className="flex flex-wrap gap-2">
          {["C", "Go", "Lua", "TypeScript", "Rust"].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-3 py-1 text-sm font-jetbrains"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </Section>

      <Section delay="delay-300">
        <SectionTitle icon={Briefcase}>Journey</SectionTitle>
        <div className="mt-8">
          <Timeline items={timelineData} />
        </div>
      </Section>

      <Section delay="delay-500">
        <SectionTitle icon={Mail}>Connect</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="mailto:swilczek.lx@gmail.com"
            className="group flex flex-col sm:flex-row items-center sm:items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-center sm:text-left"
          >
            <div className="p-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <p className="font-jetbrains font-semibold">Email</p>
          </Link>

          <Link
            href="https://discord.gg/4TWmMfMU6N"
            target="_blank"
            className="group flex flex-col sm:flex-row items-center sm:items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-center sm:text-left"
          >
            <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </div>
            <p className="font-jetbrains font-semibold">Discord</p>
          </Link>
        </div>
      </Section>
    </main>
  );
}
