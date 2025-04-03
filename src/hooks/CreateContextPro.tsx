
import { createContext, useState, ReactNode } from "react";

interface Notes {
  id: number;
  title: string;
  date: string;
}

interface ContextType {
  notes: Notes[];
  filteredNotes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
  addNotes: (title: string) => void;
  searchNotes: (query: string) => void;
  resetSearch: () => void;
}

export const MyContext = createContext<ContextType | undefined>(undefined);

function CreateContextPro({ children }: { children: ReactNode }) {
  const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [notes, setNotes] = useState<Notes[]>([
    { id: 1, title: "First Note", date: getFormattedDate() },
    { id: 2, title: "Second Note", date: getFormattedDate() },
    { id: 3, title: "Third Note", date: getFormattedDate() },
  ]);

  const [filteredNotes, setFilteredNotes] = useState<Notes[]>(notes);

  const addNotes = (title: string) => {
    const newNote = { id: notes.length + 1, title, date: getFormattedDate() };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  const searchNotes = (query: string) => {
    if (query.trim() === "") {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(
        notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const resetSearch = () => {
    setFilteredNotes(notes);
  };

  return (
    <MyContext.Provider
      value={{ notes, filteredNotes, setNotes, addNotes, searchNotes, resetSearch }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default CreateContextPro;
