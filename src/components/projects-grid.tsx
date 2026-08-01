"use client";

import { useState } from "react";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LanguageIcon } from "@/components/projects/LanguageIcon";
import { ProjectBadge } from "@/components/projects/ProjectBadge";

interface Project {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  url?: string;
  language?: string;
  archived?: boolean;
  badge?: string | string[];
  stars?: number;
  forks?: number;
}

interface ProjectsGridProps {
  projects: Project[];
  itemsPerPage?: number;
}

function PublicRepoIcon({
  className = "text-base shrink-0 text-muted-foreground",
}: {
  className?: string;
}) {
  return <i className={`nf nf-oct-repo ${className}`} aria-hidden="true" />;
}

export function ProjectsGrid({
  projects,
  itemsPerPage = 4,
}: ProjectsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 fade-in duration-300 delay-200"
        style={{ animationFillMode: "both" }}
      >
        {currentProjects.map((project) => (
          <div
            key={project.slug}
            className="group relative flex flex-col h-full bg-card hover:bg-card/80 border border-border/70 hover:border-primary/40 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <PublicRepoIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-jetbrains font-bold text-base md:text-lg text-foreground hover:text-primary hover:underline truncate"
                  >
                    {project.title}
                  </a>
                ) : (
                  <h2 className="font-jetbrains font-bold text-base md:text-lg text-foreground truncate">
                    {project.title}
                  </h2>
                )}
              </div>
              <ProjectBadge badge={project.badge} archived={project.archived} />
            </div>

            <p className="text-xs md:text-sm text-muted-foreground my-2 line-clamp-3 leading-relaxed flex-1">
              {project.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-3 text-xs">
              <div className="flex items-center gap-3.5 text-muted-foreground">
                <LanguageIcon language={project.language} />

                {Boolean(project.stars && project.stars > 0) && (
                  <span
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-default"
                    title={`${project.stars} stars`}
                  >
                    <Star className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-jetbrains font-medium text-foreground/80">
                      {project.stars}
                    </span>
                  </span>
                )}

                {Boolean(project.forks && project.forks > 0) && (
                  <span
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-default"
                    title={`${project.forks} forks`}
                  >
                    <GitFork className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-jetbrains font-medium text-foreground/80">
                      {project.forks}
                    </span>
                  </span>
                )}
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-jetbrains font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
                >
                  {project.url.includes("github.com") ? (
                    <Github className="h-4 w-4 text-muted-foreground group-hover/link:text-foreground transition-colors" />
                  ) : null}
                  <span>
                    {project.url.includes("github.com") ? "Repository" : "View"}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => goToPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
