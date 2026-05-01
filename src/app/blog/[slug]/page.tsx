import { getAllPosts, getPostData } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import "katex/dist/katex.min.css";
import { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { LucideIconRenderer } from "@/components/LucideIcons";
import { remarkLucideIcons } from "@/lib/remarkLucideIcons";
import { ReadingThemeNudge } from "@/components/blog/ReadingThemeNudge";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostData(slug);
    return {
      title: `${post.title}`,
      description: post.excerpt,
    };
  } catch {
    return {
      title: "Post Not Found",
    };
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostData(slug);
  } catch {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background py-24 px-6 md:px-12 transition-colors duration-300">
      <ReadingThemeNudge />
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <div className="space-y-4 border-b border-border/50 pb-8">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-foreground">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div
          className={`prose prose-lg max-w-none${
            post.font ? ` blog-font-${post.font}` : ""
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath, remarkLucideIcons]}
            rehypePlugins={[
              rehypeRaw,
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["heading-anchor"],
                    ariaLabel: "Link to section",
                  },
                },
              ],
              rehypeKatex,
              rehypeHighlight,
            ]}
            components={
              {
                "lucide-icon": (props: any) => (
                  <LucideIconRenderer
                    iconname={props.iconname}
                    className={props.className}
                  />
                ),
                video: ({ src }: any) => (
                  <video
                    src={src}
                    controls
                    className="rounded-lg w-full h-auto my-4"
                    suppressHydrationWarning
                  />
                ),
                pre: ({ children, ...props }: any) => {
                  const codeChild = Array.isArray(children)
                    ? children[0]
                    : children;
                  if (codeChild?.props?.className?.includes("hljs")) {
                    return (
                      <CodeBlock className={codeChild.props.className}>
                        {codeChild.props.children}
                      </CodeBlock>
                    );
                  }
                  return <pre {...props}>{children}</pre>;
                },
              } as any
            }
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>

        {post.links && post.links.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Related Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {post.links.map((link, index) => (
                  <Button key={index} asChild variant="outline">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="pt-12 mt-12 border-t border-border/50">
          <p className="text-center text-muted-foreground text-sm">
            Thanks for reading! Check out other posts.
          </p>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
