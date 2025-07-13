import { useState } from "react";
import useBouquet from "../../hooks/useBouquet";
import { FaRegHeart } from "react-icons/fa";
import leaf from "../../assets/seedling.svg";
import award from "../../assets/award.svg";
import tint from "../../assets/tint.svg";

function Roses() {
  const { bouquet } = useBouquet();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [count, setCount] = useState(0);


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
    <div className="seasons">
      <div className="container">
        <div className="title mt-5">
          <h1>Розы</h1>
        </div>
        <div className="season-list">
          {seasonBouquets.map(item => (
            <div
              className={`season-card${hoverId === item.id ? " active" : ""}`}
              key={item.id}
              onMouseEnter={() => setHoverId(item.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-top">
                <img src={item.image} alt={item.name} className="card-img" />
                <FaRegHeart className="card-heart" />
                {item.status && (
                  <span className={`card-status ${getBadgeClass(item.status)}`}>
                    <img
                      className="me-2"
                      src={
                        item.status === "Акция"
                          ? award
                          : item.status === "Новинка"
                          ? leaf
                          : tint
                      }
                      alt={item.status}
                    />
                    {item.status}
                  </span>
                )}
              </div>
              <div className="card-price">
                <span className="price">{item.price} ₽</span>
                {item.oldPrice && (
                  <span className="old-price">{item.oldPrice} ₽</span>
                )}
              </div>
              <div className="card-name">{item.name}</div>
              {/* Expanded part */}
              {hoverId === item.id && (
                <div className="card-expanded">
                  <div className="card-compound">
                    {item.compound
                      .split(',')
                      .map((line, idx) => (
                        <div key={idx}>{line.trim()}</div>
                      ))
                    }
                  </div>
                  <div className="card-actions">
                    <div className="card-qty">
                      <button className="qty-btn" onClick={() => setCount(count - 1)}>-</button>
                      <span>{count}</span>
                      <button className="qty-btn" onClick={() => setCount(count + 1)}>+</button>
                    </div>
                    <button className="cart-btn">В корзину</button>
                  </div>
                  <div className="card-buyone">Купить в один клик</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="season-all">
          <button className="season-btn">СМОТРЕТЬ ВСЕ</button>
          <button className="season-btn-all"> Смотреть весь каталог </button>
        </div>
      </div>
    </div>
  );
}

export default Roses;