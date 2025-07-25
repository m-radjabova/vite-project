import { createContext, useContext } from "react";
import { BouqetType } from "../page/types/Types";
import useBouquet from "../hooks/useBouquet";

type CartContextType = {
  cart: BouqetType[];
  addToCart: (item: BouqetType, count: number, userId?: string, userName?: string) => void;
  deleteBouquetFromCart: (id: string) => void;
    updateItemCount: (id: string, count: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

    const {addToCart, cart, deleteBouquetFromCart, updateItemCount } = useBouquet()

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteBouquetFromCart, updateItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};