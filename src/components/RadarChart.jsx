import { useState, useEffect, useRef } from "react";
import { C, F } from "../data";

export default function RadarChart({ ratings, category, size = 300, color: oc, animate = true }) {
  const items = C[category].items, color = oc || C[category].accent;
  const n = items.length, pad = 90, vb = size + pad * 2, cx = vb / 2, cy = vb / 2, maxR = size / 2 - 16;
  const [prog, setProg] = useState(animate ? 0 : 1);
  const uid = useRef(`r${Math.random().toString(36).slice(2, 7)}`).current;

  useEffect(() => {
    if (!animate) { setProg(1); return; }
    setProg(0);
    const s = Date.now();
    const f = () => {
      const p = Math.min((Date.now() - s) / 700, 1);
      setProg(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, [ratings, category, animate]);

  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const data = items.map((_, i) => pt(i, maxR * ((ratings[category]?.[i] ?? 0) / 5) * prog));

  return (
    <svg width="100%" viewBox={`0 0 ${vb} ${vb}`} style={{ maxWidth: size + pad, display: "block", margin: "0 auto" }}>
      <defs>
        <radialGradient id={`g${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.12" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <filter id={`b${uid}`}><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <circle cx={cx} cy={cy} r={maxR + 8} fill={`url(#g${uid})`} />
      {[.2, .4, .6, .8, 1].map(l => (
        <polygon key={l} points={items.map((_, i) => pt(i, maxR * l)).map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />
      ))}
      {items.map((_, i) => {
        const p = pt(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" />;
      })}
      <polygon points={data.map(p => `${p.x},${p.y}`).join(" ")} fill={color} fillOpacity="0.06" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" filter={`url(#b${uid})`} />
      <polygon points={data.map(p => `${p.x},${p.y}`).join(" ")} fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5" strokeOpacity="0.65" />
      {data.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill={color} fillOpacity="0.12" />
          <circle cx={p.x} cy={p.y} r="2.5" fill={color} fillOpacity="0.85" />
        </g>
      ))}
      {items.map((item, i) => {
        const p = pt(i, maxR + 26), isL = p.x < cx - 10, isR = p.x > cx + 10;
        return (
          <text key={i} x={p.x} y={p.y} textAnchor={isL ? "end" : isR ? "start" : "middle"} dominantBaseline="middle"
            fill={(ratings[category]?.[i] ?? 0) > 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.22)"}
            fontSize="10.5" fontFamily={F} fontWeight="300">{item.name}</text>
        );
      })}
    </svg>
  );
}
