/**
 * CartContext.jsx
 * ----------------
 * Provides global shopping cart state with add, remove, update-quantity,
 * and clear operations. Cart is persisted in localStorage.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'kaarya_griha_cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  /** Keep localStorage in sync whenever cartItems changes */
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  /** Total number of individual units across all cart items */
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  /** Subtotal (before GST / shipping) */
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /**
   * Add a product to the cart.
   * If it already exists, increment its quantity up to available stock.
   */
  const addItemToCart = useCallback((product, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;
        const safeQuantity = Math.min(newQuantity, product.stock);
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: safeQuantity } : item
        );
      }

      // New item — add with requested quantity (bounded by stock)
      return [
        ...prevItems,
        {
          id:       product.id,
          name:     product.name,
          category: product.category,
          price:    product.price,
          stock:    product.stock,
          image:    product.image,
          quantity: Math.min(quantityToAdd, product.stock),
        },
      ];
    });
  }, []);

  /** Update the quantity of a specific cart item. Remove if qty drops to 0. */
  const updateItemQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(newQuantity, item.stock) }
            : item
        )
      );
    }
  }, []);

  /** Remove a product from the cart entirely */
  const removeItemFromCart = useCallback((productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  }, []);

  /** Empty the cart */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const contextValue = {
    cartItems,
    cartItemCount,
    cartSubtotal,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/** Custom hook to consume cart context */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a <CartProvider>');
  }
  return context;
}
