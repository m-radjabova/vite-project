import { createContext, useContext} from "react";
import { ContextType } from "../hooks/CreateContextPro";
import { CheckoutContext } from "./CheckoutProvider";


export const MyContext = createContext<ContextType | undefined>(undefined);

export const useCheckout = () => useContext(CheckoutContext);


