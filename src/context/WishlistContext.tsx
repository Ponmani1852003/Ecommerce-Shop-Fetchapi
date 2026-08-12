import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/Product";
import { getFromStorage, saveToStorage } from "../utils/localStorage";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>(() =>
    getFromStorage<Product[]>("wishlist", [])
  );

  useEffect(() => {
    saveToStorage("wishlist", wishlist);
  }, [wishlist]);

  function addToWishlist(product: Product) {
    setWishlist((prev) => {
      const alreadyExists = prev.some((p) => p.id === product.id);
      if (alreadyExists) return prev;
      return [...prev, product];
    });
  }

  function removeFromWishlist(productId: number) {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  }

  function isInWishlist(productId: number) {
    return wishlist.some((p) => p.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}