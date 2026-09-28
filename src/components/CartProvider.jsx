import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cartContext";
import { priceToNumber } from "./cartUtils";

const STORAGE_KEY = "houmaah-cart";
const WISHLIST_STORAGE_KEY = "houmaah-wishlist";

function createCartItem(product, size = "M") {
  return {
    id: `${product.id}-${size}`,
    productId: product.id,
    name: product.name,
    price: product.price,
    unitPrice: priceToNumber(product.price),
    image: product.image,
    alt: product.alt,
    size,
    quantity: 1,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window === "undefined") return [];

    try {
      const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  function addItem(product, size = "M") {
    setItems((current) => {
      const nextItem = createCartItem(product, size);
      const existing = current.find((item) => item.id === nextItem.id);

      if (existing) {
        return current.map((item) => (item.id === nextItem.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...current, nextItem];
    });
  }

  function updateQuantity(itemId, quantity) {
    setItems((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(itemId) {
    setItems((current) => current.filter((item) => item.id !== itemId));
  }

  function clearCart() {
    setItems([]);
  }

  function toggleWishlist(product) {
    setWishlistItems((current) => {
      const exists = current.some((item) => item.id === product.id);

      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          alt: product.alt,
          label: product.label,
        },
      ];
    });
  }

  function removeWishlistItem(productId) {
    setWishlistItems((current) => current.filter((item) => item.id !== productId));
  }

  function isInWishlist(productId) {
    return wishlistItems.some((item) => item.id === productId);
  }

  const value = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
    const delivery = subtotal >= 5000 || subtotal === 0 ? 0 : 350;
    const total = subtotal + delivery;

    return {
      addItem,
      clearCart,
      delivery,
      isInWishlist,
      itemCount,
      items,
      removeItem,
      removeWishlistItem,
      subtotal,
      toggleWishlist,
      total,
      updateQuantity,
      wishlistCount: wishlistItems.length,
      wishlistItems,
    };
  }, [items, wishlistItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
