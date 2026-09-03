import React, { useState } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturedFoods from "../../sections/FeaturedFoods/FeaturedFoods";
import Categories from "../../sections/Categories/Categories";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import Testimonials from "../../sections/Testimonials/Testimonials";
import DeliveryInfo from "../../sections/DeliveryInfo/DeliveryInfo";
import Promotions from "../../sections/Promotions/Promotions";
import StickyOrderBar from "../../components/StickyOrderBar/StickyOrderBar";
import Modal from "../../components/Modal/Modal";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { HiStar, HiShoppingCart } from "react-icons/hi";

function Home() {
  const [quickViewFood, setQuickViewFood] = useState(null);
  const { addItem } = useCart();
  return (<>
    <HeroSection title="Where Tradition Meets Luxury" subtitle="Experience the finest African cuisine, crafted with passion and served with elegance. Every dish tells a story." ctaText="Order Now" ctaLink="/menu" backgroundImage="https://images.unsplash.com/photo-1540100716001-4b432820e37f?w=1600&q=80&auto=format&fit=crop" badge="Premium African Dining" />
    <Categories />
    <FeaturedFoods onQuickView={setQuickViewFood} />
    <Promotions />
    <HowItWorks />
    <Testimonials />
    <DeliveryInfo />
    <StickyOrderBar />
    <Modal isOpen={!!quickViewFood} onClose={() => setQuickViewFood(null)}>
      {quickViewFood && (<div>
        <img src={quickViewFood.image} alt={quickViewFood.name} style={{width:"100%",height:"300px",objectFit:"cover",borderRadius:"var(--radius-md)",marginBottom:"1.5rem"}} />
        <span className="food-card-category">{quickViewFood.category}</span>
        <h2 style={{fontFamily:"var(--font-heading)",fontSize:"1.75rem",margin:"0.5rem 0"}}>{quickViewFood.name}</h2>
        <p style={{color:"var(--text-secondary)",lineHeight:1.7,marginBottom:"1rem"}}>{quickViewFood.description}</p>
        <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1rem"}}>
          <div className="rating-stars">{Array.from({length:5}).map((_,i)=><HiStar key={i} style={{opacity:i<Math.floor(quickViewFood.rating)?1:0.3}} />)}</div>
          <span style={{color:"var(--text-muted)",fontSize:"0.9rem"}}>{quickViewFood.rating} ({quickViewFood.reviews} reviews)</span>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span className="food-card-price">{formatPrice(quickViewFood.price)}</span>
          <button className="btn btn-primary" onClick={()=>{addItem(quickViewFood);setQuickViewFood(null);}}><HiShoppingCart /> Add to Cart</button>
        </div>
      </div>)}
    </Modal>
  </>);
}
export default Home;
