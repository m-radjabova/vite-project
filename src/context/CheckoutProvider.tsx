import React, { createContext, useState } from "react";
import { ProductType } from "../page/types/Types";

export type CheckoutData = {
  product?: ProductType[];
  quantity?: number;
  delivery?: {
    fullName: string;
    phone: string;
    address: string;
    deliveryType: string;
    notes?: string;
  };
};

export const CheckoutContext = createContext<{
  data: CheckoutData;
  setData: React.Dispatch<React.SetStateAction<CheckoutData>>;
}>({
  data: {},
  setData: () => {},
});


export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CheckoutData>({});
  return (
    <CheckoutContext.Provider value={{ data, setData }}>
      {children}
    </CheckoutContext.Provider>
  );
};