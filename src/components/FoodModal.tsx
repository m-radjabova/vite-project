import { useState, useEffect } from "react";
import { IoClose, IoNutritionOutline, IoFlameOutline, IoTimeOutline, IoStar } from "react-icons/io5";

interface Props {
    show: boolean;
    onClose: () => void;
    food: {
        name: string;
        description?: string;
        calories?: string;
        time?: string;
        ingredients?: string[];
        image?: string;
        rating?: number;
    };
}

const FoodModal = ({ show, onClose, food } : Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } 
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!show) return null;

  return (
    <div 
        className="modal-backdrop" 
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
            backdropFilter: "blur(5px)",
            padding: "1rem",
        }}
        onClick={handleClose}
        >
        <div 
            className="modal-content"
            style={{
            background: "linear-gradient(135deg, #fff9f9 0%, #ffffff 100%)",
            borderRadius: "20px",
            padding: "1.5rem",
            width: "100%",
            maxWidth: "450px",
            maxHeight: "90vh",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Yopish tugmasi */}
            <button 
                onClick={handleClose}
                style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "transparent",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "#fb6f92",
                    cursor: "pointer",
                    zIndex: 10,
                }}
                >
                <IoClose />
            </button>

            {/* Sarlavha */}
            <div style={{ marginBottom: "1rem" }}>
                <h2 style={{
                    color: "#333",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginRight: "2rem",
                }}>
                    {food.name}
                </h2>
                <div style={{ 
                    display: "flex", 
                    alignItems: "center",
                    gap: "0.2rem",
                    color: "#ffb347",
                    fontSize: "1rem",
                    marginTop: "0.3rem"
                }}>
                    <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStar />
                    <span style={{ 
                    color: "#888", 
                    fontSize: "0.8rem",
                    marginLeft: "0.5rem"
                    }}>({food.rating || "4.5"})</span>
                </div>
            </div>

            <div style={{ 
                    overflowY: "auto",
                    flex: 1,
                    paddingRight: "0.5rem",
                    marginRight: "-0.5rem",
                }}>
                <div style={{
                    height: "160px",
                    background: "#f5f5f5",
                    borderRadius: "12px",
                    marginBottom: "1rem",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    fontWeight: "bold",
                }}>
                    {food.image ? (
                    <img src={food.image} alt={food.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                    "Food Image"
                    )}
                </div>

                {/* Ma'lumotlar */}
                <div style={{ marginBottom: "1rem" }}>
                    <p style={{ 
                        color: "#555", 
                        lineHeight: "1.5", 
                        fontSize: "0.95rem",
                        marginBottom: "1rem" 
                        }}>
                        {food.description || "Delicious food description goes here."}
                    </p>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "0.8rem",
                        marginBottom: "1rem",
                        }}>
                    <div style={{
                        background: "#fff",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <IoFlameOutline style={{ color: "#fb6f92", fontSize: "1rem" }} />
                        <div>
                        <div style={{ fontSize: "0.75rem", color: "#888" }}>Calories</div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{food.calories || "210"} kcal</div>
                        </div>
                    </div>

                    <div style={{
                        background: "#fff",
                        padding: "0.6rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <IoTimeOutline style={{ color: "#fb6f92", fontSize: "1rem" }} />
                        <div>
                        <div style={{ fontSize: "0.75rem", color: "#888" }}>Prep Time</div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{food.time || "10"} min</div>
                        </div>
                    </div>
                    </div>
                </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <h3 style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#333",
                        marginBottom: "0.8rem",
                        fontSize: "1.1rem",
                        }}>
                        <IoNutritionOutline style={{ color: "#fb6f92", fontSize: "1.1rem" }} />
                        Ingredients
                        </h3>
                        <ul style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "0.5rem",
                        }}>
                        {food.ingredients?.map((ing, index) => (
                            <li key={index} style={{
                            background: "#fff",
                            padding: "0.4rem 0.7rem",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            }}>
                            <span style={{
                                width: "6px",
                                height: "6px",
                                background: "#fb6f92",
                                borderRadius: "50%",
                            }}></span>
                            {ing}
                            </li>
                        )) || (
                            <>
                            <li style={{
                                background: "#fff",
                                padding: "0.4rem 0.7rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            }}>Oatmeal</li>
                            <li style={{
                                background: "#fff",
                                padding: "0.4rem 0.7rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            }}>Brown sugar</li>
                            <li style={{
                                background: "#fff",
                                padding: "0.4rem 0.7rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            }}>Milk</li>
                            <li style={{
                                background: "#fff",
                                padding: "0.4rem 0.7rem",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                            }}>Vanilla</li>
                            </>
                        )}
                        </ul>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default FoodModal;