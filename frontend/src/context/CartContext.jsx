import React, { createContext, useReducer, useContext } from "react";
const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = `${action.payload.id}-${JSON.stringify(action.payload.selectedAddons || [])}`;
      const existing = state.items.find((i) => i.cartKey === key);
      if (existing) return { ...state, items: state.items.map((i) => i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i) };
      return { ...state, items: [...state.items, { ...action.payload, cartKey: key, quantity: 1, selectedAddons: action.payload.selectedAddons || [] }] };
    }
    case "REMOVE_ITEM": return { ...state, items: state.items.filter((i) => i.cartKey !== action.payload) };
    case "UPDATE_QUANTITY": return { ...state, items: state.items.map((i) => i.cartKey === action.payload.cartKey ? { ...i, quantity: Math.max(1, action.payload.quantity) } : i) };
    case "CLEAR_CART": return { ...state, items: [] };
    default: return state;
  }
};
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return <CartContext.Provider value={{ cart: state, dispatch }}>{children}</CartContext.Provider>;
}
export function useCartContext() { return useContext(CartContext); }
