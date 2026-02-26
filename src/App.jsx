import { useState } from "react";
import { C, CK, F } from "./data";
import { SHAPES } from "./data";
import Nav from "./components/Nav";
import Quiz from "./components/Quiz";
import ShapeDetail from "./components/ShapeDetail";
import Landing from "./pages/Landing";
import ShapesPage from "./pages/ShapesPage";
import MapPage from "./pages/MapPage";
import ResultsPage from "./pages/ResultsPage";
import AIPage from "./pages/AIPage";

export default function App() {
  const [landed, setLanded] = useState(false);
  const [page, setPage] = useState("shapes");
  const [quiz, setQuiz] = useState(null);
  const [shape, setShape] = useState(null);
  const [ratings, setRatings] = useState({});

  const rate = (cat, idx, val) => setRatings(p => ({ ...p, [cat]: { ...(p[cat] || {}), [idx]: val } }));
  const apply = r => { setRatings(JSON.parse(JSON.stringify(r))); setPage("results"); };
  const total = CK.reduce((s, k) => s + C[k].items.length, 0);
  const rated = CK.reduce((s, k) => s + Object.keys(ratings[k] || {}).length, 0);

  if (!landed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a09", color: "#e8e4df", fontFamily: F }}>
        <Landing onEnter={() => setLanded(true)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a09", color: "#e8e4df", fontFamily: F }}>
      <div style={{ position: "fixed", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,185,150,0.025) 0%, transparent 70%)", pointerEvents: "none" }} />
      {quiz && <Quiz catKey={quiz} ratings={ratings} onRate={rate} onClose={() => setQuiz(null)} />}
      {shape !== null && <ShapeDetail shape={SHAPES[shape]} onClose={() => setShape(null)} onApply={apply} />}
      <Nav page={page} setPage={setPage} rated={rated} total={total} />
      {page === "shapes" && <ShapesPage onOpen={setShape} />}
      {page === "map" && <MapPage ratings={ratings} onQuiz={setQuiz} />}
      {page === "results" && <ResultsPage ratings={ratings} goMap={() => setPage("map")} />}
      {page === "ai" && <AIPage />}
    </div>
  );
}
