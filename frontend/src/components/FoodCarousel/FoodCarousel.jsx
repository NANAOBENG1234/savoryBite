import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
function FoodCarousel({ title, foods, renderItem }) {
  const [idx, setIdx] = useState(0);
  const [vis, setVis] = useState(3);
  useEffect(() => { const u = () => { if (window.innerWidth < 640) setVis(1); else if (window.innerWidth < 1024) setVis(2); else setVis(3); }; u(); window.addEventListener("resize", u); return () => window.removeEventListener("resize", u); }, []);
  const max = Math.max(0, foods.length - vis);
  return (
    <div style={{ position: "relative" }}>
      {title && <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>{title}</h2>}
      <button className="carousel-btn carousel-btn-prev" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} style={{ left: "-1rem", opacity: idx === 0 ? 0.3 : 1 }}><HiChevronLeft /></button>
      <div style={{ overflow: "hidden", padding: "0.5rem 0" }}>
        <motion.div style={{ display: "flex", gap: "1.5rem" }} animate={{ x: `-${idx * 344}px` }} transition={{ type: "spring", stiffness: 250, damping: 30 }}>
          {foods.map((food) => (<div key={food.id} style={{ flex: `0 0 ${100/vis - 4}%`, minWidth: 280 }}>{renderItem ? renderItem(food) : null}</div>))}
        </motion.div>
      </div>
      <button className="carousel-btn carousel-btn-next" onClick={() => setIdx(Math.min(max, idx + 1))} disabled={idx >= max} style={{ right: "-1rem", opacity: idx >= max ? 0.3 : 1 }}><HiChevronRight /></button>
    </div>
  );
}
export default FoodCarousel;
