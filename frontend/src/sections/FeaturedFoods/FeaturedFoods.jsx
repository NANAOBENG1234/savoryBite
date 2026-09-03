import React from "react";
import { motion } from "framer-motion";
import FoodCard from "../../components/FoodCard/FoodCard";
import foods from "../../data/foods";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

function FeaturedFoods({ onQuickView }) {
  const { addItem } = useCart();
  return (
    <section className="section section-featured">
      <div className="container">
        <div className="section-head-row">
          <div>
            <motion.h2 className="section-title--left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Signature Dishes</motion.h2>
            <motion.p className="section-subtitle--left" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>Chef's curated picks — crave-worthy, beautifully plated</motion.p>
          </div>
          <Link to="/menu" className="section-link">See everything <HiArrowRight /></Link>
        </div>
        <motion.div className="food-grid featured-grid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {foods.slice(0, 6).map((food, i) => (
            <motion.div key={food.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <FoodCard food={food} onAddToCart={addItem} onQuickView={onQuickView} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default FeaturedFoods;
