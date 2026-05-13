import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, color: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, color: string) => {
    setItems(current => {
      const existingItem = current.find(item => item.id === product.id && item.selectedColor === color);
      if (existingItem) {
        return current.map(item => 
          (item.id === product.id && item.selectedColor === color) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...current, { ...product, quantity: 1, selectedColor: color }];
    });
    setIsOpen(true); // Open cart when item added
  };

  const removeItem = (productId: string, color: string) => {
    setItems(current => current.filter(item => !(item.id === productId && item.selectedColor === color)));
  };

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, color);
      return;
    }
    setItems(current => current.map(item => 
      (item.id === productId && item.selectedColor === color) 
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = React.useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = React.useMemo(() => items.reduce((sum, item) => sum + (item.priceDiscount * item.quantity), 0), [items]);

  return (
    <CartContext.Provider value={{ 
      items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, isOpen, setIsOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
