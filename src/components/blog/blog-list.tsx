"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const POSTS_PER_PAGE = 4;
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content?: string;
}

interface BlogListProps {
  posts: Post[];
  itemsPerPage?: number;
}

const DEFAULT_PAGE_SIZE = POSTS_PER_PAGE;

function normalize(str: string) {
  return str.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

export function BlogList({
  posts,
  itemsPerPage = DEFAULT_PAGE_SIZE,
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return posts;
    const tokens = q.split(/\s+/).filter(Boolean);

    return posts.filter((post) => {
      const haystack = normalize(
        [
          post.title,
          post.excerpt,
          post.content ?? "",
          (post.tags ?? []).join(" "),
        ].join(" \n "),
      );
      return tokens.every((t) => haystack.includes(t));
    });
  }, [posts, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / itemsPerPage),
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setTimeout(() => {
        const scrollPosition = window.innerHeight / 2;
        window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      }, 100);
    }
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <div
        className="relative animate-in slide-in-from-bottom-8 fade-in duration-500 delay-100"
        style={{ animationFillMode: "both" }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search posts by title, content or tag..."
          aria-label="Search blog posts"
          className="h-11 pl-9 pr-10 bg-card"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleQueryChange("")}
            aria-label="Clear search"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {query && (
        <p className="text-sm text-muted-foreground -mt-4">
          {filteredPosts.length === 0
            ? "No posts match your search."
            : `${filteredPosts.length} ${filteredPosts.length === 1 ? "post" : "posts"} found`}{" "}
          for <span className="text-foreground">&ldquo;{query}&rdquo;</span>
        </p>
      )}

      {posts.length === 0 ? (
        <div
          className="rounded-xl border border-dashed border-border/60 bg-card/40 px-6 py-16 text-center animate-in fade-in duration-500"
          style={{ animationFillMode: "both" }}
        >
          <p className="text-muted-foreground">No posts yet. Stay tuned.</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border/60 bg-card/40 px-6 py-12 text-center">
          <p className="text-muted-foreground">
            Nothing here. Try a different keyword.
          </p>
        </div>
      ) : (
        <ul
          className="flex flex-col divide-y divide-border/50 border-y border-border/50 animate-in slide-in-from-bottom-8 fade-in duration-300 delay-200"
          style={{ animationFillMode: "both" }}
        >
          {currentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 py-6 transition-colors -mx-4 px-4 rounded-lg"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  {post.tags.length > 0 && (
                    <span className="text-border" aria-hidden>
                      •
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] font-normal py-0 px-1.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl md:text-2xl font-bold font-outfit tracking-tight group-hover:text-muted-foreground transition-colors duration-300">
                    {post.title}
                  </h2>
                  <ArrowRight className="hidden sm:block h-5 w-5 mt-1 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>

                {post.excerpt && (
                  <p className="text-muted-foreground text-sm md:text-base line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(safePage - 1)}
                className={
                  safePage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => goToPage(page)}
                  isActive={safePage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(safePage + 1)}
                className={
                  safePage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
