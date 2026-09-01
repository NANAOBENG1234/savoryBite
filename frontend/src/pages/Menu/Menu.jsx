import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import foods from "../../data/foods";
import categories from "../../data/categories";
import FoodCard from "../../components/FoodCard/FoodCard";
import SearchBar from "../../components/Search/SearchBar";
import Modal from "../../components/Modal/Modal";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils/formatPrice";
import { HiShoppingCart } from "react-icons/hi";
import toast from "react-hot-toast";
const addonsCatalog = [
  { id:"a1",name:"Extra Chicken",price:6.00 },{ id:"a2",name:"Beef Suya",price:7.00 },{ id:"a3",name:"Grilled Fish",price:8.00 },
  { id:"a4",name:"Extra Plantain",price:3.50 },{ id:"a5",name:"Moi Moi",price:4.00 },{ id:"a11",name:"Chilled Drink",price:2.50 },
  { id:"a12",name:"Zobo Drink",price:3.00 },{ id:"a14",name:"Small Chops Mix",price:7.00 },
];
function Menu() {
  const [sp, setSp] = useSearchParams();
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(sp.get("category") || "all");
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const filtered = useMemo(() => {
    let r = foods;
    if (activeCat !== "all") r = r.filter((f) => f.category === activeCat);
    if (search) { const q = search.toLowerCase(); r = r.filter((f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)); }
    return r;
  }, [activeCat, search]);
  const handleCat = (cat) => { setActiveCat(cat); setSp(cat === "all" ? {} : { category: cat }); };
  const openFood = (food) => { setSelectedFood(food); setSelectedAddons([]); };
  const toggleAddon = (addon) => setSelectedAddons((p) => p.find((a) => a.id === addon.id) ? p.filter((a) => a.id !== addon.id) : [...p, addon]);
  const handleAdd = () => { if (!selectedFood) return; addItem(selectedFood, selectedAddons); toast.success(`${selectedFood.name} added to cart!`); setSelectedFood(null); setSelectedAddons([]); };
  const total = selectedFood ? selectedFood.price + selectedAddons.reduce((s, a) => s + a.price, 0) : 0;
  return (
    <div style={{paddingTop:"5rem"}}>
      <section className="section">
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><h1 className="section-title">Our Menu</h1><p className="section-subtitle">Explore our carefully curated selection of premium African dishes</p></motion.div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2rem",marginBottom:"3rem"}}>
            <SearchBar value={search} onChange={setSearch} />
            <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem",justifyContent:"center"}}>
              <button className={`btn ${activeCat==="all"?"btn-primary":"btn-ghost"} btn-sm`} onClick={()=>handleCat("all")}>All</button>
              {categories.map((cat)=><button key={cat.id} className={`btn ${activeCat===cat.id?"btn-primary":"btn-ghost"} btn-sm`} onClick={()=>handleCat(cat.id)}>{cat.icon} {cat.name}</button>)}
            </div>
          </div>
          {filtered.length === 0 ? (<div className="empty-state"><div className="empty-state-icon">🔍</div><p>No dishes found</p><p style={{fontSize:"0.85rem",marginTop:"0.5rem"}}>Try a different search or category</p></div>)
          : (<motion.div className="food-grid" initial={{opacity:0}} animate={{opacity:1}}>
            {filtered.map((food)=><motion.div key={food.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.3}}><FoodCard food={food} onAddToCart={(f)=>addItem(f)} onQuickView={(f)=>openFood(f)} /></motion.div>)}
          </motion.div>)}
        </div>
      </section>
      <Modal isOpen={!!selectedFood} onClose={()=>setSelectedFood(null)}>
        {selectedFood && (<div>
          <img src={selectedFood.image} alt={selectedFood.name} style={{width:"100%",height:"280px",objectFit:"cover",borderRadius:"var(--radius-md)",marginBottom:"1.5rem"}} />
          <span className="food-card-category">{selectedFood.category}</span>
          <h2 style={{fontFamily:"var(--font-heading)",fontSize:"1.75rem",margin:"0.5rem 0"}}>{selectedFood.name}</h2>
          <p style={{color:"var(--text-secondary)",lineHeight:1.7,marginBottom:"1.5rem"}}>{selectedFood.description}</p>
          <div style={{marginBottom:"1.5rem"}}>
            <h4 style={{fontFamily:"var(--font-accent)",color:"var(--gold-400)",marginBottom:"0.75rem",fontSize:"0.95rem"}}>Customize Your Order</h4>
            <div className="addons-grid">{addonsCatalog.map((addon)=>(<div key={addon.id} className={`addon-chip ${selectedAddons.find((a)=>a.id===addon.id)?"selected":""}`} onClick={()=>toggleAddon(addon)}><span>{addon.name}</span><span style={{color:"var(--gold-400)",fontSize:"0.8rem"}}>+{formatPrice(addon.price)}</span></div>))}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"1.5rem",borderTop:"1px solid rgba(201,149,14,0.1)"}}>
            <div><div style={{fontSize:"0.85rem",color:"var(--text-muted)"}}>Total</div><span className="food-card-price">{formatPrice(total)}</span></div>
            <button className="btn btn-primary btn-lg" onClick={handleAdd}><HiShoppingCart /> Add to Cart</button>
          </div>
        </div>)}
      </Modal>
    </div>
  );
}
export default Menu;
