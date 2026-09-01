import React from "react";
import { FaWhatsapp } from "react-icons/fa";
const PHONE = "233500000000";
function WhatsAppButton() {
  return <a href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Hi! I'd like to place an order from SavoryBite 🍽️")}`} target="_blank" rel="noopener noreferrer" className="whatsapp-fab" title="Order via WhatsApp"><FaWhatsapp /></a>;
}
export default WhatsAppButton;
