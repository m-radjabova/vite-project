import TipsForm from "./component/TipsForm";
import TipsList from "./component/TipsList"
import { FaHeart, FaRegHeart, FaGift } from 'react-icons/fa';

function App() {
  return (
    <div 
      className="container p-4" 
      style={{
        background: "linear-gradient(145deg, #fff5f5 0%, #fff0f0 100%)",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(255, 105, 180, 0.1)",
        marginTop: "30px",
        marginBottom: "50px",
        border: "1px solid rgba(255, 182, 193, 0.3)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-30px",
        fontSize: "120px",
        color: "rgba(255, 182, 193, 0.15)",
        transform: "rotate(15deg)"
      }}>
        <FaGift />
      </div>
      
      <div style={{
        position: "absolute",
        bottom: "-40px",
        left: "-30px",
        fontSize: "100px",
        color: "rgba(255, 182, 193, 0.15)",
        transform: "rotate(-10deg)"
      }}>
        <FaRegHeart />
      </div>

      <h1 
        className="text-center mb-5 position-relative" 
        style={{
          color: "#ff6b88",
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0,0,0,0.05)",
          fontSize: "2.8rem",
          letterSpacing: "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px"
        }}
      >
        <FaHeart style={{ 
          color: "#ff6b88", 
          fontSize: "1.8rem",
          animation: "pulse 1.5s infinite"
        }} />
        Tips
        <FaHeart style={{ 
          color: "#ff6b88", 
          fontSize: "1.8rem",
          animation: "pulse 1.5s infinite",
          animationDelay: "0.5s"
        }} />
      </h1>
      <hr className="border-dark opacity-50" />
      <TipsForm />

      <div style={{
        width: "100%",
        height: "2px",
        background: "linear-gradient(90deg, #ff6b88, #ffb6c1)",
        margin: "20px 0"
      }}></div>

      <TipsList />
      
    </div>
  )
}

export default App