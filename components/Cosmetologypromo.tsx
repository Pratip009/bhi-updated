"use client";

import { useState, CSSProperties } from "react";

const TARGET_URL = "https://cosmetologyschooljc.com/";
const PINK = "#D4537E";
const PINK_DARK = "#993556";

export default function CosmetologyPromo() {
  const [dismissed, setDismissed] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (dismissed) return null;

  const handleClick = () => {
    window.open(TARGET_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={styles.floatingWrap}>
      {/* Tab label on the left edge */}
      <div style={styles.tab}>Our Programs</div>

      {/* Card */}
      <div style={styles.card}>
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          style={styles.closeBtn}
          aria-label="Dismiss"
        >
          ✕
        </button>

        {/* Icon + heading */}
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <span style={{ fontSize: 22 }} aria-hidden="true">✂️</span>
          </div>
          <p style={styles.heading}>Explore More Programs</p>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Program tags */}
        <div style={styles.tagWrap}>
          {["Cosmetology", "Barber", "Nail Tech", "Esthetics", "& more"].map((tag) => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>

        {/* Body text */}
        <p style={styles.sub}>
          Interested in beauty &amp; cosmetology programs? Check out everything
          Cosmetology School JC has to offer.
        </p>

        {/* CTA button */}
        <button
          onClick={handleClick}
          style={{
            ...styles.btn,
            background: hovered ? PINK_DARK : PINK,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          View Programs →
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  floatingWrap: {
    position: "fixed",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  tab: {
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    background: PINK,
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.05em",
    padding: "14px 7px",
    borderRadius: "8px 0 0 8px",
    cursor: "default",
    userSelect: "none",
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#fff",
    borderTop: "0.5px solid #e0e0e0",
    borderBottom: "0.5px solid #e0e0e0",
    borderLeft: "0.5px solid #e0e0e0",
    borderRight: "none",
    borderRadius: "12px 0 0 12px",
    padding: "18px 16px 16px",
    width: 230,
    boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#aaa",
    fontSize: 14,
    lineHeight: 1,
    padding: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#FBEAF0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  heading: {
    margin: 0,
    fontSize: 14,
    fontWeight: 700,
    color: "#111",
    lineHeight: 1.3,
  },
  divider: {
    height: 1,
    background: "#f0f0f0",
    margin: "0 -16px",
  },
  tagWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    background: "#FBEAF0",
    color: PINK,
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 20,
  },
  sub: {
    margin: 0,
    fontSize: 12,
    color: "#666",
    lineHeight: 1.6,
  },
  btn: {
    background: PINK,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
    textAlign: "center",
    transition: "background 0.15s",
  },
};