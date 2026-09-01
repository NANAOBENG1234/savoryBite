import React from "react";
import { Link } from "react-router-dom";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
function Footer() {
  return (
    <footer style={{ background: "var(--dark-900)", borderTop: "1px solid rgba(201,149,14,0.1)", padding: "4rem 2rem 2rem" }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", background: "linear-gradient(135deg,var(--gold-300),var(--gold-500))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "1rem" }}>SavoryBite</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>Premium African dining experience. Every dish tells a story of tradition, spice, and soul.</p>
        </div>
        <div>
          <h4 style={{ color: "var(--gold-400)", marginBottom: "1rem", fontFamily: "var(--font-accent)" }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Link to="/" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Home</Link>
            <Link to="/menu" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Menu</Link>
            <Link to="/about" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Our Story</Link>
            <Link to="/contact" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Contact</Link>
          </div>
        </div>
        <div>
          <h4 style={{ color: "var(--gold-400)", marginBottom: "1rem", fontFamily: "var(--font-accent)" }}>Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><HiLocationMarker style={{ color: "var(--gold-400)" }} /> Legon, Accra</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><HiPhone style={{ color: "var(--gold-400)" }} /> +233 50 000 0000</span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><HiMail style={{ color: "var(--gold-400)" }} /> hello@savorybite.com</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingTop: "2rem", borderTop: "1px solid rgba(201,149,14,0.08)", color: "var(--text-muted)", fontSize: "0.85rem" }}>&copy; {new Date().getFullYear()} SavoryBite. All rights reserved.</div>
    </footer>
  );
}
export default Footer;
