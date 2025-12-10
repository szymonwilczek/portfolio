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
} from "lucide-react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { Section, SectionTitle } from "@/components/layout/Section";
import { Paragraph } from "@/components/layout/Paragraph";
import { DiscordIcon } from "@/components/icons/DicordIcon";

const timelineData: TimelineEntry[] = [
  {
    id: 1,
    date: "2025",
    title: "Web Developer @ FAMUR",
    description: "Developing comprehensive web application for the mining industry sector. Digitizing industrial processes and managing data workflows using PHP ecosystem.",
    isCurrent: true,
  },
  {
    id: 2,
    date: "2024",
    title: "Freelance Full-stack Developer",
    description: "Developing custom web applications tailored to specific client needs. Delivering modern, high-performance solutions from concept to deployment.",
    isCurrent: true,
  },
  {
    id: 3,
    date: "2023",
    title: "Computer Science Student",
    description: "Currently in the 5th semester at Silesian University of Technology. Focusing on software engineering principles and their application in modern development.",
    isCurrent: true,
  },
  {
    id: 4,
    date: "2005",
    title: "Hello World",
    description: "Born in Poland. Initializing the main process.",
    isCurrent: false,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background transition-colors duration-300">
      <div className="w-full max-w-3xl h-[400px] lg:h-[500px] relative overflow-hidden flex justify-center items-center">
        <div className="w-full max-w-5xl h-full cursor-grab active:cursor-grabbing">
          <Scene />
        </div>
      </div>

      <Section className="-mt-12 z-10 relative">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm">
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl md:text-3xl font-extrabold tracking-tight">
              Szymon Wilczek
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Full-stack Developer building pixel-perfect experiences.
            </p>
            <div className="flex gap-3 pt-2">
              <Button asChild size="sm" className="font-semibold">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="https://github.com/wolfie" target="_blank">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative shrink-0 pr-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl rotate-3 transition-transform hover:rotate-0 duration-300">
              <Image
                src="/profile.jpg"
                alt="Szymon Wilczek"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      <Section delay="delay-100">
        <SectionTitle icon={Terminal}>About</SectionTitle>
        <Paragraph>
          I believe code is a tool to solve real-world problems, not just a way to talk to computers.
          While currently finishing my Computer Science degree, I don't wait for a diploma to build meaningful things.
          I bridge the gap between academic theory and practical, shipping products.
          I help businesses grow by building robust web applications. With a strong foundation in full-stack development,
          I tackle challenges head-on to deliver products that users love.
        </Paragraph>
      </Section>

      <Section delay="delay-200">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Technologies I Mostly Work With
        </h4>
        <div className="flex flex-wrap gap-2">
          {["C", "C++", "TypeScript", "JavaScript", "React", "QT", "Next.js", "Three.js", "Tailwind"].map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <Link
            href="mailto:szymonwilczek@outlook.com"
            className="group flex flex-col sm:flex-row items-center sm:items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-center sm:text-left"
          >
            <div className="p-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <p className="font-semibold">Email</p>
          </Link>

          <Link
            href="https://github.com/wolfie"
            target="_blank"
            className="group flex flex-col sm:flex-row items-center sm:items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-center sm:text-left"
          >
            <div className="p-2 rounded-full bg-neutral-500/10 text-neutral-700 dark:text-neutral-200 group-hover:bg-neutral-700 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
              <Github className="h-5 w-5" />
            </div>
            <p className="font-semibold">GitHub</p>
          </Link>

          <Link
            href="https://discord.gg/twoj-link"
            target="_blank"
            className="group flex flex-col sm:flex-row items-center sm:items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-center sm:text-left"
          >
            <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </div>
            <p className="font-semibold">Discord</p>
          </Link>

        </div>
      </Section>

    </main >
  );
}
