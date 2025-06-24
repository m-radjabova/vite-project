import { useLocation, useParams } from "react-router-dom";
import useProducts from "../../hooks/useProduct";
import Header from "../Header";
import ProductDetailsCheckout from "./ProductDetailsCheckout";
import { FiShoppingCart, FiTruck, FiCreditCard } from "react-icons/fi";
import CheckoutDeliveryPage from "./CheckoutDeliveryPage";
import CheckoutSummaryPaymetPage from "./CheckoutSummaryPaymetPage";


function CheckoutPage() {
    const { id } = useParams();
    const { products } = useProducts();
    const location = useLocation();
    const product = products.find((p) => String(p.id) === String(id));
    
    let step = 0;
    if (location.pathname.endsWith("/delivery")) step = 1;
    if (location.pathname.endsWith("/summary")) step = 2;

    const steps = [
        { label: "Your Product", icon: <FiShoppingCart size={24} /> },
        { label: "Delivery", icon: <FiTruck size={24} /> },
        { label: "Payment", icon: <FiCreditCard size={24} /> }
    ];

    const renderStep = () => {
        if (step === 0) return <ProductDetailsCheckout product={product} />;
        if (step === 1) return <CheckoutDeliveryPage />;
        if (step === 2) return <CheckoutSummaryPaymetPage />;
        return null;
    };

    return (
        <>
            <Header />
            <div className="checkout-container" style={{ backgroundColor: "#fff9fb", minHeight: "100vh" }}>
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
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        letterSpacing: "-0.5px"
                    }}>
                        Complete Your Order
                    </h1>
                    <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
                        Almost there! Just a few more steps to enjoy your delicious treats.
                    </p>
                </div>
                <div className="container py-5">
                    {/* Stepper */}
                    <div className="row mb-5 position-relative">
                        <div className="progress-bar-container" style={{
                            position: "absolute",
                            top: "25px",
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
                                transition: "width 0.3s ease"
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
                                                    : "#f2f2f2",
                                            color:
                                                index < step
                                                    ? "#fb6f92"
                                                    : index === step
                                                    ? "#fff"
                                                    : "#aaa",
                                            boxShadow:
                                                index === step
                                                    ? "0 4px 16px 0 rgba(251, 111, 146, 0.18)"
                                                    : index < step
                                                    ? "0 2px 8px #ffe0ec"
                                                    : "none",
                                            border:
                                                index < step
                                                    ? "2.5px solid #fb6f92"
                                                    : "none",
                                            fontWeight: 700,
                                            fontSize: "1.2rem",
                                            transition: "all 0.3s cubic-bezier(.4,2,.6,1)"
                                        }}>
                                        {s.icon}
                                    </div>
                                    <span style={{
                                        fontWeight: "700",
                                        color:
                                            index < step
                                                ? "#fb6f92"
                                                : index === step
                                                ? "#fb6f92"
                                                : "#aaa",
                                        fontSize: "1rem",
                                        letterSpacing: "0.5px"
                                    }}>
                                        {s.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Step Content */}
                    <div>
                        {renderStep()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;