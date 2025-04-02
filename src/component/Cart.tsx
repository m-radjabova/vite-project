import React from "react";
import { Book } from "../App";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  cart: Book[];
  setCart: React.Dispatch<React.SetStateAction<Book[]>>;
}

function Cart({ cart, setCart }: Props) {
  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. 😔</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((book) => (
              <li key={book.id} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">📖 <strong>{book.name}</strong></span>
                  <span className="cart-item-price">💵 ${book.price}</span>
                </div>
                <button
                  className="btn btn-danger cart-remove-btn"
                  onClick={() => handleRemoveFromCart(book.id)}
                >
                  <FaTrashAlt /> Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: 💵 ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;