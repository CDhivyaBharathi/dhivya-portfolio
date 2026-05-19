"use client";

import { motion } from "framer-motion";

interface HeroScreenProps {
  onEnter: () => void;
}

export default function HeroScreen({ onEnter }: HeroScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col cursor-pointer"
      style={{ background: "var(--cream)" }}
      onClick={onEnter}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main content — vertically centered, left-aligned */}
      <div className="flex-1 flex flex-col justify-center px-12 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
            fontWeight: 500,
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            color: "var(--text-dark)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Dhivya Bharathi.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
            fontWeight: 300,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-muted)",
            marginTop: "1rem",
          }}
        >
          I love Tinkering.
        </motion.p>
      </div>

      {/* D.B. watermark — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2.5rem",
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.75rem",
          color: "var(--text-light)",
          letterSpacing: "0.05em",
        }}
      >
        D.B.
      </motion.div>

      {/* Subtle enter hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
          fontWeight: 300,
          fontSize: "0.7rem",
          color: "var(--text-light)",
          letterSpacing: "0.08em",
        }}
      >
        click to enter
      </motion.div>
    </motion.div>
  );
}
