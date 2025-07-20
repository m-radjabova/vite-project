import {useState } from "react";
import leaf from "../assets/seedling.svg";
import award from "../assets/award.svg";
import tint from "../assets/tint.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { CustomFormControl, CustomSelect } from "./HomePage/DeliveryMoscow";
import { InputBase, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import IsLoading from "./IsLoading";
import useLoading from "../hooks/useLoading";
import { useBouquetContext } from "../context/BouquetProvider";


function Catalog() {
    const { bouquet, favorites, toggleFavorite } = useBouquetContext();
    const [hoverId, setHoverId] = useState<string | null>(null);
    const [counts, setCounts] = useState(0)
    const navigate = useNavigate();
    const {loading} = useLoading();

    const getBadgeClass = (status: string) => {
      if (status === "Акция") return "badge-red";
      if (status === "Новинка") return "badge-green";
      if (status === "С водой") return "badge-blue";
      return "";
    };
        
      if (loading) {
          return <IsLoading />;
      }
        

  return (
    <div className="catalog">
        <div className="container">
            <div className="catalog-title">
                <span className="catalog-link catalog-bold" onClick={() => navigate("/")}>Главная <IoIosArrowForward className="arrow-icon" /> </span>
                <span className="catalog-link">Каталог цветов</span>
            </div>
            <div className="catalog-text">
                <h1>Каталог цветов</h1>
                <p>Свежие цветы для любого случая</p>
            </div>
            <div className="delivery-filters" style={{
                display: "flex",
                marginTop: 20,
                background: "#f8fbf4",
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #f0f4ec"
            }}>
                <CustomFormControl>
                <CustomSelect
                    defaultValue=""
                    IconComponent={KeyboardArrowDownIcon}
                    input={<InputBase />}
                    disableUnderline
                    displayEmpty
                >
                    <MenuItem value="">Цена ...</MenuItem>
                </CustomSelect>
                </CustomFormControl>
                <CustomFormControl>
                <CustomSelect
                    defaultValue=""
                    IconComponent={KeyboardArrowDownIcon}
                    input={<InputBase />}
                    disableUnderline
                    displayEmpty
                >
                    <MenuItem value="">Цветы ...</MenuItem>
                </CustomSelect>
                </CustomFormControl>
                <CustomFormControl>
                <CustomSelect
                    defaultValue=""
                    IconComponent={KeyboardArrowDownIcon}
                    input={<InputBase />}
                    disableUnderline
                    displayEmpty
                >
                    <MenuItem value="">Кому ...</MenuItem>
                </CustomSelect>
                </CustomFormControl>
                <CustomFormControl>
                <CustomSelect
                    defaultValue=""
                    IconComponent={KeyboardArrowDownIcon}
                    input={<InputBase />}
                    disableUnderline
                    displayEmpty
                >
                    <MenuItem value="">Повод ...</MenuItem>
                </CustomSelect>
                </CustomFormControl>
                <CustomFormControl>
                <CustomSelect
                    defaultValue=""
                    IconComponent={KeyboardArrowDownIcon}
                    input={<InputBase />}
                    disableUnderline
                    displayEmpty
                >
                    <MenuItem value="">Стиль ...</MenuItem>
                </CustomSelect>
                </CustomFormControl>
            </div>
            <div className="popularity-header">
                <h3 className="popularity-title">Всего {bouquet.length} цветов</h3>
                <div className="popularity-sort">
                    <span className="sort-label">Сортировать по:</span>
                    <div className="sort-options">
                        <button className="sort-toggle">
                            Популярности
                        </button>
                    </div>
                </div>
            </div>
            <div className="bouquet-grid">
                      {bouquet.map(item => (
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
  )
}

export default Catalog