"use client";

const LINKS = [
  {
    tag: "email.",
    label: "dhivyabharathi.chellakumar_ug2024@ashoka.edu.in",
    href: "mailto:dhivyabharathi.chellakumar_ug2024@ashoka.edu.in",
  },
  {
    tag: "github.",
    label: "github.com/CDhivyaBharathi",
    href: "https://github.com/CDhivyaBharathi",
  },
  {
    tag: "linkedin.",
    label: "linkedin.com/in/dhivya-bharathi-chellakumar",
    href: "https://www.linkedin.com/in/dhivya-bharathi-chellakumar/",
  },
];

export default function Contact() {
  return (
    <section>
      <h2
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 500,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          color: "var(--text-dark)",
          marginBottom: "2.5rem",
          lineHeight: 1.1,
        }}
      >
        Say hello.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {LINKS.map((l) => (
          <div key={l.href} style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                fontWeight: 300,
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                minWidth: "72px",
              }}
            >
              {l.tag}
            </span>
            <a
              href={l.href}
              target={l.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: "var(--text-dark)",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              {l.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
