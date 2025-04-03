import { createContext, useState, ReactNode } from "react";

export interface ContextType {
  colorMode: ColorType;
  changeColorMode: (color: ColorType) => void;
  page: string;
  setPage: (page: string) => void;
}

type ColorType = "light" | "dark";

export const MyContext = createContext<ContextType | undefined>(undefined);

function CreateContextPro({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorType>("light");
  const [page, setPage] = useState<string>("Books");

  const changeColorMode = (color: ColorType) => {
    setColorMode(color);
  };

  return (
    <MyContext.Provider value={{ colorMode, changeColorMode, page, setPage }}>
      {children}
    </MyContext.Provider>
  );
}

export default CreateContextPro;