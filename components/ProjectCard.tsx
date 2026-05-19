"use client";

import { useState } from "react";

interface ProjectCardProps {
  title: string;
  type: string;
  description: string;
  stack: { label: string; color: string }[];
}

export default function ProjectCard({
  title,
  type,
  description,
  stack,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.75rem",
        border: `1px solid ${hovered ? "var(--lavender)" : "var(--text-light)"}`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        cursor: "default",
        maxWidth: "480px",
      }}
    >
      {/* Type tag */}
      <span
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.7rem",
          color: "var(--text-light)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {type}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 500,
          fontSize: "1.2rem",
          color: "var(--text-dark)",
          marginTop: "0.4rem",
          marginBottom: "0.75rem",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.9rem",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: "1.25rem",
        }}
      >
        {description}
      </p>

      {/* Stack pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {stack.map((s) => (
          <span
            key={s.label}
            style={{
              fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
              fontWeight: 300,
              fontSize: "0.7rem",
              background: s.color,
              color: "var(--text-dark)",
              padding: "0.2rem 0.6rem",
              letterSpacing: "0.03em",
            }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
