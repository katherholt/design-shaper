import { C } from "../data";

export default function MiniRadar({ ratings, category, color, size = 64 }) {
  const items = C[category].items, n = items.length;
  const pad = 6, vb = size + pad * 2, cx = vb / 2, cy = vb / 2, maxR = size / 2 - 2;
  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const data = items.map((_, i) => pt(i, maxR * ((ratings[category]?.[i] ?? 0) / 5)));
  const grid = items.map((_, i) => pt(i, maxR)).map(p => `${p.x},${p.y}`).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`}>
      <polygon points={grid} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <polygon points={data.map(p => `${p.x},${p.y}`).join(" ")} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      {data.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.2" fill={color} fillOpacity="0.8" />)}
    </svg>
  );
}
