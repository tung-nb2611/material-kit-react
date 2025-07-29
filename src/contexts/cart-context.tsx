// ✅ File: src/contexts/cart-context.tsx

import type { ReactNode } from 'react';
import type { ProductItemProps } from 'src/sections/product/product-item';

import { useState, useContext, createContext } from 'react';

export type CartItem = ProductItemProps & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductItemProps) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: ProductItemProps) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
