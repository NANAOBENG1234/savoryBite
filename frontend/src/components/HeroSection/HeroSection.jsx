import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

function HeroSection({ title, subtitle, ctaText, ctaLink, backgroundImage, badge }) {
  return (
    <section className="hero hero-split">
      <div className="hero-overlay" />
      <div className="hero-inner container">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          {badge && <span className="hero-badge">{badge}</span>}
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-actions">
            <Link to={ctaLink} className="btn btn-primary btn-lg">{ctaText}</Link>
            <Link to="/about" className="btn btn-secondary btn-lg">Our Story</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>4.9</strong><span><HiStar /> Rating</span></div>
            <div className="hero-stat"><strong>12k+</strong><span>Happy diners</span></div>
            <div className="hero-stat"><strong>40m</strong><span>Avg. delivery</span></div>
          </div>
        </motion.div>

        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
          <div className="hero-dish">
            <img src={backgroundImage} alt="Signature SavoryBite dish" />
            <div className="hero-dish-tag glass">
              <span className="hero-dish-tag-icon"><HiStar /></span>
              <div>
                <strong>Chef's Special</strong>
                <small>Smoked Jollof & Suya</small>
              </div>
            </div>
          </div>
          <motion.div className="hero-float-note glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <span className="hero-float-dot" /> Live kitchen · Fresh daily
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
export default HeroSection;
