import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

const PRODUCTS = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Vase',
    price: 3499,
    rating: 4.8,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80',
    description: 'A beautifully hand-thrown ceramic vase with an organic, matte finish. Each piece is unique, shaped by artisan hands in small batches.',
    features: ['Hand-thrown by skilled artisans', 'Food-safe matte glaze', 'Height: 28cm, Diameter: 15cm', 'Each piece is one-of-a-kind']
  },
  {
    id: 2,
    name: 'Walnut Desk Organizer',
    price: 4299,
    rating: 4.9,
    category: 'Workspace',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
    description: 'Sculpted from solid American walnut, this organizer brings warmth and order to any workspace. Features compartments for pens, cards, and small items.',
    features: ['Solid American walnut', 'Natural oil finish', '5 organized compartments', 'Dimensions: 25 x 12 x 10 cm']
  },
  {
    id: 3,
    name: 'Linen Throw Blanket',
    price: 5999,
    rating: 4.7,
    category: 'Textiles',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    description: 'Stonewashed Belgian linen with a lived-in softness from day one. The perfect weight for year-round comfort on the couch or at the foot of the bed.',
    features: ['100% Belgian linen', 'Stonewashed for softness', 'Size: 170 x 230cm', 'Gets softer with every wash']
  },
  {
    id: 4,
    name: 'Brass Desk Lamp',
    price: 7499,
    rating: 4.9,
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80',
    description: 'An adjustable desk lamp in solid brass with a warm patina that develops over time. The weighted base keeps it steady, while the articulating arm lets you direct light exactly where you need it.',
    features: ['Solid brass construction', 'Adjustable articulating arm', 'E27 bulb socket (bulb not included)', 'Weighted base for stability']
  },
  {
    id: 5,
    name: 'Handwoven Jute Rug',
    price: 6499,
    rating: 4.6,
    category: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80',
    description: 'Ethically sourced jute, handwoven by women artisans in Rajasthan. The natural fiber brings warmth and texture to any room.',
    features: ['100% natural jute', 'Handwoven by artisans', 'Size: 150 x 230cm', 'Non-slip backing']
  },
  {
    id: 6,
    name: 'Copper Pour-Over Set',
    price: 3999,
    rating: 4.8,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    description: 'Elevate your morning ritual with this hand-hammered copper pour-over set. Includes dripper, stand, and a matching copper-trimmed glass carafe.',
    features: ['Hand-hammered copper', 'Borosilicate glass carafe', 'Serves 2-4 cups', 'Includes paper filters (10pc)']
  },
  {
    id: 7,
    name: 'Botanical Print Set',
    price: 2999,
    rating: 4.5,
    category: 'Wall Art',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80',
    description: 'A set of three archival-quality botanical prints on heavyweight cotton paper. Pressed flowers photographed in stunning detail.',
    features: ['Set of 3 prints', 'Archival giclée on cotton paper', 'A3 size (29.7 x 42cm)', 'Signed and numbered edition']
  },
  {
    id: 8,
    name: 'Olive Wood Salad Set',
    price: 2499,
    rating: 4.7,
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80',
    description: 'Two serving utensils carved from a single piece of Mediterranean olive wood. The natural grain patterns make each set truly unique.',
    features: ['Mediterranean olive wood', 'One-piece construction', 'Bowl length: 30cm', 'Food-safe mineral oil finish']
  }
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('atelier-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState(null);

  // useEffect: sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('atelier-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // useEffect: auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message, icon = '✓') => {
    setToast({ message, icon });
  }, []);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Cart cleared');
  }, [showToast]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    products: PRODUCTS,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toast,
    showToast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
