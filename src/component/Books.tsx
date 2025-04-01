import { useState } from "react";
import { Book } from "../App";
import { FaUser, FaDollarSign, FaEdit, FaTrash, FaHeart, FaRegHeart, FaDownload } from "react-icons/fa";

interface Props {
  books: Book[];
  deleteBook: (id: number) => void;
  editBook: (book: Book) => void;
  setPage: (page: string) => void;
  setSelectedBook: (book: Book | undefined) => void;
}

function Books({ books, deleteBook, editBook, setPage, setSelectedBook }: Props) {
  const [likedBooks, setLikedBooks] = useState<number[]>([]); 

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setPage("BookInfo");
  };

  const handleDownload = (book: Book) => {
    alert(`Downloading ${book.name}`);
  };

  const toggleHeart = (id: number) => {
    if (likedBooks.includes(id)) {
      setLikedBooks(likedBooks.filter((bookId) => bookId !== id));
    } else {
      setLikedBooks([...likedBooks, id]);
      alert(`Liked ${books.find((book) => book.id === id)?.name}`);
    }
  };

  return (
    <div className="row " style={{ marginTop: "30px" }}>
      {books.map((book) => (
        <div key={book.id} className="col-md-3 col-sm-6 mb-4">
          <div className="card shadow-sm h-100 p-2 border-0">
            <div className="position-relative">
              <img
                src={book.imgUrl}
                className="card-img-top"
                alt={book.name}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <div
                className="position-absolute top-0 start-0 p-2 d-flex align-items-center gap-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "0 0 10px 0",
                }}
              >
                {likedBooks.includes(book.id) ? (
                  <FaHeart
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    size={18}
                    onClick={() => toggleHeart(book.id)}
                  />
                ) : (
                  <FaRegHeart
                    className="text-dark"
                    style={{ cursor: "pointer" }}
                    size={18}
                    onClick={() => toggleHeart(book.id)}
                  />
                )}
              </div>
            </div>
            <div className="card-body d-flex flex-column">
              <h6 className="card-title text-truncate">{book.name}</h6>
              <hr />
              <p className="card-text text-muted">
                {book.description.length > 50 ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewDetails(book)}
                  >
                    {book.description.slice(0, 50)}...
                  </span>
                ) : (
                  book.description
                )}
              </p>
              <p className="card-text mb-1 d-flex align-items-center">
                <FaUser className="me-2" />
                Author: {book.author}
              </p>
              <p className="card-text d-flex align-items-center">
                <FaDollarSign className="me-2 " />
                Price: {book.price} $
              </p>
              <div className="mt-auto d-flex justify-content-end align-items-center gap-2">
                <FaEdit
                  onClick={() => {
                    editBook(book);
                  }}
                  className="text-dark edit-icon"
                  style={{ cursor: "pointer" }}
                  title="Edit"
                  size={20}
                />
                <FaTrash
                  size={18}
                  onClick={() => deleteBook(book.id)}
                  className="text-dark delete-icon"
                  style={{ cursor: "pointer" }}
                  title="Delete"
                />
                <FaDownload
                  size={18}
                  onClick={() => handleDownload(book)}
                  className="text-dark download-icon"
                  style={{ cursor: "pointer" }}
                  title="Download"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;