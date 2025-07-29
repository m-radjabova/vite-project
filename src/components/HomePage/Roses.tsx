import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import leaf from "../../assets/seedling.svg";
import award from "../../assets/award.svg";
import tint from "../../assets/tint.svg";
import { useBouquetContext } from "../../context/BouquetProvider";
import { useNavigate } from "react-router-dom";

function Roses() {
  const { bouquet, favorites, toggleFavorite } = useBouquetContext();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [counts, setCounts] = useState(0)
  const navigate = useNavigate();
  const seasonBouquets = bouquet.filter(item =>
    item.category && item.category.includes("roses")
  );
  
  const getBadgeClass = (status: string) => {
    if (status === "Акция") return "badge-red";
    if (status === "Новинка") return "badge-green";
    if (status === "С водой") return "badge-blue";
    return "";
  };

  return (
    <div className="season-section">
      <div className="container">
        <div className="section-header">
          <h2>Розы</h2>
          <p>Красивые розы для любого случая</p>
        </div>
        
        <div className="bouquet-grid">
          {seasonBouquets.map(item => (
            <div
              className="bouquet-card-wrapper"
              key={item.id}
              onMouseEnter={() => setHoverId(item.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <div className={`bouquet-card ${hoverId === item.id ? "hovered" : ""}`}
              onClick={() => navigate(`/catalog/${item.id}`)}
              >
                <div className="card-media">
                  <img src={item.image} alt={item.name} className="bouquet-image" />

                  <button
                    className={`favorite-btn ${favorites.includes(item.id) ? "favorited" : ""}`}
                    onClick={() => toggleFavorite(item.id)}
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
        
        <div className="view-all-container">
          <button className="view-all-btn">
            Смотреть все
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Roses;