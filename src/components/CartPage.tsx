import { IoIosArrowForward,IoMdTrash,IoMdAdd,IoMdRemove,IoMdCart} from "react-icons/io";
import { useCartContext } from "../context/CartContext";
import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, deleteBouquetFromCart, updateItemCount } = useCartContext();
  const { loading } = useLoading();
  const navigate = useNavigate();

  if (loading) {
    return <IsLoading />;
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">
          <IoMdCart size={80} color="#a5b4fc" />
        </div>
        <p className="empty-cart-message">Ваша корзина пуста</p>
        <button 
          className="continue-shopping-btn" 
          onClick={() => navigate('/catalog')}
        >
          Продолжить покупки <IoIosArrowForward className="btn-arrow" />
        </button>
      </div>
    );
  }

  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) * Number(item.count)), 0);

  return (
    <div className="cart-container">
      <div className="container">
        <div className="catalog-title">
          <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
          <span className="catalog-link">Корзина</span>
        </div>
      
        <h1 className="about-title">Корзина</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image-container" onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name" onClick={() => navigate(`/product/${item.id}`)}>
                    {item.name}
                  </h3>
                  <p className="item-compound">{item.compound}</p>
                  <div className="item-size">Размер: {item.size}</div>
                  
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateItemCount(item.id, Math.max(1, Number(item.count) - 1))}
                    >
                      <IoMdRemove size={16} />
                    </button>
                    <span className="quantity-value">{item.count}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateItemCount(item.id, Number(item.count) + 1)}
                    >
                      <IoMdAdd size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="item-price-section">
                  <span className="item-price">
                    {(Number(item.price) * Number(item.count)).toFixed(2)} сум
                  </span>
                  <button 
                    onClick={() => deleteBouquetFromCart(item.id)}
                    className="remove-item-btn"
                  >
                    <IoMdTrash size={20} className="trash-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">
                <IoMdCart size={20} className="summary-icon" /> Итого
              </h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Товары ({cart.reduce((acc, item) => acc + Number(item.count), 0)})</span>
                  <span>{totalPrice.toFixed(2)} сум</span>
                </div>
                <div className="summary-row">
                  <span>Доставка</span>
                  <span className="free-shipping">Бесплатно</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Общая сумма</span>
                  <span className="total-price">{totalPrice.toFixed(2)} сум</span>
                </div>
              </div>
              
              <button className="checkout-btn">
                Оформить заказ <IoIosArrowForward className="btn-arrow" />
              </button>
              
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/catalog')}
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;