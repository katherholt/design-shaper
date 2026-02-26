import { useState } from 'react'

const DIMENSIONS = [
  { id: 'visual', label: 'Visual Design', description: 'Aesthetics, typography, color, layout, brand expression' },
  { id: 'ux', label: 'UX & Research', description: 'User flows, usability, research methods, information architecture' },
  { id: 'systems', label: 'Systems Thinking', description: 'Design systems, scalability, component architecture, documentation' },
  { id: 'prototyping', label: 'Prototyping', description: 'Interactive prototypes, motion design, micro-interactions, feasibility' },
  { id: 'strategy', label: 'Strategy', description: 'Product thinking, business alignment, roadmap influence, stakeholder management' },
  { id: 'engineering', label: 'Engineering', description: 'Frontend development, design-to-code, tooling, technical fluency' },
]

const SHAPES = [
  { name: 'The Generalist', test: (s) => { const vals = Object.values(s); const avg = vals.reduce((a, b) => a + b, 0) / vals.length; return vals.every(v => Math.abs(v - avg) <= 2) }, description: 'Balanced across all dimensions — a versatile contributor who adapts to any team need.' },
  { name: 'The Specialist', test: (s) => { const vals = Object.values(s); const max = Math.max(...vals); const high = vals.filter(v => v >= max - 1).length; return high <= 2 && max >= 8 }, description: 'Deep expertise in one or two areas — the go-to person when precision matters most.' },
  { name: 'The Strategist', test: (s) => s.strategy >= 8 && s.ux >= 7, description: 'Leads with product thinking and user insight — shapes what gets built and why.' },
  { name: 'The Maker', test: (s) => s.prototyping >= 8 && s.engineering >= 7, description: 'Brings ideas to life fast — thrives at the intersection of design and code.' },
  { name: 'The Storyteller', test: (s) => s.visual >= 8 && s.strategy >= 6, description: 'Crafts compelling narratives through visual excellence and strategic framing.' },
]

function getShape(scores) {
  for (const shape of SHAPES) {
    if (shape.test(scores)) return shape
  }
  return { name: 'The Explorer', description: 'Your unique combination defies easy labels — you are forging your own path in design.' }
}

function RadarChart({ scores, size = 300 }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const dims = DIMENSIONS.map((d, i) => {
    const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
    return { ...d, angle }
  })

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]
  const points = dims.map((d) => {
    const val = (scores[d.id] || 0) / 10
    return {
      x: cx + Math.cos(d.angle) * r * val,
      y: cy + Math.sin(d.angle) * r * val,
    }
  })
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={dims.map((d) => `${cx + Math.cos(d.angle) * r * level},${cy + Math.sin(d.angle) * r * level}`).join(' ')}
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
      ))}
      {dims.map((d) => (
        <line key={d.id} x1={cx} y1={cy} x2={cx + Math.cos(d.angle) * r} y2={cy + Math.sin(d.angle) * r} stroke="#333" strokeWidth="1" />
      ))}
      <polygon points={pathData.replace(/[MLZ]/g, (m) => m === 'Z' ? '' : '').trim().replace(/\s+/g, ' ')} fill="none" />
      <path d={pathData} fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={dims[i].id} cx={p.x} cy={p.y} r="4" fill="#6366f1" />
      ))}
      {dims.map((d) => {
        const labelR = r + 24
        const x = cx + Math.cos(d.angle) * labelR
        const y = cy + Math.sin(d.angle) * labelR
        return (
          <text key={d.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#aaa" fontSize="11" fontFamily="system-ui, sans-serif">
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}

export default function App() {
  const [scores, setScores] = useState(
    Object.fromEntries(DIMENSIONS.map((d) => [d.id, 5]))
  )
  const [submitted, setSubmitted] = useState(false)

  const shape = getShape(scores)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a09', color: '#e5e5e5', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>What Shape Are You?</h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>Product Design in the Age of AI — Map your craft, discover your shape.</p>
        </header>

        {!submitted ? (
          <div>
            {DIMENSIONS.map((dim) => (
              <div key={dim.id} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>{dim.label}</label>
                  <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.1rem' }}>{scores[dim.id]}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{dim.description}</p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={scores[dim.id]}
                  onChange={(e) => setScores({ ...scores, [dim.id]: Number(e.target.value) })}
                  style={{ width: '100%', accentColor: '#6366f1' }}
                />
              </div>
            ))}
            <button
              onClick={() => setSubmitted(true)}
              style={{
                width: '100%', padding: '0.875rem', marginTop: '1rem',
                background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px',
                fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Reveal My Shape
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <RadarChart scores={scores} />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#6366f1', margin: '2rem 0 0.5rem' }}>{shape.name}</h2>
            <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 2rem' }}>{shape.description}</p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                padding: '0.75rem 2rem', background: 'transparent', color: '#6366f1',
                border: '1px solid #6366f1', borderRadius: '8px', fontSize: '0.95rem',
                fontWeight: 600, cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        )}

        <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#444', fontSize: '0.75rem' }}>
          Design Shaper — an experiment in self-reflection for designers
        </footer>
      </div>
    </div>
  )
}
