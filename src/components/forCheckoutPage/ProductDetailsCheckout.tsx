import { ProductType } from "../../page/types/Types";
import { FiPlus, FiMinus, FiPackage, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
    product: ProductType | undefined;
}

function ProductDetailsCheckout({ product }: Props) {
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams()
    const navigate = useNavigate()

    const handleMinus = () => setQuantity(q => Math.max(1, q - 1));
    const handlePlus = () => setQuantity(q => q + 1);

    return (
        <div
            className="checkout-product-card"
            style={{
                borderRadius: "2.5rem",
                overflow: "hidden",
                boxShadow: "0 8px 40px 0 rgba(251, 111, 146, 0.18), 0 1.5px 8px 0 rgba(0,0,0,0.04)",
                background: "linear-gradient(135deg, #fff5f7 60%, #ffe0ec 100%)",
                position: "relative",
                margin: "0 auto",
                maxWidth: 900,
                transition: "box-shadow 0.3s cubic-bezier(.4,2,.6,1)",
            }}
        >
            {product ? (
                <div className="row g-0 flex-wrap">
                    {/* Left: Product Image */}
                    <div
                        className="col-md-5 d-flex justify-content-center align-items-center"
                        style={{
                            background: "linear-gradient(135deg, #ffe0ec 60%, #fff5f7 100%)",
                            minHeight: 360,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Blurred gradient circle */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                width: "220px",
                                height: "220px",
                                background: "radial-gradient(circle at 60% 40%, #ffb6c1 0%, #fff0f5 80%)",
                                filter: "blur(32px)",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1,
                                opacity: 0.6,
                            }}
                        />
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            style={{
                                maxHeight: "260px",
                                objectFit: "contain",
                                zIndex: 2,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.7)",
                                boxShadow: "0 8px 32px 0 rgba(251, 111, 146, 0.12)",
                                padding: "32px",
                                transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                                border: "4px solid #fff0f5",
                            }}
                        />
                    </div>

                    {/* Right: Product Info */}
                    <div className="col-md-7">
                        <div
                            className="card-body p-4 p-lg-5"
                            style={{
                                position: "relative",
                                zIndex: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h2
                                        className="card-title mb-2"
                                        style={{
                                            color: "#2d1e2f",
                                            fontSize: "2.2rem",
                                            fontWeight: 800,
                                            letterSpacing: "-1px",
                                            background: "linear-gradient(90deg, #fb6f92, #ff8fab 80%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            lineHeight: 1.1,
                                        }}
                                    >
                                        {product.name}
                                    </h2>
                                    <div className="d-flex align-items-center mb-3">
                                        {product.oldPrice && (
                                            <span
                                                className="text-muted me-2"
                                                style={{
                                                    textDecoration: "line-through",
                                                    fontSize: "1.1rem",
                                                    opacity: 0.7,
                                                }}
                                            >
                                                {product.oldPrice.toFixed(2)} $
                                            </span>
                                        )}
                                        <span
                                            className="fw-bold"
                                            style={{
                                                fontSize: "2rem",
                                                color: "#fb6f92",
                                                fontWeight: 900,
                                                letterSpacing: "-1px",
                                                textShadow: "0 2px 8px #ffe0ec",
                                            }}
                                        >
                                            {product.price.toFixed(2)} $
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        background: "linear-gradient(90deg, #fb6f92, #ff8fab)",
                                        color: "white",
                                        padding: "6px 18px",
                                        borderRadius: "1.5rem",
                                        fontSize: "0.95rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.5px",
                                        boxShadow: "0 2px 8px #ffe0ec",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Popular
                                </div>
                            </div>

                            <p
                                className="card-text text-muted mb-4"
                                style={{
                                    lineHeight: "1.7",
                                    fontSize: "1.08rem",
                                    color: "#6c567b",
                                    fontWeight: 500,
                                    letterSpacing: "0.1px",
                                    background: "rgba(255,255,255,0.7)",
                                    borderRadius: "1rem",
                                    padding: "1rem 1.2rem",
                                    boxShadow: "0 2px 12px 0 rgba(251, 111, 146, 0.04)",
                                }}
                            >
                                {product.description}
                            </p>

                            {/* Divider */}
                            <div
                                style={{
                                    height: "2px",
                                    background: "linear-gradient(90deg, #ff8fab, #fb6f92)",
                                    margin: "28px 0 18px 0",
                                    borderRadius: "2px",
                                    opacity: 0.18,
                                }}
                            />

                           
                            <div className="mb-4">
                                <h6
                                    className="mb-3"
                                    style={{
                                        color: "#fb6f92",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.5px",
                                        textTransform: "uppercase",
                                        lineHeight: "1px",
                                    }}
                                >
                                    Quantity
                                </h6>
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        maxWidth: "220px",
                                        background: "linear-gradient(90deg, #fff0f5 60%, #ffe0ec 100%)",
                                        borderRadius: "2.5rem",
                                        boxShadow: "0 4px 24px 0 rgba(251, 111, 146, 0.10)",
                                        padding: "6px 18px",
                                        gap: "16px",
                                        border: "1.5px solid #ffb6c1",
                                        margin: "0 auto"
                                    }}
                                >
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            border: "none",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #ff8fab 60%, #fb6f92 100%)",
                                            color: "#fff",
                                            fontSize: "1.5rem",
                                            boxShadow: "0 2px 8px #ffb6c1",
                                            transition: "transform 0.15s, box-shadow 0.15s",
                                            cursor: "pointer",
                                            outline: "none"
                                        }}
                                        onClick={handleMinus}
                                        onMouseDown={e => e.currentTarget.style.transform = "scale(0.92)"}
                                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            minWidth: "54px",
                                            height: "44px",
                                            fontSize: "1.3rem",
                                            color: "#fb6f92",
                                            fontWeight: 800,
                                            background: "rgba(255,255,255,0.8)",
                                            borderRadius: "1.5rem",
                                            boxShadow: "0 1px 4px #ffe0ec",
                                            letterSpacing: "2px",
                                            userSelect: "none",
                                            border: "1.5px solid #ffb6c1"
                                        }}
                                    >
                                        {quantity}
                                    </span>
                                    <button
                                        className="d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            border: "none",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #fb6f92 60%, #ff8fab 100%)",
                                            color: "#fff",
                                            fontSize: "1.5rem",
                                            boxShadow: "0 2px 8px #ffb6c1",
                                            transition: "transform 0.15s, box-shadow 0.15s",
                                            cursor: "pointer",
                                            outline: "none"
                                        }}
                                        onClick={handlePlus}
                                        onMouseDown={e => e.currentTarget.style.transform = "scale(0.92)"}
                                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button
                                    onClick={() => navigate(`/checkout-product/${id}/delivery`)}
                                    type="button"
                                    className="btn w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden mt-4"
                                    style={{
                                        background: "linear-gradient(135deg, #ff8fab, #fb6f92)",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: "1.08rem",
                                        border: "none",
                                        borderRadius: "2rem",
                                        boxShadow: "0 4px 16px rgba(251, 111, 146, 0.25)",
                                        padding: "0.95rem 0",
                                        letterSpacing: "0.5px",
                                        transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                                        zIndex: 1,
                                        marginTop: "2.2rem"
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(251, 111, 146, 0.35)";
                                        e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(251, 111, 146, 0.25)";
                                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                                    }}
                                >
                                    Continue to Delivery
                                    <FiArrowRight className="ms-2" size={20} />
                                    <span style={{
                                        position: "absolute",
                                        top: "-50%",
                                        left: "-50%",
                                        width: "200%",
                                        height: "200%",
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0))",
                                        transform: "rotate(45deg)",
                                        transition: "all 0.3s ease",
                                        zIndex: -1
                                    }}></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card-body text-center py-5">
                    <div className="d-flex flex-column align-items-center">
                        <FiPackage size={48} className="text-muted mb-3" />
                        <h4 className="text-danger mb-2">Product Not Found</h4>
                        <p className="text-muted">We couldn't find the product you're looking for</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetailsCheckout;