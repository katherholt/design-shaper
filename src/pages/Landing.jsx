import { useState, useEffect } from "react";
import { FS, F } from "../data";
import DraggableRadar from "../components/DraggableRadar";

export default function Landing({ onEnter }) {
  const [mounted, setMounted] = useState(false);
  const [interacted, setInteracted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,185,150,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ textAlign: "center", maxWidth: 520, position: "relative", zIndex: 1, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: 24 }}>Product Design in the Age of AI</p>
        <h1 style={{ fontFamily: FS, fontSize: 52, fontWeight: 400, lineHeight: 1.08, margin: "0 0 16px", color: "#e8e4df" }}>
          What shape is<br /><span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>your craft?</span>
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.25)", fontWeight: 300, marginBottom: 48 }}>
          How are you shaped and where do you go from here?
        </p>
      </div>
      <div style={{ width: "100%", maxWidth: 480, opacity: mounted ? 1 : 0, transition: "opacity 1.2s 0.3s", position: "relative", zIndex: 1 }}>
        <DraggableRadar onInteract={() => setInteracted(true)} />
      </div>
      <div style={{ marginTop: 48, opacity: interacted ? 1 : 0, transform: interacted ? "translateY(0)" : "translateY(12px)", transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)", position: "relative", zIndex: 1 }}>
        <button onClick={onEnter} style={{
          padding: "12px 32px", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: F, fontWeight: 400,
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", transition: "all 0.2s", letterSpacing: "0.02em",
        }}
          onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.07)"; e.target.style.color = "rgba(255,255,255,0.8)"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = "rgba(255,255,255,0.55)"; }}
        >Build your shape &rarr;</button>
      </div>
      {!interacted && mounted && (
        <p style={{ position: "absolute", bottom: 40, fontSize: 10, color: "rgba(255,255,255,0.1)", fontWeight: 300, animation: "breathe 3s ease-in-out infinite" }}>
          drag a point to begin
        </p>
      )}
    </div>
  );
}
