import React from "react";
import { motion } from "framer-motion";
import { HiTruck, HiClock, HiShieldCheck } from "react-icons/hi";
function DeliveryInfo() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Delivery Experience</h2>
        <p className="section-subtitle">We bring the restaurant to your doorstep</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.5rem",maxWidth:"900px",margin:"0 auto"}}>
          {[{icon:<HiTruck />,title:"Free Delivery",desc:"On orders over GH₵ 100 within Legon"},{icon:<HiClock />,title:"30-45 Minutes",desc:"Average delivery time from order"},{icon:<HiShieldCheck />,title:"Premium Packaging",desc:"Temperature-controlled & spill-proof"}].map((f,i)=>(
            <motion.div key={i} className="glass" style={{padding:"2rem",textAlign:"center"}} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
              <div style={{fontSize:"2rem",color:"var(--gold-400)",marginBottom:"1rem"}}>{f.icon}</div>
              <h3 style={{fontFamily:"var(--font-accent)",fontSize:"1.1rem",marginBottom:"0.5rem",color:"var(--text-primary)"}}>{f.title}</h3>
              <p style={{color:"var(--text-secondary)",fontSize:"0.9rem"}}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DeliveryInfo;
