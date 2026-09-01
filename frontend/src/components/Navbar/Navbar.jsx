import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiShoppingCart, HiUser } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => { setMobileOpen(false); }, [location]);
  const links = [{ to: "/", label: "Home" }, { to: "/menu", label: "Menu" }, { to: "/about", label: "Our Story" }, { to: "/contact", label: "Contact" }];
  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="navbar-logo">SavoryBite</Link>
      <div className={`navbar-links ${mobileOpen ? "open" : ""}`}>
        {links.map((link) => (<Link key={link.to} to={link.to} className={location.pathname === link.to ? "active" : ""}>{link.label}</Link>))}
      </div>
      <div className="navbar-actions">
        <button className="btn-icon btn-ghost" onClick={() => window.dispatchEvent(new CustomEvent("cart-toggle"))} style={{ position: "relative" }}>
          <HiShoppingCart />
          {totalItems > 0 && (<span style={{ position: "absolute", top: -2, right: -2, background: "var(--gold-400)", color: "var(--black)", borderRadius: "50%", width: 20, height: 20, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{totalItems}</span>)}
        </button>
        <Link to="/auth" className="btn-icon btn-ghost"><HiUser /></Link>
        <button className="mobile-toggle btn-icon btn-ghost" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <HiX /> : <HiMenu />}</button>
      </div>
    </nav>
  );
}
export default Navbar;
