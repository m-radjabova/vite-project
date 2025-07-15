import { useNavigate, useParams } from "react-router-dom";
import useBouquet from "../hooks/useBouquet";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import {FaRegHeart } from "react-icons/fa";
import { GoQuestion } from "react-icons/go";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { CiBank } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import leaf from "../assets/seedling.svg";
import award from "../assets/award.svg";
import tint from "../assets/tint.svg";
import delivery from "../assets/Frame.svg";
import flower6 from "../assets/Frame 28.svg";
import skidka from "../assets/Frame (1).svg"
import IsLoading from "./IsLoading";
import useLoading from "../hooks/useLoading";

function BouquetDisplay() {
    const { id } = useParams();
    const { bouquet } = useBouquet();
    const bouquets4 = bouquet.slice(0, 4);
    const flower = bouquet.find((flower) => flower.id === id);
    const navigate = useNavigate();
    const [counts, setCounts] = useState(1);
    const [hoverId, setHoverId] = useState<string | null>(null);
    const {loading} = useLoading()
            
    if (loading) {
        return <IsLoading />;
    }

    if (!flower) {
        return <div style={{ textAlign: "center", marginTop: "3rem" }}>Букет не найден</div>;
    }

    const getBadgeClass = (status: string) => {
        if (status === "Акция") return "badge-red";
        if (status === "Новинка") return "badge-green";
        if (status === "С водой") return "badge-blue";
        return "";
    };

    return (
        <div className="bouquet-display">
            <div className="container">
                <div className="catalog-title">
                    <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                    <span className="catalog-link">Каталог цветов <IoIosArrowForward className="arrow-icon" /></span>
                    <span className="catalog-link">«{flower.name}»</span>
                </div>
                <div className="bouquet-container">
                    <div className="bouquet-img">
                        <img src={flower.image} alt={flower.name} />
                    </div>
                    <div className="bouquet-text">
                        <h1 className="bouquet-name">«{flower.name}»</h1>
                        <div className="flower-status-price">
                            <div className="flower-price">
                                <span className="flower-price-current">{flower.price} ₽</span>
                                {flower.oldPrice && (
                                    <span className="flower-price-old">{flower.oldPrice} ₽</span>
                                )}
                            </div>
                            {flower.status && (
                                <div className={`flower-status-badge ${getBadgeClass(flower.status)}`}>
                                <img
                                    src={
                                        flower.status === "Акция"
                                        ? award
                                        : flower.status === "Новинка"
                                        ? leaf
                                        : tint
                                    }
                                    alt={flower.status}
                                />
                                <span>{flower.status}</span>
                                </div>
                            )}
                        </div>
                        <div className="flower-action-buttons">
                            <div className="quantity-selector">
                                <button 
                                    className="qty-btn minus" 
                                    onClick={() => setCounts(Math.max(1, counts - 1))}
                                    disabled={counts <= 1}
                                >
                                    -
                                </button>
                                <span className="qty-value">{counts}</span>
                                <button 
                                    className="qty-btn plus" 
                                    onClick={() => setCounts(counts + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="add-to-cart">
                                В корзину
                            </button>
                            <button 
                                className={`flower-favorite-btn`}
                            ><FaRegHeart />
                            </button>   
                        </div>
                        <div className="quick-actions">
                            <button className="quick-action-btn">Купить в один <br /> клик</button>
                            <button className="quick-action-btn">Отложить до <br /> вечера</button>
                            <button className="quick-action-btn">Отложить до <br /> завтра</button>
                        </div>
                        <div className="flower-details">
                            <h3 className="details-title">Состав</h3>
                            <ul >
                                {flower.compound.split(',').map((ingredient, idx) => (
                                <li key={idx}>{ingredient.trim()}</li>
                                ))}
                            </ul>
                      
                            <div className="details-divider">
                                <h3>Размер</h3>
                                <p>{flower.size}</p>
                            </div>
                            <div className="details-divider">
                                <h3>Доставка</h3>
                                <p>Бесплатно</p>
                            </div>
                            <div className="package-info">
                                <div className="package-note">
                                    <p>Букет упакован с водой</p>
                                    <span>Это входит в стоимость</span>
                                </div>
                                <GoQuestion className="info-icon" />
                            </div>
                            <div className="package-info">
                                <span>Как оформить заказ?</span>
                                <GoQuestion className="info-icon" />
                            </div>
                            
                            <div className="payment-methods">
                                <h3 className="payment-title">Способы оплаты</h3>
                                <div className="payment-options">
                                    <div className="payment-option">
                                        <LiaMoneyBillWaveSolid className="payment-icon" />
                                        <span>Наличными</span>
                                    </div>
                                    <div className="payment-option">
                                        <CiCreditCard1 className="payment-icon" />
                                        <span>Картой</span>
                                    </div>
                                    <div className="payment-option">
                                        <CiBank className="payment-icon" />
                                        <span>На р/с</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bouquet-overlay">
                    <h1 className="bouquet-overlay-title">Вам может понравиться</h1>
                    <div className="flower-bouquet-grid">
                              {bouquets4.map(item => (
                                <div
                                  className="bouquet-card-wrapper"
                                  key={item.id}
                                  onMouseEnter={() => setHoverId(item.id)}
                                  onMouseLeave={() => setHoverId(null)}
                                >
                                  <div className={`bouquet-card ${hoverId === item.id ? "hovered" : ""}`}>
                                    <div className="card-media">
                                      <img src={item.image} alt={item.name} className="bouquet-image" />
                                      
                                      <button 
                                        className={`favorite-btn`}
                                      ><FaRegHeart  />
                                      </button>
                                      
                                      {item.status && (
                                        <div className={`status-badge ${getBadgeClass(item.status)}`}>
                                          <img
                                            src={
                                              item.status === "Акция"
                                                ? award
                                                : item.status === "Новинка"
                                                ? leaf
                                                : tint
                                            }
                                            alt={item.status}
                                          />
                                          <span>{item.status}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="card-content">
                                      <h3 className="bouquet-name">{item.name}</h3>
                                      
                                      <div className="price-container">
                                        <span className="current-price">{item.price} ₽</span>
                                        {item.oldPrice && (
                                          <span className="old-price">{item.oldPrice} ₽</span>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {hoverId === item.id && (
                                      <div className="hover-content">
                                        <div className="composition">
                                          <h4>Состав:</h4>
                                          <ul>
                                            {item.compound.split(',').map((ingredient, idx) => (
                                              <li key={idx}>{ingredient.trim()}</li>
                                            ))}
                                          </ul>
                                        </div>
                                        
                                        <div className="action-buttons">
                                          <div className="quantity-selector">
                                            <button 
                                              className="qty-btn minus" 
                                              onClick={() => setCounts(counts - 1)}
                                            >
                                              -
                                            </button>
                                            <span className="qty-value">{counts}</span>
                                            <button 
                                              className="qty-btn plus" 
                                              onClick={() => setCounts(counts + 1)}
                                            >
                                              +
                                            </button>
                                          </div>
                                          
                                          <button className="add-to-cart">
                                            В корзину
                                          </button>
                                        </div>
                                        
                                        <button className="quick-buy">
                                          Купить в один клик
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                    </div>
                    <div className="view-all-container">
                        <button className="view-all-btn" onClick={() => navigate("/catalog")}>
                            Прейдите в каталог 
                        </button>
                    </div>
                </div>
                <div className="service">
                    <h1 className="bouquet-overlay-title">Почему мы?</h1>
                    <div className="service-grid">
                        <div className="service-item">
                            <img src={delivery} alt="Доставка" />
                            <span>Доставим <br /> в срок</span>
                        </div>
                        <div className="service-item">
                            <img src={flower6} alt="Качество" />
                            <span>Цветы простоят <br /> от 6 дней</span>
                        </div>
                        <div className="service-item">
                            <img src={skidka} alt="Скидки" />
                            <span>Возвращаем до <br /> 15% бонусами</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BouquetDisplay;