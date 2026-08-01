import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/projects");
const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface ProjectLink {
  url: string;
  name: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  carousel?: string[];
  content?: string;
  url?: string;
  language?: string;
  archived?: boolean;
  badge?: string | string[];
}

export function getAllProjects(): ProjectData[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(contentDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Project",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        thumbnail: data.thumbnail,
        url: data.url || data.github,
        language: data.language,
        archived: Boolean(data.archived),
        badge: data.badge,
      } as ProjectData;
    });

  const orderFilePath = path.join(contentDirectory, "order.txt");
  let orderedSlugs: string[] = [];
  if (fs.existsSync(orderFilePath)) {
    const fileContent = fs.readFileSync(orderFilePath, "utf8");
    orderedSlugs = fileContent
      .split("\n")
      .map((line) => line.trim().replace(/\.md$/, ""))
      .filter((line) => line.length > 0 && !line.startsWith("#"));
  }

  return allProjectsData.sort((a, b) => {
    if (orderedSlugs.length > 0) {
      const indexA = orderedSlugs.indexOf(a.slug);
      const indexB = orderedSlugs.indexOf(b.slug);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
    }

    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getProjectData(slug: string): ProjectData {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags,
    thumbnail: data.thumbnail,
    carousel: data.carousel || [],
    url: data.url || data.github,
    language: data.language,
    archived: Boolean(data.archived),
    badge: data.badge,
  } as ProjectData;
}

export type BlogFont = "eb-garamond" | "pt-serif" | "merriweather";

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string;
  links?: ProjectLink[];
  font?: BlogFont;
}

export function getAllPosts(): BlogPostData[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled Post",
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        content,
        font: data.font,
      } as BlogPostData;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(slug: string): BlogPostData {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    links: data.links || [],
    font: data.font,
  } as BlogPostData;
}
