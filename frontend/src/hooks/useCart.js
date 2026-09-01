import { useCartContext } from "../context/CartContext";
export function useCart() {
  const { cart, dispatch } = useCartContext();
  const addItem = (item, selectedAddons = []) => dispatch({ type: "ADD_ITEM", payload: { ...item, selectedAddons } });
  const removeItem = (cartKey) => dispatch({ type: "REMOVE_ITEM", payload: cartKey });
  const updateQuantity = (cartKey, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { cartKey, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const getItemPrice = (item) => { const a = (item.selectedAddons || []).reduce((s, x) => s + x.price, 0); return (item.price + a) * item.quantity; };
  const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.items.reduce((s, i) => { const a = (i.selectedAddons || []).reduce((x, y) => x + y.price, 0); return s + (i.price + a) * i.quantity; }, 0);
  return { items: cart.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, getItemPrice };
}
