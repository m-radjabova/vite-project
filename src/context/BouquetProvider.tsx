import { createContext, useContext } from "react";
import useBouquet from "../hooks/useBouquet";
import { BouqetType } from "../page/types/Types";

interface BouquetContextType {
  bouquet: BouqetType[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const BouquetContext = createContext<BouquetContextType | null>(null);

export const BouquetProvider = ({ children }: { children: React.ReactNode }) => {
  const { bouquet, favorites, toggleFavorite } = useBouquet(); 
  return (
    <BouquetContext.Provider value={{ bouquet, favorites, toggleFavorite }}>
      {children}
    </BouquetContext.Provider>
  );
};

export const useBouquetContext = () => {
  const ctx = useContext(BouquetContext);
  if (!ctx) throw new Error("useBouquetContext must be used within BouquetProvider");
  return ctx;
};