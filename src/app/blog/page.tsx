import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { BlogList, POSTS_PER_PAGE } from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Personal notes, thoughts and write-ups.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto mb-8 mt-10 bg-background px-6 md:px-12 transition-colors duration-300 z-0 min-h-[60vh]">
      <div className="max-w-3xl mx-auto space-y-12">
        <div
          className="space-y-4 animate-in slide-in-from-bottom-8 fade-in duration-700"
          style={{ animationFillMode: "both" }}
        >
          <Button
            variant="ghost"
            asChild
            className="-ml-4 text-muted-foreground"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight">
            Blog <span className="text-muted-foreground">/ Notes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Personal write-ups, ideas, and notes on different kind of things.
          </p>
        </div>

        <BlogList posts={posts} itemsPerPage={POSTS_PER_PAGE} />
      </div>
    </main>
  );
}
