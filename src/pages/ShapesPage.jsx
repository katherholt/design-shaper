import { useState, useEffect } from "react";
import { SHAPES, FS, F } from "../data";
import MiniRadar from "../components/MiniRadar";

export default function ShapesPage({ onOpen, onQuiz }) {
  const [m, setM] = useState(false);
  useEffect(() => { setTimeout(() => setM(true), 50); }, []);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 32px 100px" }}>
      <div style={{ opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", marginBottom: 44 }}>
        <h1 style={{ fontFamily: FS, fontSize: 44, fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px", color: "#e8e4df" }}>The Shapes of Design</h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)", maxWidth: 480, fontWeight: 300 }}>
          Every product designer has a unique shape&mdash;a combination of skills, instincts, and craft sensibilities. Explore the six archetypes below, or take the quiz to map your own shape across 54 dimensions.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: 10 }}>
        {SHAPES.map((s, i) => (
          <div key={i} onClick={() => onOpen(i)} style={{
            opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(10px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05 + 0.12}s`,
            padding: "22px", borderRadius: 13, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.035)", cursor: "pointer", overflow: "hidden",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = `${s.color}20`; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.035)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: FS, fontSize: 20, fontWeight: 400, margin: "0 0 4px", color: "#e8e4df" }}>{s.name}</h3>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0, fontWeight: 300 }}>{s.desc}</p>
              </div>
              <div style={{ flexShrink: 0, opacity: 0.75 }}>
                <MiniRadar ratings={s.r} category="skills" color={s.color} size={56} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32, opacity: m ? 1 : 0, transition: "opacity 0.6s 0.4s" }}>
        <button onClick={onQuiz} style={{
          padding: "13px 28px", borderRadius: 10, fontSize: 13, cursor: "pointer", fontFamily: F, fontWeight: 500,
          background: "rgba(212,165,116,0.08)", border: "1px solid rgba(212,165,116,0.18)", color: "#D4A574", transition: "all 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "rgba(212,165,116,0.15)"}
          onMouseLeave={e => e.target.style.background = "rgba(212,165,116,0.08)"}
        >Take the Shape Quiz</button>
      </div>
    </div>
  );
}
