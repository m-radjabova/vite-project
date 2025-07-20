import useLoading from "../hooks/useLoading";
import IsLoading from "./IsLoading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import leaf from "../assets/seedling.svg";
import award from "../assets/award.svg";
import tint from "../assets/tint.svg";
import { useBouquetContext } from "../context/BouquetProvider";


function FavoritesPage() {
  const { loading } = useLoading();
  const { bouquet, favorites, toggleFavorite } = useBouquetContext();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [counts, setCounts] = useState(1);
  const navigate = useNavigate();

  if (loading) {
    return <IsLoading />;
  }

  if (bouquet.length === 0) {
    return (
      <div className="empty-favorites">
        <p>Вы еще не добавили букетов в избранное.</p>
        <button 
          className="empty-favorites-button"
          onClick={() => navigate('/catalog')}
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  const getBadgeClass = (status: string) => {
    if (status === "Акция") return "badge-red";
    if (status === "Новинка") return "badge-green";
    if (status === "С водой") return "badge-blue";
    return "";
  };

  const likedBouquets = bouquet.filter(item => favorites.includes(item.id));

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="catalog-title">
          <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
            <span className="catalog-link"> Избранное</span>
        </div>
        <div className="favorites-container">
          <div className="favorites-title">
            <h2>❤️ Избранные букеты</h2>
          </div>
        </div>
        <div className="favorites-bouquet-grid">
                  {likedBouquets.map(item => (
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
                            className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                          >
                            {favorites.includes(item.id) ? <FaHeart /> : <FaRegHeart />}
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
      </div>
    </div>
  );
}

export default FavoritesPage;
