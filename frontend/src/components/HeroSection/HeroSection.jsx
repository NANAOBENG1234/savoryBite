import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function HeroSection({ title, subtitle, ctaText, ctaLink, backgroundImage, badge }) {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className="hero-overlay" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        {badge && <span className="hero-badge">{badge}</span>}
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-actions">
          <Link to={ctaLink} className="btn btn-primary btn-lg">{ctaText}</Link>
          <Link to="/about" className="btn btn-secondary btn-lg">Our Story</Link>
        </div>
      </motion.div>
    </section>
  );
}
export default HeroSection;
