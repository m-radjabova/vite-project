import React from "react";
import { Book } from "../App";

interface Props {
  book: Book;
  cart: Book[];
  setCart: React.Dispatch<React.SetStateAction<Book[]>>;
}

function AddToCart({ book, cart, setCart }: Props) {
  const isInCart = cart.some((item) => item.id === book.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      setCart([...cart, book]);
    } else {
      alert("This book is already in the cart!");
    }
  };

  const handleRemoveFromCart = () => {
    setCart(cart.filter((item) => item.id !== book.id));
  };

  return (
    <div>
      {isInCart ? (
        <button
          className="btn btn-danger"
          onClick={handleRemoveFromCart}
        >
          Remove from Cart
        </button>
      ) : (
        <button
          className="btn btn-success"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default AddToCart;