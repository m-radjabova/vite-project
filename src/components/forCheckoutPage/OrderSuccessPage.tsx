import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBoxOpen, FaHistory } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCheckout } from "../../context/MyContext";

function OrderSuccessPage() {
    const { data } = useCheckout();
    const navigate = useNavigate();
    const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #fff9fb 0%, #fff0f5 100%)",
      padding: "2rem",
      fontFamily: "'Poppins', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative circles */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,111,146,0.1) 0%, rgba(251,111,146,0) 70%)",
        zIndex: 0
      }}></div>
      
      <div style={{
        position: "absolute",
        bottom: "-150px",
        left: "-150px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,143,171,0.08) 0%, rgba(255,143,171,0) 70%)",
        zIndex: 0
      }}></div>

      {/* Main card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "3rem",
        boxShadow: "0 15px 40px rgba(251, 111, 146, 0.1)",
        maxWidth: "600px",
        width: "100%",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        border: "1px solid rgba(251, 111, 146, 0.1)",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease"
      }}>
        {/* Animated checkmark */}
        <div style={{
          display: "inline-block",
          marginBottom: "1.5rem",
          transform: animated ? "scale(1)" : "scale(0.8)",
          transition: "transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)"
        }}>
          <FiCheckCircle 
            size={100} 
            color="#fb6f92" 
            style={{
              filter: "drop-shadow(0 5px 10px rgba(251, 111, 146, 0.3))"
            }} 
          />
        </div>

        <h1 style={{ 
          color: "#fb6f92", 
          margin: "1.5rem 0 0.5rem",
          fontSize: "2.2rem",
          fontWeight: "700",
          fontFamily: "'Playfair Display', serif",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s"
        }}>
          Order Confirmed!
        </h1>

        <p style={{ 
          color: "#7a3a5c", 
          fontSize: "1.1rem",
          lineHeight: "1.6",
          marginBottom: "1rem",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s"
        }}>
          Your delicious treats are being prepared with love!
        </p>

        <p style={{ 
          color: "#b58ba3", 
          margin: "1rem 0 2rem",
          fontSize: "0.95rem",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s"
        }}>
          We've sent the order details to your email. You can track your order in your account.
        </p>

        {/* Action buttons */}
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "2rem"
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "0.8rem 1.8rem",
              background: "linear-gradient(135deg, #fb6f92, #ff8fab)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 5px 15px rgba(251, 111, 146, 0.3)",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease 0.5s, transform 0.4s ease 0.5s, transform 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = animated ? "scale(1)" : "translateY(10px)"}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1.05)"}
          >
            <FaHome size={16} />
            Go to Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            style={{
              padding: "0.8rem 1.8rem",
              background: "rgba(251, 111, 146, 0.1)",
              color: "#fb6f92",
              border: "none",
              borderRadius: "50px",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: animated ? 1 : 0,
              transform: animated ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease 0.6s, transform 0.4s ease 0.6s, transform 0.2s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = animated ? "scale(1)" : "translateY(10px)"}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1.05)"}
          >
            <FaHistory size={16} />
            Order History
          </button>
        </div>

        {/* Order details */}
        <div style={{
          padding: "1.5rem",
          background: "rgba(251, 111, 146, 0.03)",
          borderRadius: "12px",
          border: "1px dashed rgba(251, 111, 146, 0.2)",
          opacity: animated ? 1 : 0,
          transform: animated ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.4s ease 0.7s, transform 0.4s ease 0.7s"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "#fb6f92",
            marginBottom: "0.5rem"
          }}>
            <FaBoxOpen size={18} />
            <span style={{ fontWeight: "600" }}>Order #{data.productId}</span>
          </div>
          <p style={{ 
            color: "#7a3a5c", 
            fontSize: "0.9rem",
            margin: 0
          }}>
            Estimated delivery: {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;