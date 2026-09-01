import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiStar, HiShoppingCart } from "react-icons/hi";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
function FoodCard({ food, onAddToCart, onQuickView }) {
  const handleAdd = (e) => { e.stopPropagation(); onAddToCart(food); toast.success(`${food.name} added to cart!`); };
  return (
    <motion.div className="food-card" whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={() => onQuickView && onQuickView(food)}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={food.image} alt={food.name} className="food-card-image" />
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8rem", color: "var(--gold-400)" }}><HiStar /> {food.rating}</div>
      </div>
      <div className="food-card-body">
        <span className="food-card-category">{food.category}</span>
        <h3 className="food-card-title">{food.name}</h3>
        <p className="food-card-desc">{food.description}</p>
        <div className="food-card-footer">
          <span className="food-card-price">{formatPrice(food.price)}</span>
          <motion.button className="btn btn-primary btn-sm" whileTap={{ scale: 0.9 }} onClick={handleAdd}><HiShoppingCart /> Add</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
export default FoodCard;
