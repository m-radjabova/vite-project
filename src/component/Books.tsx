import { Book } from "../App";
import { FaUser, FaDollarSign, FaEdit, FaTrash } from "react-icons/fa"; 

interface Props {
  books: Book[];
  deleteBook : (id : number) => void;
  editBook : ( book : Book) => void;
}

function Books({ books, deleteBook, editBook }: Props) {
  return (
    <div className="row " style={{marginTop: "50px"}}>
      {books.map((book) => (
        <div key={book.id} className="col-md-3 col-sm-6 mb-4">
          <div className="card shadow-sm h-100 p-2 border-0">
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
            <div className="card-body d-flex flex-column">
              <h6 className="card-title text-truncate">
                {book.name}
              </h6>
              <hr />
              <p className="card-text text-muted">{book.description}</p>
              <p className="card-text mb-1 d-flex align-items-center">
                <FaUser  className="me-2" />
                Author: {book.author}
              </p>
              <p className="card-text d-flex align-items-center">
                <FaDollarSign className="me-2 " />
                Price: {book.price} $
              </p>
              <div className="mt-auto  d-flex justify-content-end align-items-center gap-2">
              <FaEdit
                onClick={() => editBook(book)}
                className="text-dark"
                style={{ cursor: "pointer" }}
                title="Edit"
                size={25}
              />
                <FaTrash size={20} onClick={() => deleteBook(book.id)} className="text-dark" style={{ cursor: "pointer" }} title="Delete" /> 
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;