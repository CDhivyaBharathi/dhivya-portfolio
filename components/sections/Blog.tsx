"use client";

import { useState } from "react";
import type { Post } from "../../lib/posts";

const MDX_STYLES: React.CSSProperties = {
  fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
  fontWeight: 300,
  fontSize: "0.95rem",
  color: "var(--text-dark)",
  lineHeight: 1.9,
  maxWidth: "580px",
};

function PostBody({ content }: { content: string }) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div style={{ ...MDX_STYLES, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {paragraphs.map((p, i) => {
        if (p.startsWith("## ")) {
          return (
            <h2 key={i} style={{ fontWeight: 500, fontSize: "1.15rem", marginTop: "1rem" }}>
              {p.slice(3)}
            </h2>
          );
        }
        if (p.startsWith("### ")) {
          return (
            <h3 key={i} style={{ fontWeight: 500, fontSize: "1rem", marginTop: "0.5rem" }}>
              {p.slice(4)}
            </h3>
          );
        }
        if (p.startsWith("- ")) {
          const items = p.split("\n").map((l) => l.replace(/^- /, ""));
          return (
            <ul key={i} style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {items.map((item, j) => <li key={j}>{item}</li>)}
            </ul>
          );
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

interface PostViewProps {
  post: Post;
  onBack: () => void;
}

function PostView({ post, onBack }: PostViewProps) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.78rem",
          color: "var(--text-dark)",
          letterSpacing: "0.06em",
          padding: 0,
          marginBottom: "2.5rem",
          opacity: 0.6,
          transition: "opacity 0.15s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
      >
        ← back.
      </button>

      <p style={{
        fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
        fontWeight: 300,
        fontSize: "0.72rem",
        color: "var(--text-dark)",
        opacity: 0.6,
        letterSpacing: "0.08em",
        marginBottom: "0.5rem",
      }}>
        {post.date} · {post.readingTime}
      </p>

      <h2 style={{
        fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
        fontWeight: 500,
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        color: "var(--text-dark)",
        marginBottom: "2.5rem",
        lineHeight: 1.15,
      }}>
        {post.title}
      </h2>

      <PostBody content={post.content} />
    </div>
  );
}

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  const [activePost, setActivePost] = useState<Post | null>(null);

  if (activePost) {
    return <PostView post={activePost} onBack={() => setActivePost(null)} />;
  }

  return (
    <section>
      <h2 style={{
        fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
        fontWeight: 500,
        fontSize: "clamp(2rem, 4vw, 2.75rem)",
        color: "var(--text-dark)",
        marginBottom: "2.5rem",
        lineHeight: 1.1,
      }}>
        Blog - Scratchspace.
      </h2>

      {posts.length === 0 ? (
        <p style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "1rem",
          color: "var(--text-dark)",
          lineHeight: 1.85,
        }}>
          Coming soon.<br />Writing about things I&apos;m building and learning.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {posts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setActivePost(post)}
              style={{
                background: "none",
                border: "none",
                borderTop: "1px solid var(--text-dark)",
                cursor: "pointer",
                textAlign: "left",
                padding: "1.25rem 0",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.65")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              <span style={{
                fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                fontWeight: 500,
                fontSize: "1rem",
                color: "var(--text-dark)",
              }}>
                {post.title}
              </span>
              <span style={{
                fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                fontWeight: 300,
                fontSize: "0.78rem",
                color: "var(--text-dark)",
                opacity: 0.6,
                letterSpacing: "0.06em",
              }}>
                {post.date} · {post.readingTime}
              </span>
              {post.excerpt && (
                <span style={{
                  fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                  fontWeight: 300,
                  fontSize: "0.88rem",
                  color: "var(--text-dark)",
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}>
                  {post.excerpt}
                </span>
              )}
            </button>
          ))}
          <div style={{ borderTop: "1px solid var(--text-dark)" }} />
        </div>
      )}
    </section>
  );
}
