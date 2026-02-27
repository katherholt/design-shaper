import { F } from "../data";

export default function Nav({ page, setPage, rated, total }) {
  const tabs = [{ k: "shapes", l: "Shapes" }, { k: "map", l: "Map Yourself" }, { k: "results", l: "Your Shape" }, { k: "ai", l: "AI Era" }];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,9,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.03)", padding: "0 32px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", gap: 2 }}>
          {tabs.map(t => {
            const a = page === t.k;
            return (
              <button key={t.k} onClick={() => setPage(t.k)} style={{
                padding: "7px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", fontFamily: F, border: "none",
                background: a ? "rgba(255,255,255,0.06)" : "transparent",
                color: a ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
                fontWeight: a ? 500 : 400, transition: "all 0.2s", position: "relative"
              }}>
                {t.l}
                {t.k === "results" && rated > 0 && <span style={{ position: "absolute", top: 5, right: 5, width: 4, height: 4, borderRadius: "50%", background: "#D4A574", opacity: 0.6 }} />}
              </button>
            );
          })}
        </div>
        {rated > 0 && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontWeight: 300 }}>{rated}/{total}</span>}
      </div>
    </div>
  );
}
