import React from "react";
import { motion } from "framer-motion";
import { HiTag, HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const promos = [
  { title: "Buy 1 Get 1 Free", subtitle: "On all Jollof Rice varieties", code: "JOLLOFBOGO", featured: true },
  { title: "Free Drink Combo", subtitle: "With every Suya Platter order", code: "SUYAFREE", featured: false },
];

function Promotions() {
  return (
    <section className="section section-promos">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Today's Offers</motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>Exclusive deals worth saving for</motion.p>
        <div className="promo-grid">
          {promos.map((p, i) => (
            <motion.div key={p.code} className={`promo-card ${p.featured ? "promo-featured" : ""}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="promo-icon"><HiTag /></div>
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <span className="promo-code">Use code — <strong>{p.code}</strong></span>
              {p.featured && <Link to="/menu" className="promo-cta">Redeem now <HiArrowRight /></Link>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Promotions;
