import { useLocation, useNavigate, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProduct";
import ProductDetailsCheckout from "./ProductDetailsCheckout";
import { FiShoppingCart, FiTruck, FiCreditCard } from "react-icons/fi";
import CheckoutDeliveryPage from "./CheckoutDeliveryPage";
import CheckoutSummaryPaymetPage from "./CheckoutSummaryPaymetPage";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { ProductType } from "../../page/types/Types";

export interface OrderData {
  product: ProductType[] | undefined;
  quantity: number | undefined;
  delivery: {
    fullName: string;
    phone: string;
    address: string;
    deliveryType: string;
    notes?: string;
  } | undefined;
  paymentMethod: string;
}


function CheckoutPage() {
    const { id } = useParams();
    const { products } = useProducts();
    const location = useLocation();
    const navigate = useNavigate();
    const product = products.find((p) => String(p.id) === String(id));
    
    let step = 0;
    if (location.pathname.endsWith("/delivery")) step = 1;
    if (location.pathname.endsWith("/summary")) step = 2;

    const steps = [
        { label: "Your Product", icon: <FiShoppingCart size={24} /> },
        { label: "Delivery", icon: <FiTruck size={24} /> },
        { label: "Payment", icon: <FiCreditCard size={24} /> }
    ];

    const submitOrder = async (orderData: OrderData) => {
        try {
        await apiClient.post("/orders", orderData);
        toast.success("Order placed successfully!");
        navigate("/order-success");
        } catch (err) {
        toast.error("Order placement failed!");
        console.log(err);
        }
    };

    const renderStep = () => {
        if (step === 0) return <ProductDetailsCheckout product={product} />;
        if (step === 1) return <CheckoutDeliveryPage />;
        if (step === 2) return <CheckoutSummaryPaymetPage submitOrder={submitOrder} />;
        return null;
    };

    const navigateToStep = (index: number) => {
        navigate(`/step/${index}`);
    };

    return (
        <div className="checkout-container" style={{ 
            backgroundColor: "#fff9fb", 
            minHeight: "100vh",
            fontFamily: "'Poppins', sans-serif"
        }}>
            <div className="text-center mb-5 position-relative py-5">
                <div style={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100px",
                    height: "4px",
                    background: "linear-gradient(90deg, #ff8fab, #fb6f92)",
                    borderRadius: "2px"
                }}></div>
                <h1 className="mb-3" style={{ 
                    color: "#fb6f92",
                    fontSize: "3rem",
                    fontWeight: "700",
                    letterSpacing: "-0.5px",
                }}>
                    Complete Your Order
                </h1>
                <p className="text-muted" style={{ 
                    maxWidth: "600px", 
                    margin: "0 auto",
                    fontSize: "1.05rem",
                    color: "#888"
                }}>
                    Almost there! Just a few more steps to enjoy your delicious treats.
                </p>
            </div>
            
            <div className="container py-3">
                <div className="row mb-5 position-relative">
                    <div className="progress-bar-container" style={{
                        position: "absolute",
                        top: "32px",
                        left: "12.5%",
                        width: "75%",
                        height: "4px",
                        backgroundColor: "#f2f2f2",
                        zIndex: "0"
                    }}>
                        <div className="progress-bar" style={{
                            width: `${((step + 1) / steps.length) * 100}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #ff8fab, #fb6f92)",
                            borderRadius: "2px",
                            transition: "width 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
                        }}></div>
                    </div>
                    
                    {steps.map((s, index) => (
                        <div className="col-4 text-center" key={index}>
                            <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: "1" }}>
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                                    style={{
                                        width: "68px",
                                        height: "68px",
                                        background:
                                            index < step
                                                ? "linear-gradient(135deg, #ffb6c1 60%, #ffe0ec 100%)"
                                                : index === step
                                                ? "linear-gradient(135deg, #ff8fab, #fb6f92)"
                                                : "#f8f9fa",
                                        color:
                                            index < step
                                                ? "#fb6f92"
                                                : index === step
                                                ? "#fff"
                                                : "#aaa",
                                        boxShadow:
                                            index === step
                                                ? "0 8px 20px rgba(251, 111, 146, 0.25)"
                                                : index < step
                                                ? "0 4px 12px rgba(255, 182, 193, 0.3)"
                                                : "0 2px 6px rgba(0,0,0,0.05)",
                                        border:
                                            index < step
                                                ? "2px solid #fb6f92"
                                                : "2px solid transparent",
                                        fontWeight: 700,
                                        fontSize: "1.4rem",
                                        transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigateToStep(index)}>
                                    {index < step ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    ) : (
                                        s.icon
                                    )}
                                </div>
                                <span style={{
                                    fontWeight: "600",
                                    color:
                                        index < step
                                            ? "#fb6f92"
                                            : index === step
                                            ? "#fb6f92"
                                            : "#aaa",
                                    fontSize: "0.95rem",
                                    letterSpacing: "0.5px",
                                    marginTop: "8px",
                                    textTransform: "uppercase"
                                }}>
                                    {s.label}
                                </span>
                                {index === step && (
                                    <div style={{
                                        position: "absolute",
                                        bottom: "-20px",
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#fb6f92",
                                        boxShadow: "0 0 0 4px rgba(251, 111, 146, 0.2)"
                                    }}></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="position-relative">
                    <div 
                        className="d-flex align-items-center justify-content-center rounded-circle position-absolute"
                        style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            cursor: "pointer",
                            top: "-80px",
                            left: "20px",
                            transition: "all 0.3s ease",
                            border: "1px solid #f8f9fa",
                            zIndex: 10
                        }}
                        onClick={() => navigate('/')}
                        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb6f92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    
                    <div style={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        padding: "40px",
                        boxShadow: "0 10px 30px rgba(251, 111, 146, 0.08)",
                        border: "1px solid rgba(251, 111, 146, 0.1)",
                        minHeight: "400px",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            width: "120px",
                            height: "120px",
                            background: "linear-gradient(135deg, rgba(255, 143, 171, 0.1) 0%, rgba(251, 111, 146, 0.05) 100%)",
                            borderRadius: "0 16px 0 100px"
                        }}></div>
                        
                        {renderStep()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;