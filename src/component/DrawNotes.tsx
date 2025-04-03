import { FormEvent, useContext, useState } from "react";
import { MyContext } from "../hooks/CreateContextPro";
import { MdOutlineDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function DrawNotes() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("DrawNotes must be used within a CreateContextPro");
  }

  const { filteredNotes, setNotes, addNotes, searchNotes, resetSearch } = context;
  const [newNote, setNewNote] = useState<string>("");
  const [query, setQuery] = useState("");

  const handleSaveNote = () => {
    if (newNote.trim() !== "") {
      addNotes(newNote);
      setNewNote("");
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    resetSearch(); 
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    searchNotes(query);
  };

  const handleClearSearch = () => {
    setQuery("");
    resetSearch();
  };

  return (
    <>
      <div className="container mt-3">
        <form onSubmit={handleSearch}>
          <div className="position-relative">
            <input
              type="search"
              className="form-control rounded-pill ps-5"
              placeholder="Search..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FaSearch
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
              onClick={handleClearSearch} 
            />
          </div>
        </form>
      </div>
      <div className="noteBox">
        <div className="notes">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note">
              <p>{note.title}</p>
              <span className="note-date">{note.date}</span>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="btn btn-danger"
              >
                <MdOutlineDelete size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="addnote">
          <div className="note">
            <textarea
              placeholder="Type to add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            ></textarea>
            <span className="note-date">{200 - newNote.length} remaining</span>
            <button
              onClick={handleSaveNote}
              disabled={newNote.trim() === ""}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DrawNotes;
