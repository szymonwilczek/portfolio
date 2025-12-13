import { getAllProjects, getProjectData } from "@/lib/markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import Image from "next/image";
import { ImageGallery } from "@/components/image-gallery";
import { CodeBlock } from "@/components/CodeBlock";
import { LucideIconRenderer } from "@/components/LucideIcons";
import { remarkLucideIcons } from "@/lib/remarkLucideIcons";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const project = getProjectData(slug);
    return {
      title: `${project.title} | Szymon Wilczek`,
      description: project.excerpt,
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectData(slug);
  } catch {
    notFound();
  }

  const hasCarousel = project.carousel && project.carousel.length > 0;

  return (
    <article className="min-h-screen bg-background py-24 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-8">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>

        <div className="space-y-4 border-b border-border/50 pb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-outfit tracking-tight text-foreground">
            {project.title}
          </h1>

          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(project.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {hasCarousel && (
          <ImageGallery images={project.carousel!} title={project.title} />
        )}

        {!hasCarousel && project.thumbnail && (
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted/30">
            <Image
              width={1280}
              height={720}
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkLucideIcons]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              "lucide-icon": (props: any) => (
                <LucideIconRenderer iconname={props.iconname} className={props.className} />
              ),
              video: ({ src, style }: any) => (
                <video
                  src={src}
                  controls
                  className="rounded-lg max-w-full my-4"
                  style={style}
                  suppressHydrationWarning
                />
              ),
              pre: ({ children, ...props }: any) => {
                const codeChild = Array.isArray(children) ? children[0] : children;
                if (codeChild?.props?.className?.includes('hljs')) {
                  return (
                    <CodeBlock className={codeChild.props.className}>
                      {codeChild.props.children}
                    </CodeBlock>
                  );
                }
                return <pre {...props}>{children}</pre>;
              },
            } as any}
          >
            {project.content || ""}
          </ReactMarkdown>
        </div>

        {(project.github || (project.links && project.links.length > 0)) && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Project Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <Button asChild variant="outline">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub Repository
                    </a>
                  </Button>
                )}
                {project.links?.map((link, index) => (
                  <Button key={index} asChild variant="outline">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
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
            Thanks for reading! Check out my other projects.
          </p>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>

      </div>
    </article>
  );
}
