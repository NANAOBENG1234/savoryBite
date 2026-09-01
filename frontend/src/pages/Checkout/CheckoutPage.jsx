import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";
function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const s = (e) => { e.preventDefault(); toast.success("Order placed successfully!"); clearCart(); };
  if (items.length === 0) return (<div style={{paddingTop:"5rem"}}><section className="section"><div className="container" style={{textAlign:"center"}}><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><div className="empty-state-icon" style={{fontSize:"4rem",marginBottom:"1rem"}}>🍽️</div><h2 style={{fontFamily:"var(--font-heading)",fontSize:"2rem",marginBottom:"1rem"}}>Your cart is empty</h2><p style={{color:"var(--text-secondary)",marginBottom:"2rem"}}>Add some delicious dishes before checking out.</p><Link to="/menu" className="btn btn-primary btn-lg">Browse Menu</Link></motion.div></div></section></div>);
  return (
    <div style={{paddingTop:"5rem"}}>
      <section className="section">
        <div className="container" style={{maxWidth:"800px",margin:"0 auto"}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{textAlign:"center",marginBottom:"3rem"}}><span className="hero-badge">Secure Checkout</span><h1 className="section-title">Complete Your Order</h1></motion.div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem"}}>
            <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}}>
              <div className="glass" style={{padding:"2rem"}}>
                <h3 style={{fontFamily:"var(--font-accent)",color:"var(--gold-400)",marginBottom:"1.5rem"}}>Delivery Details</h3>
                <form onSubmit={s}>
                  <div className="form-group"><label>Full Name</label><input name="name" value={form.name} onChange={h} required /></div>
                  <div className="form-group"><label>Email</label><input name="email" type="email" value={form.email} onChange={h} required /></div>
                  <div className="form-group"><label>Phone</label><input name="phone" type="tel" value={form.phone} onChange={h} required /></div>
                  <div className="form-group"><label>Delivery Address</label><textarea name="address" rows="2" value={form.address} onChange={h} required /></div>
                  <div className="form-group"><label>Order Notes (optional)</label><textarea name="notes" rows="2" value={form.notes} onChange={h} /></div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",marginTop:"1rem"}}>Place Order — {formatPrice(totalPrice)}</button>
                </form>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}>
              <div className="glass" style={{padding:"2rem"}}>
                <h3 style={{fontFamily:"var(--font-accent)",color:"var(--gold-400)",marginBottom:"1.5rem"}}>Order Summary</h3>
                {items.map((item) => { const a = (item.selectedAddons||[]).reduce((s,x)=>s+x.price,0); const t = (item.price+a)*item.quantity; return (
                  <div key={item.cartKey} style={{display:"flex",gap:"1rem",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                    <img src={item.image} alt={item.name} style={{width:48,height:48,borderRadius:"var(--radius-sm)",objectFit:"cover"}} />
                    <div style={{flex:1}}><div style={{fontWeight:600,fontSize:"0.9rem"}}>{item.name}</div><div style={{fontSize:"0.8rem",color:"var(--text-muted)"}}>Qty: {item.quantity}</div></div>
                    <div style={{fontWeight:600,color:"var(--gold-400)"}}>{formatPrice(t)}</div>
                  </div>
                );})}
                <div style={{display:"flex",justifyContent:"space-between",paddingTop:"1rem",marginTop:"1rem"}}>
                  <span style={{fontWeight:600}}>Total</span>
                  <strong style={{fontFamily:"var(--font-heading)",fontSize:"1.5rem",color:"var(--gold-400)"}}>{formatPrice(totalPrice)}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CheckoutPage;
