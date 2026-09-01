import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const s = (e) => { e.preventDefault(); toast.success(isLogin ? "Welcome back!" : "Account created successfully!"); navigate("/"); };
  return (
    <div style={{paddingTop:"5rem",minHeight:"100vh",display:"flex",alignItems:"center"}}>
      <div className="container">
        <motion.div className="auth-form" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
          <div style={{textAlign:"center",marginBottom:"2rem"}}>
            <span className="hero-badge">{isLogin ? "Welcome Back" : "New Here?"}</span>
            <h1 style={{fontFamily:"var(--font-heading)",fontSize:"2rem",background:"linear-gradient(135deg,var(--gold-300),var(--gold-500))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{isLogin ? "Sign In" : "Create Account"}</h1>
          </div>
          <div className="glass" style={{padding:"2.5rem"}}>
            <form onSubmit={s}>
              {!isLogin && <div className="form-group"><label>Full Name</label><input name="name" placeholder="Your name" value={form.name} onChange={h} required={!isLogin} /></div>}
              <div className="form-group"><label>Email</label><input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={h} required /></div>
              <div className="form-group"><label>Password</label><input name="password" type="password" placeholder="••••••••" value={form.password} onChange={h} required /></div>
              <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",marginTop:"0.5rem"}}>{isLogin ? "Sign In" : "Create Account"}</button>
            </form>
            <div className="form-toggle" onClick={() => setIsLogin(!isLogin)}>{isLogin ? <>Don't have an account? <strong>Sign up</strong></> : <>Already have an account? <strong>Sign in</strong></>}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default Auth;
