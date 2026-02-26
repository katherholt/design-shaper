import { useState, useEffect } from "react";
import { C, CK, FS, F } from "../data";

export default function MapPage({ ratings, onQuiz }) {
  const [m, setM] = useState(false);
  useEffect(() => { setTimeout(() => setM(true), 50); }, []);
  const total = CK.reduce((s, k) => s + C[k].items.length, 0);
  const rated = CK.reduce((s, k) => s + Object.keys(ratings[k] || {}).length, 0);
  const avg = rated > 0 ? CK.reduce((s, k) => s + Object.values(ratings[k] || {}).reduce((a, b) => a + b, 0), 0) / rated : 0;

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 32px 100px" }}>
      <div style={{ opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", marginBottom: 44 }}>
        <h1 style={{ fontFamily: FS, fontSize: 44, fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px", color: "#e8e4df" }}>Map yourself</h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.3)", maxWidth: 440, fontWeight: 300 }}>Rate yourself as honestly as possible for accurate results.</p>
      </div>
      {rated > 0 && (
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 32, padding: "12px 20px", borderRadius: 10, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.03)", opacity: m ? 1 : 0, transition: "opacity 0.5s 0.2s" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Mapped</span>
          <span style={{ fontSize: 16, fontFamily: FS, color: "#e8e4df" }}>{rated}/{total}</span>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.05)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>Avg</span>
          <span style={{ fontSize: 16, fontFamily: FS, color: "#e8e4df" }}>{avg.toFixed(1)}</span>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CK.map((k, i) => {
          const cat = C[k], cr = ratings[k] || {}, cnt = Object.keys(cr).length, done = cnt === cat.items.length;
          const a = cnt > 0 ? Object.values(cr).reduce((x, y) => x + y, 0) / cnt : 0;
          return (
            <div key={k} onClick={() => onQuiz(k)} style={{
              opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(12px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05 + 0.15}s`,
              padding: "20px 24px", borderRadius: 12, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.035)", cursor: "pointer", position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2.5, background: cat.grad, opacity: done ? 0.7 : 0.12, borderRadius: "12px 0 0 12px" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                    <h3 style={{ fontFamily: FS, fontSize: 20, fontWeight: 400, margin: 0, color: "#e8e4df" }}>{cat.label}</h3>
                    {done && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${cat.accent}12`, color: cat.accent, letterSpacing: "0.04em" }}>done</span>}
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", margin: 0, fontWeight: 300 }}>
                    {cat.sub}
                    {cat.link && <a href={cat.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ marginLeft: 6, fontSize: 10, color: "rgba(201,127,138,0.4)", textDecoration: "none" }}>via interfacecraft.dev &nearr;</a>}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {cnt > 0 && <span style={{ fontSize: 24, fontFamily: FS, color: cat.accent }}>{a.toFixed(1)}</span>}
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 14 }}>&rarr;</span>
                </div>
              </div>
              {cnt > 0 && (
                <div style={{ marginTop: 12, display: "flex", gap: 2 }}>
                  {cat.items.map((_, j) => (
                    <div key={j} style={{ flex: 1, height: 1.5, borderRadius: 1, background: cr[j] ? cat.accent : "rgba(255,255,255,0.03)", opacity: cr[j] ? 0.45 : 1 }} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
