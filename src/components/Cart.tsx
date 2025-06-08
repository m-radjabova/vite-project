import { useState } from "react";
import { CartItemForCart } from "../page/types/Types";
import DeliveryCart from "./DeliveryCart";


interface CartProps {
  cartItems: CartItemForCart[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
}

function Cart({ cartItems, onIncrease, onDecrease }: CartProps) {
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('delivery');

  return (
    <>
      <div className="cart-container1">
        <div className="cart-header">
          <span className="cart-title">Корзина</span>
          <span className="cart-count">{totalCount}</span>
        </div>
        {cartItems.length === 0 ? (
          <div className="cart-empty">Ваша корзина пуста</div>
        ) : (
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.product.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-weight">
                    {item.product.weight ? `${item.product.weight}г` : ""}
                  </div>
                  <div className="cart-item-price">
                    {item.product.price}₽
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button className="cart-btn" onClick={() => onDecrease(item.product.id)}>-</button>
                  <span className="cart-item-count">{item.count}</span>
                  <button className="cart-btn" onClick={() => onIncrease(item.product.id)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-total">
          <span>Итого</span>
          <span>{total}₽</span>
        </div>
        <button onClick={handleOpen} className="cart-order-btn">
          Оформить заказ
        </button>
        <div className="cart-delivery">
          <span role="img" aria-label="delivery" className="cart-delivery-icon">🚚</span>
          Бесплатная доставка
        </div>
      </div>
      <DeliveryCart 
        open={open} 
        handleClose={handleClose} 
        deliveryType={deliveryType} 
        setDeliveryType={setDeliveryType}
        />
    </>
  );
}

export default Cart;