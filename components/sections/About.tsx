export default function About() {
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
        Hello World.
      </h2>

      <div
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "1rem",
          color: "var(--text-muted)",
          lineHeight: 1.85,
          maxWidth: "540px",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        <p>
          I&apos;m Dhivya Bharathi — a student who loves tinkering.
          <br />
          I build things, break things, and learn from both.
        </p>
        <p>
          Currently exploring the intersection of hardware, software,
          <br />
          and whatever catches my curiosity next.
        </p>
        <p>Based in Tamil Nadu, India.</p>
      </div>
    </section>
  );
}
