import React from "react";
import { motion } from "framer-motion";
import categories from "../../data/categories";
import foods from "../../data/foods";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const counts = categories.reduce((acc, c) => ({ ...acc, [c.id]: foods.filter((f) => f.category === c.id).length }), {});

function Categories() {
  return (
    <section className="section section-categories">
      <div className="container">
        <div className="section-head-row">
          <div>
            <motion.h2 className="section-title--left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Browse by Craving</motion.h2>
            <motion.p className="section-subtitle--left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>Jump straight to the food you want tonight</motion.p>
          </div>
          <Link to="/menu" className="section-link">View full menu <HiArrowRight /></Link>
        </div>
        <div className="category-chips">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} className={`category-chip ${counts[cat.id] ? "" : "chip-empty"}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}>
              <Link to={`/menu?category=${cat.id}`} className="category-chip-link">
                <span className="category-chip-icon">{cat.icon}</span>
                <span className="category-chip-name">{cat.name}</span>
                <span className="category-chip-count">{counts[cat.id] || 0} dishes</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Categories;
