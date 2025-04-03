import { useContext } from "react";
import { MyContext } from "../hooks/CreateContextPro"; 
import { GiSpellBook } from "react-icons/gi";
import { IoAddSharp } from "react-icons/io5";
import { TbShoppingCartHeart } from "react-icons/tb";

function Header() {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("Header must be used within a CreateContextPro");
  }

  const { page, setPage, colorMode, changeColorMode } = context;

  return (
    <header className="header shadow-sm">
      <div className="d-flex align-items-center">
        <GiSpellBook size={60} className="me-2 book-icons" color="grey" />
        <h1
          onClick={() => setPage("Books")}
          className="typewriter-effect text-secondary text-center display-3"
        >
          Book Store
        </h1>
      </div>
      <div className="icons d-flex gap-2">
        <button
          className={`btn d-flex align-items-center gap-3 rounded-pill px-4 ${
            page === "AddBooks" ? "active" : ""
          }`}
          onClick={() => setPage("AddBooks")}
        >
          Add Books
          <IoAddSharp />
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
        <button
          className={`btn rounded-pill px-4 ${page === "Cart" ? "active" : ""}`}
          onClick={() => setPage("Cart")}
        >
          My Cart <TbShoppingCartHeart />
        </button>
        <button
          className="btn rounded-pill px-4 btn-dark"
          onClick={() =>
            changeColorMode(colorMode === "light" ? "dark" : "light")
          }
        >
          Mode: {colorMode === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}

export default Header;