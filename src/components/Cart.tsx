// import { useState } from "react";

interface CartItem {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    weight?: number;
  };
  count: number;
}

interface CartProps {
  cartItems: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
}

function Cart({ cartItems, onIncrease, onDecrease }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: "32px 24px",
        minHeight: "400px",
        minWidth: "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px"
      }}>
        <span style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#222"
        }}>
          Корзина
        </span>
        <span style={{
          background: "#F2F2F3",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "18px",
          color: "#222"
        }}>
          {totalCount}
        </span>
      </div>
      {cartItems.length === 0 ? (
        <div style={{
          color: "#B1B1B1",
          fontSize: "18px",
          textAlign: "center",
          margin: "32px 0"
        }}>
          Ваша корзина пуста
        </div>
      ) : (
        <ul style={{ width: "100%", padding: 0, listStyle: "none", margin: 0 }}>
          {cartItems.map(item => (
            <li key={item.product.id} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              background: "#F9F9F9",
              borderRadius: "16px",
              padding: "12px 12px 12px 0"
            }}>
              <img src={item.product.imageUrl} alt={item.product.name} style={{
                width: "64px",
                height: "64px",
                objectFit: "cover",
                borderRadius: "12px",
                marginRight: "12px"
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: "17px" }}>{item.product.name}</div>
                <div style={{ fontSize: "14px", color: "#B1B1B1" }}>
                  {item.product.weight ? `${item.product.weight}г` : ""}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, marginTop: "2px" }}>
                  {item.product.price}₽
                </div>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                padding: "4px 10px",
                gap: "8px"
              }}>
                <button style={{
                  background: "none",
                  border: "none",
                  fontSize: "22px",
                  color: "#FF7020",
                  cursor: "pointer",
                  fontWeight: 700,
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px"
                }}
                onClick={() => onDecrease(item.product.id)}
                >-</button>
                <span style={{ fontWeight: 700, fontSize: "18px" }}>{item.count}</span>
                <button style={{
                  background: "none",
                  border: "none",
                  fontSize: "22px",
                  color: "#FF7020",
                  cursor: "pointer",
                  fontWeight: 700,
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px"
                }}
                onClick={() => onIncrease(item.product.id)}
                >+</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "22px",
        fontWeight: 700,
        margin: "24px 0 16px 0"
      }}>
        <span>Итого</span>
        <span>{total}₽</span>
      </div>
    
      <button style={{
        width: "100%",
        padding: "16px 0",
        borderRadius: "12px",
        border: "none",
        background: "#FF7020",
        color: "#fff",
        fontSize: "20px",
        fontWeight: 700,
        cursor: "pointer",
        marginBottom: "16px"
      }}>
        Оформить заказ
      </button>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#B1B1B1",
        fontSize: "16px"
      }}>
        <span role="img" aria-label="delivery" style={{ fontSize: "20px" }}>🚚</span>
        Бесплатная доставка
      </div>
    </div>
  );
}

export default Cart;