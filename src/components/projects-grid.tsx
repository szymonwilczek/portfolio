"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Project {
  slug: string;
  title: string;
  excerpt: string;
  thumbnail?: string;
  tags: string[];
}

interface ProjectsGridProps {
  projects: Project[];
  itemsPerPage?: number;
}

export function ProjectsGrid({ projects, itemsPerPage = 4 }: ProjectsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        const scrollPosition = window.innerHeight / 2;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-8 fade-in duration-300 delay-200"
        style={{ animationFillMode: "both" }}
      >
        {currentProjects.map((project) => (
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
                {project.tags.slice(0, 3).map((tag) => (
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

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
