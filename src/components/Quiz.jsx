import { useState, useEffect, useCallback } from "react";
import { C, F, FS, LEVELS } from "../data";

export default function Quiz({ catKey, ratings, onRate, onClose }) {
  const cat = C[catKey];
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [hov, setHov] = useState(null);
  const [tr, setTr] = useState(false);
  const item = cat.items[idx], total = cat.items.length, cur = ratings[catKey]?.[idx] ?? 0;

  const go = useCallback(d => {
    const next = idx + d;
    if (next < 0) return;
    if (next >= total) { onClose(); return; }
    setDir(d); setTr(true); setTimeout(() => { setIdx(next); setTr(false); }, 180);
  }, [idx, total, onClose]);

  const rate = (v) => {
    onRate(catKey, idx, cur === v ? 0 : v);
    setTimeout(() => go(1), 300);
  };

  useEffect(() => {
    const h = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key >= "1" && e.key <= "5") rate(parseInt(e.key));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [idx, cur, go, onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(8,8,7,0.93)", backdropFilter: "blur(40px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.25s ease-out" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.04)", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", fontFamily: F, padding: "6px 14px", borderRadius: 6 }}>press esc to close</button>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.03)" }}>
        <div style={{ height: "100%", background: cat.grad, width: `${((idx + 1) / total) * 100}%`, transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)", boxShadow: `0 0 16px ${cat.accent}30` }} />
      </div>
      <div style={{ maxWidth: 540, width: "100%", padding: "0 32px", textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: cat.accent, opacity: 0.5, marginBottom: 36 }}>{cat.label} · {idx + 1}/{total}</p>
        <div key={idx} style={{ animation: tr ? "fadeIn 0.01s" : dir >= 0 ? "sL 0.3s cubic-bezier(0.16,1,0.3,1)" : "sR 0.3s cubic-bezier(0.16,1,0.3,1)", opacity: tr ? 0 : 1 }}>
          <h2 style={{ fontFamily: FS, fontSize: 32, fontWeight: 400, color: "#e8e4df", margin: "0 0 12px" }}>{item.name}</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.35)", margin: "0 0 40px", fontWeight: 300, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>{item.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, maxWidth: 360, margin: "0 auto" }}>
            {LEVELS.map(lv => {
              const sel = cur === lv.v, hvd = hov === lv.v;
              return (
                <button key={lv.v} onClick={() => rate(lv.v)} onMouseEnter={() => setHov(lv.v)} onMouseLeave={() => setHov(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 9, cursor: "pointer",
                    border: `1px solid ${sel ? cat.accent + "45" : hvd ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}`,
                    background: sel ? `${cat.accent}10` : hvd ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.01)",
                    transition: "all 0.15s", fontFamily: F, textAlign: "left", width: "100%",
                  }}>
                  <div style={{ width: 24, height: 24, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", background: sel ? `${cat.accent}20` : "rgba(255,255,255,0.03)", color: sel ? cat.accent : "rgba(255,255,255,0.25)", fontSize: 11, fontWeight: 500 }}>{lv.v}</div>
                  <span style={{ fontSize: 13, color: sel ? cat.accent : "rgba(255,255,255,0.5)", fontWeight: sel ? 500 : 300 }}>{lv.l}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontWeight: 300 }}>{lv.d}</span>
                  <div style={{ flex: 1 }} />
                  {sel && <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.accent, animation: "pulse 1.5s ease-in-out infinite" }} />}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32 }}>
          <button onClick={() => go(-1)} disabled={idx === 0} style={{ background: "none", border: "none", color: idx === 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.25)", fontSize: 12, cursor: idx === 0 ? "default" : "pointer", fontFamily: F }}>&larr;</button>
          <div style={{ display: "flex", gap: 3 }}>
            {cat.items.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 12 : 4, height: 4, borderRadius: 2,
                background: (ratings[catKey]?.[i] ?? 0) > 0 ? cat.accent : i === idx ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)",
                opacity: (ratings[catKey]?.[i] ?? 0) > 0 ? 0.6 : 1, transition: "all 0.3s", cursor: "pointer"
              }} onClick={() => { setDir(i > idx ? 1 : -1); setTr(true); setTimeout(() => { setIdx(i); setTr(false); }, 180); }} />
            ))}
          </div>
          <button onClick={() => go(1)} style={{ background: "none", border: "none", color: idx === total - 1 ? cat.accent : "rgba(255,255,255,0.25)", fontSize: 12, cursor: "pointer", fontFamily: F }}>{idx === total - 1 ? "Done" : "\u2192"}</button>
        </div>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", marginTop: 24, fontWeight: 300 }}>1-5 to rate &middot; Arrows to navigate</p>
      </div>
    </div>
  );
}
