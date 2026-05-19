export default function Blog() {
  return (
    <section>
      <h2
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 500,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          color: "var(--text-dark)",
          marginBottom: "2rem",
          lineHeight: 1.1,
        }}
      >
        Blog.
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
        Writing about things I&apos;m building and learning.
      </p>
    </section>
  );
}
