import React from "react";
import { motion } from "framer-motion";
import { HiSparkles, HiHeart, HiGlobe } from "react-icons/hi";
import { Link } from "react-router-dom";
function About() {
  return (
    <div style={{paddingTop:"5rem"}}>
      <section className="section" style={{minHeight:"60vh",display:"flex",alignItems:"center"}}>
        <div className="container">
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
            <span className="hero-badge">Our Story</span>
            <h1 className="section-title" style={{fontSize:"clamp(2.5rem,6vw,4rem)"}}>The SavoryBite Journey</h1>
            <p style={{color:"var(--text-secondary)",fontSize:"1.1rem",lineHeight:1.8,marginBottom:"1.5rem"}}>Born from a passion to showcase African cuisine at its finest, SavoryBite brings together centuries-old recipes and contemporary fine-dining presentation.</p>
            <p style={{color:"var(--text-secondary)",fontSize:"1.1rem",lineHeight:1.8,marginBottom:"2rem"}}>Our chefs source the finest ingredients, from premium local produce to carefully selected spices, ensuring every bite is an experience to remember.</p>
            <Link to="/menu" className="btn btn-primary btn-lg">Explore Our Menu</Link>
          </motion.div>
        </div>
      </section>
      <section className="section" style={{background:"var(--bg-secondary)"}}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">What drives us every day</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
            {[{icon:<HiSparkles />,title:"Craft Excellence",desc:"Every dish is a masterpiece, blending traditional recipes with modern culinary techniques."},{icon:<HiHeart />,title:"Rooted in Culture",desc:"We honor the rich culinary heritage of West Africa, bringing authentic flavors to every plate."},{icon:<HiGlobe />,title:"Global Standards",desc:"From sourcing to plating, we maintain international quality standards with local soul."}].map((v,i)=>(
              <motion.div key={i} className="glass" style={{padding:"2.5rem 2rem",textAlign:"center"}} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                <div style={{fontSize:"2.5rem",color:"var(--gold-400)",marginBottom:"1.25rem"}}>{v.icon}</div>
                <h3 style={{fontFamily:"var(--font-accent)",fontSize:"1.15rem",marginBottom:"0.75rem",color:"var(--text-primary)"}}>{v.title}</h3>
                <p style={{color:"var(--text-secondary)",fontSize:"0.9rem",lineHeight:1.7}}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;
