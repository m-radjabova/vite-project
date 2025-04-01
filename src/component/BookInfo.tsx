import { Book } from "../App";
import { FaBookReader, FaUser, FaDollarSign, FaEdit, FaTrash, FaHeart, FaDownload } from "react-icons/fa";

interface Props {
  book: Book | undefined;
  setPage: (page: string) => void;
  deleteBook: (id: number) => void;
  editBook: (book: Book) => void;
}

function BookInfo({ book, setPage, deleteBook, editBook }: Props) {
  if (!book) {
    return <p>No book selected!</p>;
  }

  const handleDownload = () => {
    alert(`Downloading ${book.name}`);
  };

  return (
    <div className="book-info container mt-5">
      <h1
        onClick={() => setPage("Books")}
        className="display-3 text-secondary text-center fw-bold mb-4 d-flex align-items-center justify-content-center gap-4"
      >
        Book Information <FaBookReader />
      </h1>
      <hr />
      <div className="d-flex align-items-start shadow-lg p-3 bg-white rounded">
        <img
          src={book.imgUrl}
          className="book-img rounded"
          alt={book.name}
          style={{ width: "500px", height: "500px", objectFit: "contain" }}
        />
        <div className="ms-4">
          <h5 className="display-3 d-flex align-items-center gap-2">
            📖 {book.name}
          </h5>
          <p className="text-muted mt-3 display-6">{book.description}</p>
          <hr />
          <p className="d-flex align-items-center gap-2 display-6">
            <FaUser className="text-dark" /> Author: {book.author}
          </p>
          <hr />
          <p className="d-flex align-items-center gap-2 display-6">
            <FaDollarSign className="text-dark" /> Price: ${book.price}
          </p>
          <hr />
          <div className="d-flex justify-content-end gap-3 mt-4">
            <FaEdit
              size={25}
              className="text-primary"
              style={{ cursor: "pointer" }}
              title="Edit"
              onClick={() => editBook(book)}
            />
            <FaTrash
              size={25}
              className="text-danger"
              style={{ cursor: "pointer" }}
              title="Delete"
              onClick={() => {
                deleteBook(book.id);
                setPage("Books");
              }}
            />
            <FaHeart
              size={25}
              className="text-danger"
              style={{ cursor: "pointer" }}
              title="Favorite"
            />
            <FaDownload
              size={25}
              className="text-success"
              style={{ cursor: "pointer" }}
              title="Download"
              onClick={handleDownload}
            />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default BookInfo;