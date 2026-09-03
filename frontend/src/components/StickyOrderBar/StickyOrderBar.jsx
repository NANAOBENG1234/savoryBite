import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart, HiArrowRight } from "react-icons/hi";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";

function StickyOrderBar() {
  const { totalItems, totalPrice } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCart = () => window.dispatchEvent(new CustomEvent("cart-toggle"));

  return (
    <div className={`sticky-bar ${visible ? "visible" : ""}`}>
      <div className="sticky-bar-inner container">
        <button className="sticky-bar-cart" onClick={openCart}>
          <span className="sticky-bar-cart-icon"><HiShoppingCart /></span>
          {totalItems > 0 && <span className="sticky-bar-badge">{totalItems}</span>}
          <span className="sticky-bar-total">{formatPrice(totalPrice)}</span>
        </button>
        <Link to="/menu" className="btn btn-primary btn-sm sticky-bar-order">Order Now <HiArrowRight /></Link>
      </div>
    </div>
  );
}
export default StickyOrderBar;
