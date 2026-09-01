import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Auth from "./pages/Auth/Auth";

function AnimatedPage({ children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
      <Route path="/menu" element={<AnimatedPage><Menu /></AnimatedPage>} />
      <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
      <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
      <Route path="/checkout" element={<AnimatedPage><CheckoutPage /></AnimatedPage>} />
      <Route path="/auth" element={<AnimatedPage><Auth /></AnimatedPage>} />
    </Routes>
  );
}
export default AppRoutes;
