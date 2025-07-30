import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(book, qty) {
    setCart(prev => {
      const existing = prev.find(i => i.id === book.id);
      if (existing) {
        return prev.map(i =>
          i.id === book.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...book, quantity: qty }];
    });
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}