import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  date: string;
  tag: string | null;
  description: string;
  stack: string[];
  image: string | null;
  link: string | null;
  content: string;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        tag: data.tag ?? null,
        description: data.description ?? "",
        stack: Array.isArray(data.stack) ? data.stack : [],
        image: data.image ?? null,
        link: data.link ?? null,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
