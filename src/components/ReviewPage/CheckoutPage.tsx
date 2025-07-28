import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowForward,IoMdCheckmarkCircleOutline} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";
import CheckoutPersonalInf from "./CheckoutPersonalInf";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPayment from "./CheckoutPayment";
import { formatDateTime } from './../../page/types/utils';

function CheckoutPage() {
  const { cart, addOrder, clearCart } = useCartContext();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const totalPrice = cart.reduce((total, item) => total + (Number(item.price) * Number(item.count)), 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const deliveryMethod = watch("delivery", "courier"); 
  const paymentMethod = watch("payment", "cash"); 

  const onSubmit = (data: FieldValues) => {
    console.log("Order Data:", data);
    setIsSubmitting(true);
    addOrder({ ...data, items: cart, createdAt: formatDateTime(new Date()) })
        .then(() => {
        clearCart(); 
        setOrderSuccess(true); 
        })
        .catch((err) => {
        console.error("Error adding order:", err);
        })
        .finally(() => {
        setIsSubmitting(false);
        });
    };


  if (orderSuccess) {
    return (
      <motion.div 
        className="order-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-content">
          <IoMdCheckmarkCircleOutline className="success-icon" />
          <h2>Заказ успешно оформлен!</h2>
          <p>Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
          <button 
            className="back-to-shop-btn"
            onClick={() => navigate('/catalog')}
          >
            Вернуться в магазин
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="catalog-title">
          <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>
            Главная <IoIosArrowForward className="arrow-icon" />
          </span>
          <span className="catalog-link catalog-bold" onClick={() => navigate("/cart")}>
            Корзина <IoIosArrowForward className="arrow-icon" />
          </span>
          <span className="catalog-link">
            Оформление заказа
          </span>
        </div>

        <div className="checkout-container">
          <motion.div 
            className="checkout-form-container"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="about-title" style={{color : ' #1f2937'}}>Оформление заказа</h1>
            <p className="checkout-subtitle">Пожалуйста, проверьте правильность введенных данных.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
              {/* Personal Information Section */}
              <CheckoutPersonalInf register={register} errors={errors} />

              {/* Delivery Section */}
              <CheckoutDelivery register={register} errors={errors} deliveryMethod={deliveryMethod} />

              {/* Payment Section */}
              <CheckoutPayment register={register} errors={errors} paymentMethod={paymentMethod} />

              <motion.button 
                type="submit" 
                className="checkout-submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  "Подтвердить заказ"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="checkout-summary"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="summary-title">Ваш заказ</h2>
            
            <div className="summary-products">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  className="summary-product"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <span className="product-quantity">{item.count}</span>
                  </div>
                  <div className="product-details">
                    <h4>{item.name}</h4>
                    <p>{item.size}</p>
                  </div>
                  <div className="product-price">
                    ${(Number(item.price) * Number(item.count)).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Товары ({cart.reduce((acc, item) => acc + Number(item.count), 0)})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Доставка</span>
                <span className="free-shipping">
                  {deliveryMethod === 'express' ? '$15.00' : 'Бесплатно'}
                </span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Итого</span>
                <span className="total-price">
                  ${(deliveryMethod === 'express' ? totalPrice + 15 : totalPrice).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="summary-notice">
              <p>Ваши персональные данные будут использоваться для обработки ваших заказов и других целей, описанных в нашей политике конфиденциальности.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;