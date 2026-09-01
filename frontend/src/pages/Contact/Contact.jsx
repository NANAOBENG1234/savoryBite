import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import toast from "react-hot-toast";
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const s = (e) => { e.preventDefault(); toast.success("Message sent! We'll get back to you shortly."); setForm({ name: "", email: "", message: "" }); };
  return (
    <div style={{paddingTop:"5rem"}}>
      <section className="section">
        <div className="container" style={{maxWidth:"1000px",margin:"0 auto"}}>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{textAlign:"center",marginBottom:"3rem"}}>
            <span className="hero-badge">Get in Touch</span>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">We'd love to hear from you. Reach out for reservations, inquiries, or feedback.</p>
          </motion.div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"2rem"}}>
            <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.2}}>
              <div className="glass" style={{padding:"2.5rem"}}>
                <h3 style={{fontFamily:"var(--font-accent)",color:"var(--gold-400)",marginBottom:"2rem"}}>Reach Us Directly</h3>
                <div style={{display:"flex",flexDirection:"column",gap:"1.5rem"}}>
                  {[{icon:<HiLocationMarker />,title:"Location",desc:"Legon, Accra — Ghana"},{icon:<HiPhone />,title:"Phone",desc:"+233 50 000 0000"},{icon:<HiMail />,title:"Email",desc:"hello@savorybite.com"}].map((c,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                      <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(201,149,14,0.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--gold-400)",fontSize:"1.2rem"}}>{c.icon}</div>
                      <div><div style={{fontWeight:600,fontSize:"0.9rem"}}>{c.title}</div><div style={{color:"var(--text-secondary)",fontSize:"0.85rem"}}>{c.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.3}}>
              <div className="glass" style={{padding:"2.5rem"}}>
                <h3 style={{fontFamily:"var(--font-accent)",color:"var(--gold-400)",marginBottom:"1.5rem"}}>Send a Message</h3>
                <form onSubmit={s}>
                  <div className="form-group"><input name="name" placeholder="Your Name" value={form.name} onChange={h} required /></div>
                  <div className="form-group"><input name="email" type="email" placeholder="Your Email" value={form.email} onChange={h} required /></div>
                  <div className="form-group"><textarea name="message" placeholder="Your Message" rows="4" value={form.message} onChange={h} required /></div>
                  <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Send Message</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Contact;
