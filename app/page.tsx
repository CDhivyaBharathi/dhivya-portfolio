import { getAllPostsFull } from "../lib/posts";
import { getAllProjects } from "../lib/projects";
import SplitLayout from "../components/SplitLayout";

export default function Home() {
  const posts = getAllPostsFull();
  const projects = getAllProjects();
  return <SplitLayout posts={posts} projects={projects} />;
}
