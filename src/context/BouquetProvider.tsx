import { createContext, useContext } from "react";
import useBouquet from "../hooks/useBouquet";
import { BouqetType } from "../page/types/Types";
import { FieldValues } from "react-hook-form";

interface BouquetContextType {
  bouquet: BouqetType[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addBouquet: (data: FieldValues) => void;
  deleteBouquet: (id: string) => void;
  updateBouquet: (id: string, data: FieldValues) => void;
}

const BouquetContext = createContext<BouquetContextType | null>(null);

export const BouquetProvider = ({ children }: { children: React.ReactNode }) => {
  const { bouquet, favorites, toggleFavorite, addBouquet, deleteBouquet, updateBouquet } = useBouquet(); 
  return (
    <BouquetContext.Provider value={{ bouquet, favorites, toggleFavorite, addBouquet, deleteBouquet, updateBouquet }}>
      {children}
    </BouquetContext.Provider>
  );
};

export const useBouquetContext = () => {
  const ctx = useContext(BouquetContext);
  if (!ctx) throw new Error("useBouquetContext must be used within BouquetProvider");
  return ctx;
};