import React from "react";
import { motion } from "framer-motion";
import FoodCard from "../../components/FoodCard/FoodCard";
import foods from "../../data/foods";
import FoodCarousel from "../../components/FoodCarousel/FoodCarousel";
import { useCart } from "../../hooks/useCart";
function FeaturedFoods({ onQuickView }) {
  const { addItem } = useCart();
  return (
    <section className="section" style={{background:"var(--bg-secondary)"}}>
      <div className="container">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
          <h2 className="section-title">Signature Dishes</h2>
          <p className="section-subtitle">Curated selections from our master chefs, crafted with premium ingredients</p>
          <FoodCarousel foods={foods.slice(0,6)} renderItem={(food) => <FoodCard food={food} onAddToCart={addItem} onQuickView={onQuickView} />} />
        </motion.div>
      </div>
    </section>
  );
}
export default FeaturedFoods;
