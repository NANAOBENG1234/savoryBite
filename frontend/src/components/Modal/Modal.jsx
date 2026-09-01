import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
          <motion.div className="modal-content" initial={{opacity:0,scale:0.9,y:40}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.9,y:40}} transition={{type:"spring",stiffness:300,damping:25}} onClick={(e)=>e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}><HiX /></button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Modal;
