import { createContext} from "react";
import { ContextType } from "../hooks/CreateContextPro";
import { ThemeContextType } from "../hooks/ThemeContext";

export const MyContext = createContext<ContextType| undefined>(undefined);

export const ThemeContext = createContext<ThemeContextType | null>(null);