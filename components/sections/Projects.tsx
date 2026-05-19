export default function Projects() {
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
        Projects.
      </h2>

      <p
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "1rem",
          color: "var(--text-muted)",
          lineHeight: 1.85,
        }}
      >
        Coming soon.
        <br />
        Building things. Will document them here.
      </p>
    </section>
  );
}
