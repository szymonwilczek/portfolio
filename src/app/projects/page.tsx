import { getAllProjects } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects-grid";

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

        <ProjectsGrid projects={projects} itemsPerPage={4} />
      </div>
    </main>
  );
}
