import React from "react";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";
const testimonials = [
  { id: 1, name: "Amara O.", text: "The jollof rice at SavoryBite is absolutely incredible. Reminds me of home. The presentation is world-class.", rating: 5, initials: "AO" },
  { id: 2, name: "Kwame B.", text: "Finally, a platform that treats African cuisine with the premium respect it deserves. The suya platter is a masterpiece.", rating: 5, initials: "KB" },
  { id: 3, name: "Nana Y.", text: "From the gold-accented packaging to the rich flavors — every detail shows they care. My go-to for special occasions.", rating: 5, initials: "NY" },
];
function Testimonials() {
  return (
    <section className="section" style={{background:"var(--bg-secondary)"}}>
      <div className="container">
        <h2 className="section-title">What Our Guests Say</h2>
        <p className="section-subtitle">Real experiences from our community</p>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} className="testimonial-card" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.12}}>
              <div className="testimonial-stars">{Array.from({length:t.rating}).map((_,j)=><HiStar key={j} />)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div><div className="testimonial-name">{t.name}</div><div className="testimonial-role">Verified Diner</div></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
