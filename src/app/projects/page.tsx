import { getAllProjects } from "@/lib/markdown";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects | Szymon Wilczek",
  description: "Showcase of my recent work and experiments.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto mb-8 -mt-10 bg-background px-6 md:px-12 transition-colors duration-300 z-0">
      <div className="max-w-3xl mx-auto space-y-12">
        <div
          className="space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700"
          style={{ animationFillMode: "both" }}
        >
          <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight">
            Projects <span className="text-muted-foreground">/ Works</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A collection of my recent work, experiments, and open source contributions.
            Everything here is built with passion and code.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 fade-in duration-300 delay-200"
          style={{ animationFillMode: "both" }}
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col h-full bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-full aspect-video bg-muted/30 relative overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    width={640}
                    height={360}
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 text-6xl font-bold select-none">
                    NO IMG
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-4 gap-2">
                <h2 className="text-xl font-bold font-outfit group-hover:text-primary transition-colors">
                  {project.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.excerpt}
                </p>

                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
