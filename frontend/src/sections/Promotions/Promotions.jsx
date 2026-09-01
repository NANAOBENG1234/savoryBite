import React from "react";
import { motion } from "framer-motion";
import { HiTag } from "react-icons/hi";
function Promotions() {
  return (
    <section className="section" style={{background:"var(--bg-secondary)"}}>
      <div className="container">
        <h2 className="section-title">Current Offers</h2>
        <p className="section-subtitle">Exclusive deals for our valued customers</p>
        <div style={{maxWidth:"700px",margin:"0 auto"}}>
          {[{title:"Buy 1 Get 1 Free",subtitle:"On all Jollof Rice varieties",code:"JOLLOFBOGO"},{title:"Free Drink Combo",subtitle:"With every Suya Platter order",code:"SUYAFREE"}].map((p,i)=>(
            <motion.div key={i} className="promo-banner" style={{background:`linear-gradient(135deg,rgba(201,149,14,0.1),rgba(201,149,14,0.05))`}} initial={{opacity:0,x:i%2===0?-30:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.15}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"0.75rem",marginBottom:"0.5rem"}}><HiTag style={{color:"var(--gold-400)",fontSize:"1.5rem"}} /><h3>{p.title}</h3></div>
              <p>{p.subtitle}</p>
              <div style={{display:"inline-block",marginTop:"0.75rem",padding:"0.375rem 1rem",background:"rgba(201,149,14,0.15)",border:"1px solid rgba(201,149,14,0.3)",borderRadius:"var(--radius-full)",fontFamily:"var(--font-accent)",fontSize:"0.8rem",color:"var(--gold-300)",letterSpacing:"0.1em"}}>Use code: {p.code}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Promotions;
