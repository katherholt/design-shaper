import { useState, useEffect } from "react";
import { C, CK, F, FS } from "../data";
import RadarChart from "./RadarChart";

export default function ShapeDetail({ shape, onClose, onApply }) {
  const [tab, setTab] = useState("skills");
  const [showAI, setShowAI] = useState(true);

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(8,8,7,0.95)", backdropFilter: "blur(40px)", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", animation: "fadeIn 0.3s ease-out" }}>
      <button onClick={onClose} style={{ position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.04)", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", fontFamily: F, padding: "6px 14px", borderRadius: 6, zIndex: 10 }}>ESC</button>
      <div style={{ maxWidth: 620, width: "100%", padding: "64px 32px 100px" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: shape.color, opacity: 0.5, marginBottom: 24 }}>Shape</p>
        <h2 style={{ fontFamily: FS, fontSize: 38, fontWeight: 400, margin: "0 0 8px", color: "#e8e4df", lineHeight: 1.15 }}>{shape.name}</h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", margin: "0 0 36px", fontWeight: 300 }}>{shape.desc}</p>

        <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
          {CK.map(k => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: "7px 13px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontFamily: F, border: "none", transition: "all 0.2s",
              background: tab === k ? `${shape.color}15` : "rgba(255,255,255,0.03)",
              color: tab === k ? shape.color : "rgba(255,255,255,0.3)"
            }}>{C[k].label}</button>
          ))}
        </div>

        <RadarChart ratings={shape.r} category={tab} color={shape.color} size={270} animate={false} />

        <div style={{ marginTop: 16 }}>
          {C[tab].items.map((item, i) => {
            const val = shape.r[tab]?.[i] ?? 0;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < C[tab].items.length - 1 ? "1px solid rgba(255,255,255,0.025)" : "none" }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", flex: 1, fontWeight: 300 }}>{item.name}</span>
                <div style={{ display: "flex", gap: 2 }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <div key={v} style={{ width: 12, height: 12, borderRadius: 3, background: v <= val ? `${shape.color}30` : "rgba(255,255,255,0.025)", border: `1px solid ${v <= val ? shape.color + "35" : "rgba(255,255,255,0.05)"}` }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI ADAPTATION SECTION */}
        <div style={{ marginTop: 36, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 28 }}>
          <button onClick={() => setShowAI(!showAI)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: F }}>
            <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Adapting to AI</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", transform: showAI ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>{"\u25BE"}</span>
          </button>
          {showAI && (
            <div style={{ marginTop: 20, animation: "fadeUp 0.4s ease-out" }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(220,100,100,0.5)", marginBottom: 8 }}>Where AI encroaches</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{shape.ai.risk}</p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: `${shape.color}80`, marginBottom: 8 }}>Your durable edge</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{shape.ai.edge}</p>
              </div>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>How to adapt</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>{shape.ai.adapt}</p>
              </div>
            </div>
          )}
        </div>

        {/* CRAFT SENSIBILITY PROFILE */}
        {shape.craftProfile && (
          <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Craft sensibility</span>
              <a href="https://www.interfacecraft.dev/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: "rgba(201,127,138,0.5)", textDecoration: "none", fontWeight: 300 }}>interfacecraft.dev &nearr;</a>
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: `${shape.color}60`, marginBottom: 8 }}>Natural strengths</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {shape.craftProfile.natural.map((p, i) => <span key={i} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 4, background: `${shape.color}0d`, color: shape.color, border: `1px solid ${shape.color}18` }}>{p}</span>)}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 8 }}>Stretch areas</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {shape.craftProfile.stretch.map((p, i) => <span key={i} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 4, background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.05)" }}>{p}</span>)}
              </div>
            </div>
          </div>
        )}

        <button onClick={() => { onApply(shape.r); onClose(); }} style={{
          marginTop: 32, width: "100%", padding: "13px 24px", borderRadius: 10,
          background: `${shape.color}10`, border: `1px solid ${shape.color}20`, color: shape.color,
          fontSize: 13, cursor: "pointer", fontFamily: F, fontWeight: 500, transition: "all 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = `${shape.color}1a`}
          onMouseLeave={e => e.target.style.background = `${shape.color}10`}
        >Start from this shape</button>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.12)", textAlign: "center", marginTop: 8, fontWeight: 300 }}>Pre-fills your map. Adjust everything after.</p>
      </div>
    </div>
  );
}
