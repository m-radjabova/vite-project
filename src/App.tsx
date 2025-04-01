import { useEffect, useState } from "react";
import Books from "./component/Books";
import { GiSpellBook } from "react-icons/gi";
import AddBooks from "./component/AddBooks";
import AboutUs from "./component/AboutUs";
import { FaStar, FaBookOpen } from "react-icons/fa";
import BookInfo from "./component/BookInfo";

export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  price: number;
  imgUrl: string;
}

function App() {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [page, setPage] = useState<string>("Books");
  const [showWelcome, setShowWelcome] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const saveBook = (data: Book) => {
    if (data.id) {
      setBooks(books.map((book) => (book.id === data.id ? data : book)));
    } else {
      
      setBooks([...books, { ...data, id: books.length + 1}]);
    }
    setSelectedBook(undefined);
    setPage("Books");
  };

  const editBook = (book: Book) => {
    setSelectedBook(book);
    setPage("AddBooks");
  };

  const deleteBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-content">
            <FaBookOpen size={60} className="book-icon" color="#4a6baf" />
            <h1 className="welcome-text">Welcome to Our Book Store!</h1>
            <p className="welcome-subtext">Discover your next favorite read</p>
            <div className="stars-container">
              {[...Array(40)].map((_, i) => (
                <FaStar
                  key={i}
                  className="star"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${Math.random() * 16 + 8}px`,
                    color: i % 3 === 0 ? "#ffd700" : i % 2 === 0 ? "#ff6b6b" : "#74b9ff",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <header className="header shadow-sm">
        <div className="d-flex align-items-center">
          <GiSpellBook size={50} className="me-2 book-icons" color="grey" />
          <h1 onClick={() => setPage("Books")} className="display-3 text-secondary">
            Book Store
          </h1>
        </div>
        <div className="icons d-flex gap-2">
          <button
            className={`btn rounded-pill px-4 ${page === "AddBooks" ? "active" : ""}`}
            onClick={() => setPage("AddBooks")}
          >
            Add Books
          </button>
          <button
            className={`btn rounded-pill px-4 ${page === "Books" ? "active" : ""}`}
            onClick={() => setPage("Books")}
          >
            Books
          </button>
          <button
            className={`btn rounded-pill px-4 ${page === "AboutUs" ? "active" : ""}`}
            onClick={() => setPage("AboutUs")}
          >
            About Us
          </button>
        </div>
      </header>
      <div className="container mt-5">
        {page === "Books" && (
          <Books
            setPage={setPage}
            setSelectedBook={setSelectedBook}
            editBook={editBook}
            books={books}
            deleteBook={deleteBook}
          />
        )}
        {page === "AddBooks" && (
          <AddBooks
            books={books}
            selectedBook={selectedBook}
            saveBook={saveBook}
            setSelectedBook={setSelectedBook}
          />
        )} 
        {page === "AboutUs" && <AboutUs />}
        {page === "BookInfo" && <BookInfo deleteBook={deleteBook} editBook={editBook} setPage={setPage} book={selectedBook} />}
      </div>
    </>
  );
}

export default App;