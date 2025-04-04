import { useState, ReactNode, useEffect } from "react";
import { ThemeContext } from "../context/MyContext";

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}


export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
