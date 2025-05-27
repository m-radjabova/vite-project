import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: "32px 24px",
        minHeight: "400px",
        minWidth: "260px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px"
      }}>
        <FaShoppingCart size={28} color="#FF7020" />
        <span style={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#222"
        }}>
          Корзина
        </span>
      </div>
      <div style={{
        color: "#B1B1B1",
        fontSize: "18px",
        textAlign: "center"
      }}>
        Ваша корзина пуста
      </div>
    </div>
  );
}

export default Cart;