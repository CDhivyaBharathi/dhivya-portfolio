const WORK = [
  {
    period: "Jan 2026 – Feb 2026 · 2 mos",
    role: "Decision Analytics Intern",
    org: "EXL",
    type: "Internship",
    lines: [],
  },
  {
    period: "Jun 2025 – Dec 2025",
    role: "Flagship Project Intern",
    org: "Mphasis AI & Applied Tech Lab at Ashoka University",
    type: "Internship",
    lines: [],
  },
  {
    period: "Apr 2025 – Aug 2025 · 5 mos · Remote",
    role: "Senior Mentor",
    org: "BuildUp Global",
    type: "Internship",
    lines: ["Team Mentoring · Team Management"],
  },
];

const CLUBS = [
  {
    period: "Feb 2025 – Sep 2025",
    role: "Core Member",
    org: "Kaagazi - The Origami Club · College Club",
    lines: [],
  },
  {
    period: "Sep 2024 – May 2025 · 9 mos",
    role: "Events Team Member",
    org: "Technology Ministry of Ashoka · College Club",
    lines: [],
  },
  {
    period: "Aug 2024 – Apr 2025 · 9 mos",
    role: "Technical Team Member",
    org: "Jazbaa · College Club",
    lines: ["Web Development"],
  },
];

function EntryBlock({
  period,
  role,
  org,
  type,
  lines,
}: {
  period: string;
  role: string;
  org: string;
  type?: string;
  lines: string[];
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.7rem",
          color: "var(--text-dark)",
          letterSpacing: "0.08em",
          marginBottom: "0.35rem",
        }}
      >
        {period}
      </p>
      <h3
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 500,
          fontSize: "0.95rem",
          color: "var(--text-dark)",
          marginBottom: "0.2rem",
        }}
      >
        {role}.
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.82rem",
          color: "var(--text-dark)",
          marginBottom: type && lines.length > 0 ? "0.15rem" : type ? "0" : "0.5rem",
        }}
      >
        {org}.
      </p>
      {type && (
        <p
          style={{
            fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
            fontWeight: 300,
            fontSize: "0.72rem",
            color: "var(--text-dark)",
            marginBottom: lines.length > 0 ? "0.5rem" : "0",
          }}
        >
          {type}.
        </p>
      )}
      {lines.length > 0 && (
        <div
          style={{
            fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "var(--text-dark)",
            lineHeight: 1.7,
          }}
        >
          {lines.map((l, i) => (
            <p key={i}>{l}.</p>
          ))}
        </div>
      )}
    </div>
  );
}


export default function Experience() {
  return (
    <section>
      <h2
        style={{
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 500,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          color: "var(--text-dark)",
          marginBottom: "3rem",
          lineHeight: 1.1,
        }}
      >
        Experience.
      </h2>

      <div style={{ maxWidth: "520px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[...WORK, ...CLUBS].map((e, i) => (
            <EntryBlock key={i} {...e} />
          ))}
        </div>
      </div>
    </section>
  );
}
