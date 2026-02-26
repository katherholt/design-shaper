import { C, CK } from "../data";

export async function generateShareImage(ratings) {
  const radarConfigs = CK.filter(k => Object.keys(ratings[k] || {}).length > 0);
  const cols = 2, radarSize = 200, padX = 80, padY = 60;
  const rows = Math.ceil(radarConfigs.length / cols);
  const H = Math.max(1500, 220 + rows * (radarSize * 2 + padY) + 160);
  const W = 1200;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0a0a09";
  ctx.fillRect(0, 0, W, H);

  // Subtle radial glow
  const grd = ctx.createRadialGradient(W / 2, 500, 0, W / 2, 500, 400);
  grd.addColorStop(0, "rgba(212,185,150,0.06)");
  grd.addColorStop(1, "rgba(212,185,150,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Header
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "500 13px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("PRODUCT DESIGN IN THE AGE OF AI", W / 2, 80);
  ctx.fillStyle = "#e8e4df";
  ctx.font = "400 52px 'Instrument Serif', Georgia, serif";
  ctx.fillText("My Shape", W / 2, 140);

  // Stats
  const total = CK.reduce((s, k) => s + C[k].items.length, 0);
  const rated = CK.reduce((s, k) => s + Object.keys(ratings[k] || {}).length, 0);
  const avg = rated > 0 ? CK.reduce((s, k) => s + Object.values(ratings[k] || {}).reduce((a, b) => a + b, 0), 0) / rated : 0;
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "300 14px 'DM Sans', sans-serif";
  ctx.fillText(`${rated}/${total} mapped \u00b7 ${avg.toFixed(1)} avg`, W / 2, 175);

  // Draw radars — 2 column grid
  const startX = (W - (cols * (radarSize * 2 + padX) - padX)) / 2;
  const startY = 220;

  radarConfigs.forEach((k, idx) => {
    const col = idx % cols, row = Math.floor(idx / cols);
    const centerX = startX + col * (radarSize * 2 + padX) + radarSize;
    const centerY = startY + row * (radarSize * 2 + padY) + radarSize;
    const cat = C[k];
    const items = cat.items;
    const n = items.length;
    const maxR = radarSize - 30;
    const color = cat.accent;

    const pt = (i, r) => {
      const a = (Math.PI * 2 * i) / n - Math.PI / 2;
      return { x: centerX + r * Math.cos(a), y: centerY + r * Math.sin(a) };
    };

    // Grid
    [0.25, 0.5, 0.75, 1].forEach(l => {
      ctx.beginPath();
      items.forEach((_, i) => {
        const p = pt(i, maxR * l);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 0.75;
      ctx.stroke();
    });

    // Data polygon
    const data = items.map((_, i) => pt(i, maxR * ((ratings[k]?.[i] ?? 0) / 5)));
    ctx.beginPath();
    data.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fillStyle = color + "1a";
    ctx.fill();
    ctx.strokeStyle = color + "99";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Points
    data.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = color + "dd";
      ctx.fill();
    });

    // Labels
    ctx.font = "300 11px 'DM Sans', sans-serif";
    items.forEach((item, i) => {
      const p = pt(i, maxR + 20);
      const isL = p.x < centerX - 10, isR = p.x > centerX + 10;
      ctx.textAlign = isL ? "right" : isR ? "left" : "center";
      ctx.fillStyle = (ratings[k]?.[i] ?? 0) > 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.15)";
      ctx.fillText(item.name, p.x, p.y + 4);
    });

    // Category label
    ctx.textAlign = "center";
    ctx.fillStyle = color + "88";
    ctx.font = "400 13px 'DM Sans', sans-serif";
    ctx.fillText(cat.label, centerX, centerY - maxR - 24);

    // Score
    ctx.fillStyle = color;
    ctx.font = "400 22px 'Instrument Serif', Georgia, serif";
    const catAvg = Object.values(ratings[k] || {}).reduce((a, b) => a + b, 0) / Object.keys(ratings[k] || {}).length;
    ctx.fillText(catAvg.toFixed(1), centerX, centerY - maxR - 6);
  });

  // Strengths & Growth at bottom
  const bottomY = startY + Math.ceil(radarConfigs.length / cols) * (radarSize * 2 + padY) + 20;
  const allStr = [], allGap = [];
  CK.forEach(k => Object.entries(ratings[k] || {}).forEach(([i, v]) => {
    const nm = C[k].items[parseInt(i)].name;
    if (v >= 4) allStr.push(nm); if (v <= 2) allGap.push(nm);
  }));

  if (allStr.length > 0) {
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(212,165,116,0.4)";
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.fillText("STRENGTHS", W / 2, bottomY);
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "300 13px 'DM Sans', sans-serif";
    ctx.fillText(allStr.slice(0, 8).join(" \u00b7 "), W / 2, bottomY + 22);
  }

  if (allGap.length > 0) {
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.font = "500 10px 'DM Sans', sans-serif";
    ctx.fillText("GROWTH AREAS", W / 2, bottomY + 56);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "300 13px 'DM Sans', sans-serif";
    ctx.fillText(allGap.slice(0, 8).join(" \u00b7 "), W / 2, bottomY + 78);
  }

  // Footer
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.font = "300 11px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("whatshapeareyou.com", W / 2, H - 40);

  return canvas;
}
