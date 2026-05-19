import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  tag: string | null; // subfolder name, or null if at root
}

export interface Post extends PostMeta {
  content: string;
}

// Recursively collect all .mdx files with their subfolder as the tag
function collectFiles(): { filePath: string; tag: string | null }[] {
  const results: { filePath: string; tag: string | null }[] = [];

  const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const tag = entry.name;
      const subDir = path.join(POSTS_DIR, tag);
      const subFiles = fs.readdirSync(subDir).filter((f) => f.endsWith(".mdx"));
      for (const file of subFiles) {
        results.push({ filePath: path.join(subDir, file), tag });
      }
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      results.push({ filePath: path.join(POSTS_DIR, entry.name), tag: null });
    }
  }

  return results;
}

function parseFile(filePath: string, tag: string | null): Post {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
    excerpt: data.excerpt ?? "",
    readingTime: readingTime(content).text,
    tag,
    content,
  };
}

export function getAllPostsFull(): Post[] {
  return collectFiles()
    .map(({ filePath, tag }) => parseFile(filePath, tag))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return getAllPostsFull().map(({ content: _content, ...meta }) => meta);
}
