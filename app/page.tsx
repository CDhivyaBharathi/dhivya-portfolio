import { getAllPostsFull } from "../lib/posts";
import SplitLayout from "../components/SplitLayout";

export default function Home() {
  const posts = getAllPostsFull();
  return <SplitLayout posts={posts} />;
}
