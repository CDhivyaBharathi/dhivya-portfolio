"use client";

import { useState } from "react";
import type { Post } from "../../lib/posts";

const FONT = "var(--font-mono, 'Intel One Mono', monospace)";

function PostBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.95rem", color: "var(--text-dark)", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {paragraphs.map((p, i) => {
        if (p.startsWith("## ")) return <h2 key={i} style={{ fontWeight: 500, fontSize: "1.15rem", lineHeight: 1.3 }}>{p.slice(3)}</h2>;
        if (p.startsWith("### ")) return <h3 key={i} style={{ fontWeight: 500, fontSize: "1rem" }}>{p.slice(4)}</h3>;
        if (p.startsWith("- ")) {
          const items = p.split("\n").map((l) => l.replace(/^- /, ""));
          return <ul key={i} style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>{items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

function PostView({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 300, fontSize: "0.78rem", color: "var(--text-dark)", letterSpacing: "0.06em", padding: 0, marginBottom: "2.5rem", opacity: 0.6, transition: "opacity 0.15s ease", display: "block" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
      >
        ← back.
      </button>
      <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
        {post.date} · {post.readingTime}{post.tag ? ` · ${post.tag}` : ""}
      </p>
      <h2 style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-dark)", marginBottom: "2.5rem", lineHeight: 1.15 }}>
        {post.title}
      </h2>
      <PostBody content={post.content} />
    </div>
  );
}

function PostRow({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ background: "none", border: "none", borderTop: "1px solid rgba(10,9,7,0.2)", cursor: "pointer", textAlign: "left", padding: "1.1rem 0", display: "flex", flexDirection: "column", gap: "0.3rem", transition: "opacity 0.15s ease", width: "100%" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
    >
      <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: "1rem", color: "var(--text-dark)" }}>{post.title}</span>
      <span style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", letterSpacing: "0.08em" }}>
        {post.date} · {post.readingTime}
      </span>
      {post.excerpt && (
        <span style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.85rem", color: "var(--text-dark)", lineHeight: 1.6, opacity: 0.8 }}>{post.excerpt}</span>
      )}
    </button>
  );
}

export default function Blog({ posts }: { posts: Post[] }) {
  const [activePost, setActivePost] = useState<Post | null>(null);

  if (activePost) return <PostView post={activePost} onBack={() => setActivePost(null)} />;

  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const key = post.tag ?? "__none__";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(post);
  }
  const sortedGroups = [...groups.entries()].sort(([a], [b]) => {
    if (a === "__none__") return 1;
    if (b === "__none__") return -1;
    return a.localeCompare(b);
  });

  return (
    <section>
      <h2 style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--text-dark)", marginBottom: "2.5rem", lineHeight: 1.1 }}>
        Blog - Scratchspace.
      </h2>
      {posts.length === 0 ? (
        <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "1rem", color: "var(--text-dark)", lineHeight: 1.85 }}>
          Coming soon.<br />Writing about things I&apos;m building and learning.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {sortedGroups.map(([key, groupPosts]) => (
            <div key={key}>
              {key !== "__none__" && (
                <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", letterSpacing: "0.08em", marginBottom: "0" }}>
                  {key}
                </p>
              )}
              <div>
                {groupPosts.map((post) => (
                  <PostRow key={post.slug} post={post} onClick={() => setActivePost(post)} />
                ))}
                <div style={{ borderTop: "1px solid rgba(10,9,7,0.2)" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
