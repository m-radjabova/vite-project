import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CompletedPage() {
    const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <div className="close d-flex justify-content-end">
            <IoMdClose onClick={() => navigate(-1)}  className="close-icon" />
        </div>
      <div className="border rounded shadow-sm p-5 text-center bg-white" style={{ maxWidth: 400, width: "100%" }}>
        <div className="mb-4">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#222" strokeWidth="3" fill="none"/>
            <polyline points="28,42 38,52 54,32" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={{ fontSize: "1.4rem", color: "#222"}}>
          Спасибо за ваше обращение, <br />
          в течение рабочего дня <br />
          мы свяжемся с вами
        </div>
      </div>
    </div>
  );
}

export default CompletedPage;