import { useForm } from "react-hook-form";
import { FiUser, FiPhone, FiHome, FiClock, FiTruck, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import {useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "../../context/MyContext";

type DeliveryForm = {
  fullName: string;
  phone: string;
  address: string;
  deliveryType: string;
  notes?: string;
};

function CheckoutDeliveryPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } , watch} = useForm<DeliveryForm>();
    const selectedType = watch("deliveryType");
    const {setData} = useCheckout();

    const onSubmit = (data: DeliveryForm) => {
      setData(prev => ({
        ...prev,
        delivery: data,
      }));
      navigate(`/checkout-product/${id}/summary`);
    };

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{
        minHeight: "60vh",
        background: "linear-gradient(135deg, #fff5f7 60%, #ffe0ec 100%)",
        borderRadius: "2.5rem",
        boxShadow: "0 8px 40px 0 rgba(251, 111, 146, 0.15)",
        padding: "2.5rem 1rem",
        maxWidth: 520,
        margin: "0 auto",
        border: "1px solid rgba(251, 111, 146, 0.2)"
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.96)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px rgba(251, 111, 146, 0.15)",
          padding: "2.5rem 2rem",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(251, 111, 146, 0.15)"
        }}
      >
        <div className="text-center mb-4">
          <h3
            style={{
              color: "#fb6f92",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              fontSize: "1.8rem",
              position: "relative",
              display: "inline-block",
              marginBottom: "1.5rem"
            }}
          >
            <span style={{
              position: "absolute",
              bottom: "-8px",
              left: "0",
              width: "100%",
              height: "8px",
              background: "linear-gradient(90deg, rgba(251, 111, 146, 0.3), rgba(251, 111, 146, 0.1))",
              borderRadius: "4px",
              zIndex: "-1"
            }}></span>
            Delivery Details
          </h3>
          <p style={{ 
            color: "#b5839d", 
            fontSize: "0.95rem",
            marginTop: "-0.5rem"
          }}>
            Fill in your details to receive your order
          </p>
        </div>

        <div className="mb-4 position-relative">
          <label className="form-label d-flex align-items-center" style={{ 
            color: "#d14d82", 
            fontWeight: 600,
            marginBottom: "0.75rem"
          }}>
            <div style={{
              background: "rgba(251, 111, 146, 0.1)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.75rem"
            }}>
              <FiUser size={16} color="#fb6f92" />
            </div>
            Full Name
          </label>
          <input
            className="form-control"
            style={{
              borderRadius: "1.25rem",
              border: "1.5px solid rgba(251, 111, 146, 0.25)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem",
              transition: "all 0.2s ease",
              fontSize: "0.95rem",
              boxShadow: "inset 0 1px 4px rgba(251, 111, 146, 0.05)"
            }}
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Your full name"
          />
          {errors.fullName && (
            <div className="d-flex align-items-center mt-2">
              <FiAlertCircle className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.fullName.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ 
            color: "#d14d82", 
            fontWeight: 600,
            marginBottom: "0.75rem"
          }}>
            <div style={{
              background: "rgba(251, 111, 146, 0.1)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.75rem"
            }}>
              <FiPhone size={16} color="#fb6f92" />
            </div>
            Phone Number
          </label>
          <input
            className="form-control"
            style={{
              borderRadius: "1.25rem",
              border: "1.5px solid rgba(251, 111, 146, 0.25)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem",
              fontSize: "0.95rem",
              boxShadow: "inset 0 1px 4px rgba(251, 111, 146, 0.05)"
            }}
            {...register("phone", { 
              required: "Phone number is required",
            })}
            placeholder="+998 90 123 45 67"
          />
          {errors.phone && (
            <div className="d-flex align-items-center mt-2">
              <FiAlertCircle className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.phone.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ 
            color: "#d14d82", 
            fontWeight: 600,
            marginBottom: "0.75rem"
          }}>
            <div style={{
              background: "rgba(251, 111, 146, 0.1)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.75rem"
            }}>
              <FiHome size={16} color="#fb6f92" />
            </div>
            Address
          </label>
          <textarea
            className="form-control"
            rows={3}
            style={{
              borderRadius: "1.25rem",
              border: "1.5px solid rgba(251, 111, 146, 0.25)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem",
              resize: "none",
              fontSize: "0.95rem",
              boxShadow: "inset 0 1px 4px rgba(251, 111, 146, 0.05)"
            }}
            {...register("address", { required: "Address is required" })}
            placeholder="Street, house, apartment, city, region"
          />
          {errors.address && (
            <div className="d-flex align-items-center mt-2">
              <FiAlertCircle className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.address.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ 
            color: "#d14d82", 
            fontWeight: 600,
            marginBottom: "1rem"
          }}>
            <div style={{
              background: "rgba(251, 111, 146, 0.1)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.75rem"
            }}>
              <FiTruck size={16} color="#fb6f92" />
            </div>
            Delivery Type
          </label>
          <div className="d-flex gap-3 flex-wrap">
            <div 
              className="flex-grow-1" 
              style={{ minWidth: "120px" }}
            >
              <input
                className="btn-check"
                type="radio"
                id="standard"
                value="Standard"
                {...register("deliveryType", { required: true })}
              />
              <label 
                className="btn w-100 d-flex align-items-center justify-content-center" 
                htmlFor="standard" 
                style={{ 
                  fontWeight: 600, 
                  color: "#fb6f92",
                  background: selectedType === "Standard" ? "#ffe0ec" : "rgba(251, 111, 146, 0.08)",
                  border: "1.5px solid rgba(251, 111, 146, 0.2)",
                  borderRadius: "1.25rem",
                  padding: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedType === "Standard" ? "0 2px 8px #ffb6c1" : undefined
                }}
              >
                <FiClock className="me-2" size={16} />
                Standard
              </label>
            </div>
            <div 
              className="flex-grow-1" 
              style={{ minWidth: "120px" }}
            >
              <input
                className="btn-check"
                type="radio"
                id="express"
                value="Express"
                {...register("deliveryType", { required: true })}
              />
              <label 
                className="btn w-100 d-flex align-items-center justify-content-center" 
                htmlFor="express" 
                style={{ 
                  fontWeight: 600, 
                  color: "#fb6f92",
                  background: selectedType === "Express" ? "#ffe0ec" : "rgba(251, 111, 146, 0.08)",
                  border: "1.5px solid rgba(251, 111, 146, 0.2)",
                  borderRadius: "1.25rem",
                  padding: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedType === "Express" ? "0 2px 8px #ffb6c1" : undefined
                }}
              >
                <FiTruck className="me-2" size={16} />
                Express
              </label>
            </div>
          </div>
          {errors.deliveryType && (
            <div className="d-flex align-items-center mt-2">
              <FiAlertCircle className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>Please select delivery type</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ff8fab, #fb6f92)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            border: "none",
            borderRadius: "1.5rem",
            boxShadow: "0 4px 20px rgba(251, 111, 146, 0.3)",
            padding: "1rem 0",
            transition: "all 0.3s ease",
            zIndex: "1",
            marginTop: "1rem"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(251, 111, 146, 0.4)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(251, 111, 146, 0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Continue to Payment
          <FiArrowRight className="ms-2" size={18} />
          <span style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0))",
            transform: "rotate(45deg)",
            transition: "all 0.3s ease",
            zIndex: "-1"
          }}></span>
        </button>
      </form>
    </div>
  );
}

export default CheckoutDeliveryPage;