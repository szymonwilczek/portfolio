import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/projects");

export interface ProjectData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  carousel?: string[];
  content?: string;
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
      } as ProjectData;
    });

  return allProjectsData.sort((a, b) => {
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
  } as ProjectData;
}
