import { useState, useEffect, useRef, useCallback } from "react";
import { C, F } from "../data";

export default function DraggableRadar({ onInteract }) {
  const [vals, setVals] = useState([3, 4, 2, 5, 3, 4, 2, 3, 5, 4]);
  const [targetVals, setTargetVals] = useState([3, 4, 2, 5, 3, 4, 2, 3, 5, 4]);
  const [dragging, setDragging] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const svgRef = useRef(null);
  const animRef = useRef(null);
  const items = C.skills.items;
  const n = items.length;
  const size = 340, pad = 100, vb = size + pad * 2, cx = vb / 2, cy = vb / 2, maxR = size / 2 - 16;
  const color = "rgba(212,185,150,1)";

  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  useEffect(() => {
    const animate = () => {
      setVals(prev => prev.map((v, i) => {
        const diff = targetVals[i] - v;
        if (Math.abs(diff) < 0.01) return targetVals[i];
        return v + diff * 0.45;
      }));
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [targetVals]);

  const handlePointer = useCallback((e, i) => {
    e.preventDefault();
    if (!hasInteracted) { setHasInteracted(true); onInteract(); }
    setDragging(i);
  }, [hasInteracted, onInteract]);

  const handleMove = useCallback((e) => {
    if (dragging === null || !svgRef.current) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const scaleX = vb / rect.width, scaleY = vb / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const mx = (clientX - rect.left) * scaleX, my = (clientY - rect.top) * scaleY;
    const dx = mx - cx, dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const raw = Math.min(Math.max(dist / maxR, 0), 1) * 5;
    const val = Math.max(0.5, Math.min(5, raw));
    setTargetVals(prev => { const next = [...prev]; next[dragging] = val; return next; });
  }, [dragging, vb, cx, cy, maxR]);

  const handleUp = useCallback(() => setDragging(null), []);

  useEffect(() => {
    if (dragging !== null) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleUp);
      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
      };
    }
  }, [dragging, handleMove, handleUp]);

  const data = vals.map((v, i) => pt(i, maxR * (v / 5)));

  return (
    <svg ref={svgRef} width="100%" viewBox={`0 0 ${vb} ${vb}`} style={{ maxWidth: 480, display: "block", margin: "0 auto", cursor: dragging !== null ? "grabbing" : "default", touchAction: "none" }}>
      <defs>
        <radialGradient id="dg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.08" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={maxR + 8} fill="url(#dg)" />
      {[.2, .4, .6, .8, 1].map(l => (
        <polygon key={l} points={items.map((_, i) => pt(i, maxR * l)).map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
      ))}
      {items.map((_, i) => {
        const p = pt(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.025)" strokeWidth="0.75" />;
      })}
      <polygon points={data.map(p => `${p.x},${p.y}`).join(" ")} fill={color} fillOpacity="0.06" stroke={color} strokeWidth="1.2" strokeOpacity="0.35" />
      {data.map((p, i) => (
        <g key={i}
          onMouseDown={e => handlePointer(e, i)}
          onTouchStart={e => handlePointer(e, i)}
          style={{ cursor: "grab" }}
        >
          <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
          <circle cx={p.x} cy={p.y} r="7" fill={color} fillOpacity={dragging === i ? "0.3" : "0.12"} style={{ transition: "all 0.15s" }} />
          <circle cx={p.x} cy={p.y} r="3.5" fill={color} fillOpacity="0.8" style={{ transition: "all 0.15s" }} />
        </g>
      ))}
      {items.map((item, i) => {
        const p = pt(i, maxR + 28), isL = p.x < cx - 10, isR = p.x > cx + 10;
        return <text key={i} x={p.x} y={p.y} textAnchor={isL ? "end" : isR ? "start" : "middle"} dominantBaseline="middle"
          fill="rgba(255,255,255,0.3)" fontSize="10.5" fontFamily={F} fontWeight="300">{item.name}</text>;
      })}
    </svg>
  );
}
