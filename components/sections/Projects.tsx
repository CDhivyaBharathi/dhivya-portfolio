"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "../../lib/projects";

const FONT = "var(--font-mono, 'Intel One Mono', monospace)";

const CUTTING_MAT_BG = {
  backgroundImage: `
    linear-gradient(rgba(10,9,7,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10,9,7,0.07) 1px, transparent 1px)
  `,
  backgroundSize: "32px 32px",
};

function PostBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.95rem", color: "var(--text-dark)", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {paragraphs.map((p, i) => {
        if (p.startsWith("## ")) return <h2 key={i} style={{ fontWeight: 500, fontSize: "1.1rem", marginTop: "1rem" }}>{p.slice(3)}</h2>;
        if (p.startsWith("### ")) return <h3 key={i} style={{ fontWeight: 500, fontSize: "1rem", marginTop: "0.5rem" }}>{p.slice(4)}</h3>;
        if (p.startsWith("- ")) {
          const items = p.split("\n").map((l) => l.replace(/^- /, ""));
          return <ul key={i} style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>{items.map((item, j) => <li key={j}>{item}</li>)}</ul>;
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 300, fontSize: "0.78rem", color: "var(--text-dark)", letterSpacing: "0.06em", padding: 0, marginBottom: "2.5rem", opacity: 0.6, transition: "opacity 0.15s ease" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
      >
        ← back.
      </button>

      {project.image && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "2rem", overflow: "hidden" }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}

      <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
        {project.date}{project.tag ? ` · ${project.tag}` : ""}
      </p>

      <h2 style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-dark)", marginBottom: "1rem", lineHeight: 1.15 }}>
        {project.title}
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
        {project.stack.map((s) => (
          <span key={s} style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", border: "1px solid rgba(10,9,7,0.25)", padding: "0.15rem 0.5rem", letterSpacing: "0.05em" }}>{s}</span>
        ))}
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", border: "1px solid rgba(10,9,7,0.25)", padding: "0.15rem 0.5rem", letterSpacing: "0.05em", textDecoration: "none", opacity: 0.7 }}>
            link →
          </a>
        )}
      </div>

      <PostBody content={project.content} />
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--cream)",
        border: "1px solid rgba(10,9,7,0.15)",
        cursor: "pointer",
        textAlign: "left",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        transition: "background 0.15s ease",
        width: "100%",
      }}
    >
      {project.image && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", marginBottom: "0.5rem", overflow: "hidden" }}>
          <Image src={project.image} alt={project.title} fill style={{ objectFit: "cover" }} />
        </div>
      )}

      <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.7rem", color: "var(--text-dark)", letterSpacing: "0.08em" }}>
        {project.tag ?? project.date}
      </p>

      <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: "1rem", color: "var(--text-dark)" }}>
        {project.title}
      </span>

      {project.description && (
        <span style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.85rem", color: "var(--text-dark)", lineHeight: 1.6 }}>
          {project.description}
        </span>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.25rem" }}>
        {project.stack.map((s) => (
          <span key={s} style={{ fontFamily: FONT, fontWeight: 300, fontSize: "0.65rem", color: "var(--text-dark)", border: "1px solid rgba(10,9,7,0.25)", padding: "0.1rem 0.4rem", letterSpacing: "0.05em" }}>{s}</span>
        ))}
      </div>
    </button>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  if (active) return (
    <div style={{ background: "var(--cream)", padding: "2rem", flex: 1 }}>
      <ProjectDetail project={active} onBack={() => setActive(null)} />
    </div>
  );

  return (
    <section>
      <h2 style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "var(--text-dark)", marginBottom: "2.5rem", lineHeight: 1.1 }}>
        Projects.
      </h2>

      {projects.length === 0 ? (
        <p style={{ fontFamily: FONT, fontWeight: 300, fontSize: "1rem", color: "var(--text-dark)", lineHeight: 1.85 }}>
          Coming soon.<br />Building things. Will document them here.
        </p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 0,
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onClick={() => setActive(project)} />
          ))}
        </div>
      )}
    </section>
  );
}
