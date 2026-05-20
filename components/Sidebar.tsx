"use client";

import { motion, AnimatePresence } from "framer-motion";

type Section = "about" | "projects" | "experience" | "blog" | "contact";

const NAV_ITEMS: { id: Section; label: string; href?: string }[] = [
  { id: "about", label: "About." },
  { id: "projects", label: "Projects." },
  { id: "experience", label: "Experience." },
  { id: "blog", label: "Blog - Scratchspace.", href: "https://blog.dhivyabharathi.com" },
  { id: "contact", label: "Contact." },
];

interface SidebarProps {
  active: Section;
  onSelect: (section: Section) => void;
  // desktop only
  desktop?: boolean;
  // mobile drawer
  drawerOpen?: boolean;
  onDrawerClose?: () => void;
}

export default function Sidebar({
  active,
  onSelect,
  desktop,
  drawerOpen,
  onDrawerClose,
}: SidebarProps) {
  const navLinks = (onClick: (id: Section) => void, fontSize: string) =>
    NAV_ITEMS.map((item) => {
      const isActive = active === item.id;
      const sharedStyle = {
        fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
        fontWeight: 400,
        fontSize,
        color: isActive ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
        padding: "0.35rem 0",
        transition: "color 0.15s ease",
        letterSpacing: "0.01em",
        display: "block",
        textDecoration: "none",
        cursor: "pointer",
      };

      if (item.href) {
        return (
          <a
            key={item.id}
            href={item.href}
              style={sharedStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--sidebar-text-hover)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--sidebar-text)")}
          >
            {item.label}
          </a>
        );
      }

      return (
        <button
          key={item.id}
          onClick={() => onClick(item.id)}
          style={{ ...sharedStyle, background: "none", border: "none", textAlign: "left" }}
          onMouseEnter={(e) => {
            if (!isActive)
              (e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-text-hover)";
          }}
          onMouseLeave={(e) => {
            if (!isActive)
              (e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-text)";
          }}
        >
          {item.label}
        </button>
      );
    });

  if (desktop) {
    return (
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "35%",
          minWidth: "220px",
          background: "var(--sidebar)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 2.5rem",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {navLinks(onSelect, "1.6rem")}
        </nav>
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
            fontWeight: 400,
            fontSize: "1rem",
            color: "var(--sidebar-text)",
            letterSpacing: "0.05em",
          }}
        >
          D.B.
        </div>
      </motion.aside>
    );
  }

  // Mobile drawer
  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onDrawerClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 40,
            }}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "70vw",
              maxWidth: "300px",
              background: "var(--sidebar)",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3rem 2rem",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navLinks((id) => { onSelect(id); onDrawerClose?.(); }, "1.4rem")}
            </nav>
            <div
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "1.5rem",
                fontFamily: "var(--font-mono, 'Intel One Mono', monospace)",
                fontWeight: 400,
                fontSize: "0.9rem",
                color: "var(--sidebar-text)",
                letterSpacing: "0.05em",
              }}
            >
              D.B.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export type { Section };
