import { Dispatch, useReducer } from "react";
import { MyContext } from "../context/MyContext";
import { ReactNode } from 'react';

export interface Tips {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  address: string;
}

interface TypeState {
  tips: Tips[];
  selectedTip: Tips | undefined;
}

type DeleteAction = { type: "DELETE"; payload: number };
type DeleteAllAction = { type: "DELETE_ALL" };
type AddTipAction = { type: "ADD_TIP"; payload: Tips };
type SelectedTipAction = { type: "SELECTED_TIP"; payload: Tips | undefined };
type EditAction = { type: "EDIT"; payload: Tips };
type GetAction = { type: "GET" };

type Action =
  | DeleteAction
  | DeleteAllAction
  | AddTipAction
  | SelectedTipAction
  | EditAction
  | GetAction;

export interface ContextType {
  state: TypeState;
  dispatch: Dispatch<Action>;
}

function saveToLocalStorage(tips: Tips[]) {
  localStorage.setItem("tips", JSON.stringify(tips));
}

function getFromLocalStorage(): Tips[] {
  const storedTips = localStorage.getItem("tips");
  return storedTips ? JSON.parse(storedTips) : [];
}

function reducer(state: TypeState, action: Action): TypeState {
  switch (action.type) {
    case "DELETE": {
      const updatedTips = state.tips.filter((tip) => tip.id !== action.payload);
      saveToLocalStorage(updatedTips);
      return {
        ...state,
        tips: updatedTips,
      };
    }

    case "DELETE_ALL": {
      saveToLocalStorage([]);
      return {
        ...state,
        tips: [],
      };
    }

    case "ADD_TIP": {
      const newTip = { ...action.payload, id: Date.now() };
      const updatedTips = [...state.tips, newTip];
      saveToLocalStorage(updatedTips);
      return {
        ...state,
        tips: updatedTips,
      };
    }

    case "SELECTED_TIP": {
      return {
        ...state,
        selectedTip: action.payload,
      };
    }

    case "EDIT": {
      const updatedTips = state.tips.map((tip) =>
        tip.id === action.payload.id ? { ...tip, ...action.payload } : tip
      );
      saveToLocalStorage(updatedTips);
      return {
        ...state,
        tips: updatedTips,
        selectedTip: undefined,
      };
    }

    case "GET": {
      const tipsFromStorage = getFromLocalStorage();
      return {
        ...state,
        tips: tipsFromStorage,
      };
    }

    default:
      return state;
  }
}

function CreateContextPro({ children }: { children: ReactNode }) {
  
  const initialState: TypeState = {
    tips: getFromLocalStorage().length > 0
      ? getFromLocalStorage()
      : [
          { id: 1, name: "Chidi", lastName: "Anagonye", phone: "555-366-8987", address: "St. John's University, Sydney, Australia" },
          { id: 2, name: "Tahani", lastName: "Al-Jamil", phone: "555-276-7991", address: "1 Lancaster Terrace, London, England" },
          { id: 3, name: "Jason", lastName: "Mendoza", phone: "555-113-8388", address: "779 William St, Miami, Florida" },
          { id: 4, name: "Eleanor", lastName: "Shellstrop", phone: "555-123-4567", address: "1234 Elm St, Los Angeles, CA" },
          { id: 5, name: "Michael", lastName: "Scofield", phone: "555-987-6543", address: "5678 Oak St, Chicago, IL" },
          { id: 6, name: "Sara", lastName: "Tancredi", phone: "555-555-5555", address: "9101 Maple Ave, Seattle, WA" },
          { id: 7, name: "Lincoln", lastName: "Burrows", phone: "555-444-4444", address: "1213 Pine St, Boston, MA" },
          { id: 8, name: "Veronica", lastName: "Donovan", phone: "555-222-2222", address: "1415 Birch St, San Francisco, CA" },
          { id: 9, name: "T-Bag", lastName: "Bagwell", phone: "555-333-3333", address: "1617 Cedar St, New York, NY" },
        ],
    selectedTip: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}

export default CreateContextPro;
