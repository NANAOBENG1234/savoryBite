import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { const h = () => setIsOpen((p) => !p); window.addEventListener("cart-toggle", h); return () => window.removeEventListener("cart-toggle", h); }, []);
  return (<>
    <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header"><h2>Your Order</h2><button className="cart-close" onClick={() => setIsOpen(false)}><HiX /></button></div>
      <div className="cart-items">
        {items.length === 0 ? <div className="empty-state"><div className="empty-state-icon">🍽️</div><p>Your cart is empty</p><p style={{fontSize:"0.85rem",marginTop:"0.5rem"}}>Add some delicious dishes!</p></div>
        : <AnimatePresence>{items.map((item) => { const a = (item.selectedAddons||[]).reduce((s,x)=>s+x.price,0); const t = (item.price+a)*item.quantity; return (
          <motion.div key={item.cartKey} className="cart-item" layout initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}}>
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              {item.selectedAddons?.length > 0 && <div style={{fontSize:"0.75rem",color:"var(--text-muted)",marginTop:"0.25rem"}}>+ {item.selectedAddons.map(x=>x.name).join(", ")}</div>}
              <div className="cart-item-price">{formatPrice(t)}</div>
              <div className="cart-item-qty">
                <button onClick={()=>updateQuantity(item.cartKey,item.quantity-1)}><HiMinus /></button>
                <span>{item.quantity}</span>
                <button onClick={()=>updateQuantity(item.cartKey,item.quantity+1)}><HiPlus /></button>
                <button className="cart-item-remove" onClick={()=>removeItem(item.cartKey)} style={{marginLeft:"auto",padding:"0.5rem"}}><HiTrash /></button>
              </div>
            </div>
          </motion.div>
        );})}</AnimatePresence>}
      </div>
      <div className="cart-footer">
        <div className="cart-total"><span>Total ({totalItems} items)</span><strong>{formatPrice(totalPrice)}</strong></div>
        <Link to="/checkout" className="btn btn-primary" style={{width:"100%",textAlign:"center"}} onClick={()=>setIsOpen(false)}>Proceed to Checkout</Link>
      </div>
    </div>
  </>);
}
export default CartSidebar;
