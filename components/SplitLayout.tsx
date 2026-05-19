"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Sidebar, { type Section } from "./Sidebar";
import { useIsMobile } from "./useIsMobile";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";

const SECTIONS: Record<Section, React.ReactNode> = {
  about: <About />,
  projects: <Projects />,
  experience: <Experience />,
  blog: <Blog />,
  contact: <Contact />,
};

function Hamburger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: "22px",
            height: "2px",
            background: "var(--text-dark)",
          }}
        />
      ))}
    </button>
  );
}

function DarkToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        opacity: dark ? 0.5 : 0.7,
        transition: "opacity 0.15s ease",
        display: "flex",
        alignItems: "center",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLButtonElement).style.opacity = dark ? "0.5" : "0.7")
      }
    >
      <Image
        src="/sun.png"
        alt="Toggle dark mode"
        width={28}
        height={28}
        style={{ display: "block", filter: dark ? "invert(1)" : "none" }}
      />
    </button>
  );
}

export default function SplitLayout() {
  const [active, setActive] = useState<Section>("about");
  const [dark, setDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{ display: "flex", flexDirection: "column", height: "100dvh", background: "var(--cream)" }}
      >
        {/* Mobile top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            background: "var(--cream)",
            borderBottom: "1px solid var(--text-light)",
            flexShrink: 0,
          }}
        >
          <Hamburger onClick={() => setDrawerOpen(true)} />
          <span
            style={{
              fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
              fontWeight: 500,
              fontSize: "0.95rem",
              color: "var(--text-dark)",
              letterSpacing: "0.02em",
            }}
          >
            Dhivya Bharathi.
          </span>
          <DarkToggle dark={dark} onToggle={() => setDark((d) => !d)} />
        </div>

        {/* Drawer */}
        <Sidebar
          active={active}
          onSelect={setActive}
          drawerOpen={drawerOpen}
          onDrawerClose={() => setDrawerOpen(false)}
        />

        {/* Scrollable content */}
        <main style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ padding: "2rem 1.25rem 3rem" }}
            >
              {SECTIONS[active]}
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <Sidebar active={active} onSelect={setActive} desktop />

      <main style={{ flex: 1, background: "var(--cream)", overflowY: "auto", position: "relative" }}>
        <div style={{ position: "absolute", top: "1.75rem", right: "2rem" }}>
          <DarkToggle dark={dark} onToggle={() => setDark((d) => !d)} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ padding: "3.5rem 3rem", minHeight: "100%" }}
          >
            {SECTIONS[active]}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
