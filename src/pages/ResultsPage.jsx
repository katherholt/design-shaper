import { useState, useEffect } from "react";
import { C, CK, FS, F } from "../data";
import RadarChart from "../components/RadarChart";
import ShareModal from "../components/ShareModal";
import { generateShareImage } from "../utils/shareImage";

export default function ResultsPage({ ratings, goMap }) {
  const [m, setM] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [generating, setGenerating] = useState(false);
  useEffect(() => { setTimeout(() => setM(true), 50); }, []);
  const total = CK.reduce((s, k) => s + C[k].items.length, 0);
  const rated = CK.reduce((s, k) => s + Object.keys(ratings[k] || {}).length, 0);
  const avg = rated > 0 ? CK.reduce((s, k) => s + Object.values(ratings[k] || {}).reduce((a, b) => a + b, 0), 0) / rated : 0;
  const str = [], gap = [];
  CK.forEach(k => Object.entries(ratings[k] || {}).forEach(([i, v]) => {
    const nm = C[k].items[parseInt(i)].name;
    if (v >= 4) str.push({ nm, k, v }); if (v <= 2) gap.push({ nm, k, v });
  }));
  str.sort((a, b) => b.v - a.v); gap.sort((a, b) => a.v - b.v);

  const handleShare = async () => {
    setGenerating(true);
    try {
      const canvas = await generateShareImage(ratings);
      const url = canvas.toDataURL("image/png");
      setShareUrl(url);
    } catch (e) { console.error(e); }
    setGenerating(false);
  };

  if (rated === 0) return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 32px", textAlign: "center" }}>
      <div style={{ marginTop: 80 }}>
        <h2 style={{ fontFamily: FS, fontSize: 28, fontWeight: 400, color: "#e8e4df", margin: "0 0 10px" }}>No shape yet</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", fontWeight: 300, marginBottom: 24 }}>Map yourself or start from a shape.</p>
        <button onClick={goMap} style={{ padding: "10px 24px", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: F, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.5)" }}>Start &rarr;</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 32px 100px" }}>
      {shareUrl && <ShareModal imageUrl={shareUrl} onClose={() => setShareUrl(null)} />}
      <div style={{ opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", marginBottom: 44 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: FS, fontSize: 44, fontWeight: 400, lineHeight: 1.1, margin: "0 0 12px", color: "#e8e4df" }}>Your shape</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>{rated}/{total} mapped &middot; {avg.toFixed(1)} avg</p>
          </div>
          <button onClick={handleShare} disabled={generating} style={{
            padding: "9px 20px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 400,
            background: "rgba(212,165,116,0.08)", border: "1px solid rgba(212,165,116,0.15)", color: "#D4A574", transition: "all 0.2s",
            opacity: generating ? 0.5 : 1,
          }}
            onMouseEnter={e => { e.target.style.background = "rgba(212,165,116,0.14)"; }}
            onMouseLeave={e => { e.target.style.background = "rgba(212,165,116,0.08)"; }}
          >{generating ? "Generating..." : "Share my shape"}</button>
        </div>
      </div>

      {(str.length > 0 || gap.length > 0) && (
        <div style={{ display: "grid", gridTemplateColumns: str.length > 0 && gap.length > 0 ? "1fr 1fr" : "1fr", gap: 10, marginBottom: 44, opacity: m ? 1 : 0, transition: "opacity 0.5s 0.1s" }}>
          {str.length > 0 && (
            <div style={{ padding: "18px 20px", borderRadius: 12, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.03)" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,165,116,0.45)", marginBottom: 10 }}>Strengths</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {str.slice(0, 8).map((s, i) => <span key={i} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: `${C[s.k].accent}0d`, color: C[s.k].accent, border: `1px solid ${C[s.k].accent}12` }}>{s.nm}</span>)}
              </div>
            </div>
          )}
          {gap.length > 0 && (
            <div style={{ padding: "18px 20px", borderRadius: 12, background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.03)" }}>
              <p style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 10 }}>Growth areas</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {gap.slice(0, 8).map((g, i) => <span key={i} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.04)" }}>{g.nm}</span>)}
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: 14 }}>
        {CK.map((k, i) => {
          const cat = C[k], rd = ratings[k] || {}, cnt = Object.keys(rd).length;
          if (cnt === 0) return null;
          const a = Object.values(rd).reduce((x, y) => x + y, 0) / cnt;
          const s = Object.entries(rd).filter(([, v]) => v >= 4).map(([j]) => cat.items[parseInt(j)].name);
          const g = Object.entries(rd).filter(([, v]) => v <= 2).map(([j]) => cat.items[parseInt(j)].name);
          return (
            <div key={k} style={{
              background: "rgba(255,255,255,0.015)", borderRadius: 14, padding: 22, border: "1px solid rgba(255,255,255,0.03)",
              opacity: m ? 1 : 0, transform: m ? "translateY(0)" : "translateY(10px)", transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.05 + 0.15}s`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.accent, opacity: 0.5 }} />
                <span style={{ fontFamily: FS, fontSize: 17, color: "#e8e4df" }}>{cat.label}</span>
                <span style={{ fontSize: 20, fontFamily: FS, color: cat.accent, marginLeft: "auto" }}>{a.toFixed(1)}</span>
              </div>
              <RadarChart ratings={ratings} category={k} size={250} />
              {s.length > 0 && <div style={{ marginTop: 10 }}><p style={{ fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: 3 }}>Strengths</p><p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{s.join(" \u00b7 ")}</p></div>}
              {g.length > 0 && <div style={{ marginTop: 6 }}><p style={{ fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: 3 }}>Growth</p><p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{g.join(" \u00b7 ")}</p></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
