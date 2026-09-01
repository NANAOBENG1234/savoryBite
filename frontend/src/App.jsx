import React from "react";
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

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <AnimatePresence mode="wait">
            <main><AppRoutes /></main>
          </AnimatePresence>
          <CartSidebar />
          <WhatsAppButton />
          <Footer />
          <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: "#1a1a1a", color: "#faf6ef", border: "1px solid rgba(201,149,14,0.2)", borderRadius: "12px" } }} />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
export default App;
