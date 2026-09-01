import React from "react";
import { motion } from "framer-motion";
function Loader({ text = "Loading..." }) {
  return (<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"4rem",gap:"1.5rem"}}>
    <motion.div className="loader" animate={{rotate:360}} transition={{repeat:Infinity,duration:0.8,ease:"linear"}} />
    <p style={{color:"var(--text-muted)",fontFamily:"var(--font-accent)"}}>{text}</p>
  </div>);
}
export default Loader;
