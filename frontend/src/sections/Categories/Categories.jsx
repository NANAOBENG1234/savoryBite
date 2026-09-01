import React from "react";
import { motion } from "framer-motion";
import categories from "../../data/categories";
import { Link } from "react-router-dom";
function Categories() {
  return (
    <section className="section">
      <div className="container">
        <motion.h2 className="section-title" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>Browse Categories</motion.h2>
        <motion.p className="section-subtitle" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:0.1}}>Explore our diverse menu of authentic African cuisine</motion.p>
        <div className="category-grid">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} className="category-card" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} whileHover={{y:-6,scale:1.03}}>
              <Link to={`/menu?category=${cat.id}`} style={{textDecoration:"none",color:"inherit"}}>
                <div className="category-card-icon">{cat.icon}</div>
                <span>{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Categories;
