import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar, HiClock, HiShieldCheck } from "react-icons/hi";

const heroStats = [
  { value: "4.9", label: "Guest rating" },
  { value: "12k+", label: "Happy diners" },
  { value: "40m", label: "Avg. delivery" },
];

function HeroSection({ title, subtitle, ctaText, ctaLink, backgroundImage, badge }) {
  return (
    <section className="hero hero-full">
      <div className="hero-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="hero-overlay" />
      <div className="hero-content container">
        {badge && <div className="hero-badge-row">
          <span className="hero-rating-pill"><HiStar /> 4.9 <span>· 1,200+ reviews</span></span>
          <span className="hero-life-pill"><span className="hero-float-dot" /> Open now · closes 10pm</span>
        </div>}
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>{title}</motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>{subtitle}</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}>
          <Link to={ctaLink} className="btn btn-primary btn-lg">{ctaText}</Link>
          <Link to="/menu" className="btn btn-glass btn-lg">View Full Menu</Link>
        </motion.div>
        <motion.div className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          {heroStats.map((s) => (
            <div className="hero-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
          ))}
        </motion.div>
        <div className="hero-assurances">
          <span><HiClock /> 30–45 min delivery</span>
          <span><HiShieldCheck /> Hygiene assured</span>
          <span><HiStar /> Fresh daily</span>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
