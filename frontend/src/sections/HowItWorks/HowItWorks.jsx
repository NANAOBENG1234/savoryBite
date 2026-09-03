import React from "react";
import { motion } from "framer-motion";
import { HiShoppingCart, HiClock, HiHome } from "react-icons/hi";

const steps = [
  { icon: HiShoppingCart, title: "Pick your dishes", text: "Browse the menu and add your favourites to the cart in a tap." },
  { icon: HiClock, title: "Hot & on time", text: "Our kitchen prepares fresh as you order — ready in 30–45 minutes." },
  { icon: HiHome, title: "Delivered to you", text: "Track your order door-to-door across Greater Accra." },
];

function HowItWorks() {
  return (
    <section className="section section-how">
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Dinner, sorted in three steps</motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>From craving to your door — that simple</motion.p>
        <div className="how-grid">
          {steps.map((s, i) => (
            <motion.div key={s.title} className="how-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <span className="how-step">{String(i + 1).padStart(2, "0")}</span>
              <div className="how-icon"><s.icon /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;
