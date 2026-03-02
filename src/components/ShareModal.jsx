import { useEffect } from "react";
import { F } from "../data";

export default function ShareModal({ imageUrl, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const download = () => {
    const a = document.createElement("a");
    a.href = imageUrl; a.download = "my-design-shape.png";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const shareNative = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], "my-design-shape.png", { type: "image/png" });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My Design Shape", text: "What shape is your craft?" });
      }
    } catch (e) { console.error(e); }
  };

  const openTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("What shape is your craft? I just mapped my product design shape.\n\n")}`, "_blank");
  };

  const openLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  const btnStyle = {
    padding: "10px 20px", borderRadius: 8, fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 400,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", transition: "all 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(8,8,7,0.95)", backdropFilter: "blur(40px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.25s ease-out", padding: 24 }}>
      <button onClick={onClose} style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "rgba(255,255,255,0.04)", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", fontFamily: F, padding: "6px 14px", borderRadius: 6, zIndex: 10 }}>press esc to close</button>
      <div style={{ maxWidth: 440, width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>Share your shape</p>
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 28, background: "rgba(255,255,255,0.02)" }}>
          <img src={imageUrl} alt="My design shape" style={{ width: "100%", display: "block" }} />
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={download} style={{
            ...btnStyle,
            background: "rgba(212,165,116,0.08)", border: "1px solid rgba(212,165,116,0.15)", color: "#D4A574",
          }}
            onMouseEnter={e => e.target.style.background = "rgba(212,165,116,0.15)"}
            onMouseLeave={e => e.target.style.background = "rgba(212,165,116,0.08)"}
          >Download</button>
          {canNativeShare && (
            <button onClick={shareNative} style={btnStyle}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.07)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
            >Share</button>
          )}
          <button onClick={openTwitter} style={btnStyle}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.07)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
          >X / Twitter</button>
          <button onClick={openLinkedIn} style={btnStyle}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.07)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
          >LinkedIn</button>
        </div>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.1)", marginTop: 20, fontWeight: 300 }}>Download the image, then attach it to your post</p>
      </div>
    </div>
  );
}
