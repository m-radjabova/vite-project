import { createContext, useContext } from "react";
import { BouqetType, OrderType } from "../page/types/Types";
import useBouquet from "../hooks/useBouquet";
import { FieldValues } from "react-hook-form";

type CartContextType = {
  cart: BouqetType[];
  addToCart: (item: BouqetType, count: number, userId?: string, userName?: string) => void;
  deleteBouquetFromCart: (id: string) => void;
  updateItemCount: (id: string, count: number) => void;
  addOrder : (orderData: FieldValues) => Promise<void>;
  clearCart: () => void;
  orders: OrderType[];
  updateOrderStatus: (orderId: string, newStatus: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const {addToCart, cart, deleteBouquetFromCart, updateItemCount, addOrder, clearCart, orders, updateOrderStatus } = useBouquet()

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteBouquetFromCart, updateItemCount, addOrder, clearCart, orders, updateOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};