import { useState, useEffect } from "react";
import { SHAPES, FS, F } from "../data";

export default function AIPage() {
  const [m, setM] = useState(false);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => { setTimeout(() => setM(true), 50); }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 32px 100px" }}>
      <div style={{ opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", marginBottom: 48 }}>
        <h1 style={{ fontFamily: FS, fontSize: 44, fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px", color: "#e8e4df" }}>Adapting to AI</h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)", maxWidth: 480, fontWeight: 300 }}>
          How each shape navigates the shift. Where AI encroaches, what remains durable, and how to adapt.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SHAPES.map((s, i) => {
          const open = expanded === i;
          return (
            <div key={i} style={{
              opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(10px)",
              borderRadius: 13, background: open ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.015)",
              border: `1px solid ${open ? s.color + "20" : "rgba(255,255,255,0.035)"}`, overflow: "hidden",
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05 + 0.1}s, background 0.3s, border-color 0.3s`,
            }}>
              <button onClick={() => setExpanded(open ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "20px 22px",
                background: "none", border: "none", cursor: "pointer", fontFamily: F, textAlign: "left",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, opacity: 0.5, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontFamily: FS, fontSize: 18, fontWeight: 400, color: "#e8e4df" }}>{s.name}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontWeight: 300, marginLeft: 10 }}>{s.desc}</span>
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", flexShrink: 0 }}>{"\u25BE"}</span>
              </button>
              {open && (
                <div style={{ padding: "0 22px 24px 44px", animation: "fadeUp 0.35s ease-out" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(220,100,100,0.5)", marginBottom: 8 }}>Where AI encroaches</p>
                      <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: 0 }}>{s.ai.risk}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: `${s.color}80`, marginBottom: 8 }}>Your durable edge</p>
                      <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: 0 }}>{s.ai.edge}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 8 }}>How to adapt</p>
                      <p style={{ fontSize: 13, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", fontWeight: 300, margin: 0 }}>{s.ai.adapt}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
