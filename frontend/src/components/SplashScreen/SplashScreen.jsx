import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function SplashScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="splash-sun" />
          <motion.div
            className="splash-logo"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <span className="splash-logo-mark">S</span>
          </motion.div>
          <motion.h1
            className="splash-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Savory<span className="splash-title-accent">Bite</span>
          </motion.h1>
          <motion.p
            className="splash-tagline"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Premium African Dining
          </motion.p>
          <motion.div
            className="splash-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.65, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default SplashScreen;
