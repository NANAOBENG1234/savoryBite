import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CartSidebar from "./components/Cart/CartSidebar";
import WhatsAppButton from "./components/Buttons/WhatsAppButton";
import ScrollToTop from "./components/Buttons/ScrollToTop";
import SplashScreen from "./components/SplashScreen/SplashScreen";

function App() {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setSplashVisible(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <SplashScreen visible={splashVisible} />
          <ScrollToTop />
          <Navbar />
          <AnimatePresence mode="wait">
            <main><AppRoutes /></main>
          </AnimatePresence>
          <CartSidebar />
          <WhatsAppButton />
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: "#fffdf8", color: "#1a2544", border: "1px solid rgba(201,149,14,0.25)", borderRadius: "12px", boxShadow: "0 8px 30px rgba(26,37,68,0.12)" } }} />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
