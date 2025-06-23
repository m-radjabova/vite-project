import { useForm } from "react-hook-form";
import { FiUser, FiPhone, FiHome, FiClock, FiTruck, FiInfo, FiArrowRight } from "react-icons/fi";
import { FaRegSmile } from "react-icons/fa";
import {useNavigate, useParams } from "react-router-dom";

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
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryForm>();

  const onSubmit = (data: DeliveryForm) => {
    console.log(data);
     navigate(`/checkout-product/${id}/summary`);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{
        minHeight: "60vh",
        background: "linear-gradient(135deg, #fff5f7 60%, #ffe0ec 100%)",
        borderRadius: "2.5rem",
        boxShadow: "0 8px 40px 0 rgba(251, 111, 146, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.04)",
        padding: "2.5rem 1rem",
        maxWidth: 520,
        margin: "0 auto",
        border: "1px solid rgba(251, 111, 146, 0.15)"
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.92)",
          borderRadius: "2rem",
          boxShadow: "0 4px 24px rgba(251, 111, 146, 0.12)",
          padding: "2.5rem 2rem",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(251, 111, 146, 0.1)"
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
              display: "inline-block"
            }}
          >
            <span style={{
              position: "absolute",
              bottom: "-5px",
              left: "0",
              width: "100%",
              height: "6px",
              background: "linear-gradient(90deg, rgba(251, 111, 146, 0.2), rgba(251, 111, 146, 0.1))",
              borderRadius: "3px"
            }}></span>
            Delivery Details
          </h3>
          <p className="text-muted mt-2" style={{ fontSize: "0.95rem" }}>
            Fill in your details to receive your order
          </p>
        </div>

        <div className="mb-4 position-relative">
          <label className="form-label d-flex align-items-center" style={{ color: "#fb6f92", fontWeight: 600 }}>
            <FiUser className="me-2" size={18} />
            Full Name
          </label>
          <input
            className="form-control"
            style={{
              borderRadius: "1.5rem",
              border: "1.5px solid rgba(251, 111, 146, 0.3)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem",
              transition: "all 0.2s ease"
            }}
            {...register("fullName", { required: "Full name is required" })}
            placeholder="Your full name"
          />
          {errors.fullName && (
            <div className="d-flex align-items-center mt-1">
              <FiInfo className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.fullName.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ color: "#fb6f92", fontWeight: 600 }}>
            <FiPhone className="me-2" size={18} />
            Phone Number
          </label>
          <input
            className="form-control"
            style={{
              borderRadius: "1.5rem",
              border: "1.5px solid rgba(251, 111, 146, 0.3)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem"
            }}
            {...register("phone", { 
              required: "Phone number is required",
              pattern: {
                value: /^\+998\d{2}\d{3}\d{2}\d{2}$/,
                message: "Invalid phone number"
              }
            })}
            placeholder="+998 90 123 45 67"
          />
          {errors.phone && (
            <div className="d-flex align-items-center mt-1">
              <FiInfo className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.phone.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ color: "#fb6f92", fontWeight: 600 }}>
            <FiHome className="me-2" size={18} />
            Address
          </label>
          <textarea
            className="form-control"
            rows={3}
            style={{
              borderRadius: "1.5rem",
              border: "1.5px solid rgba(251, 111, 146, 0.3)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem",
              resize: "none"
            }}
            {...register("address", { required: "Address is required" })}
            placeholder="Street, house, apartment, city, region"
          />
          {errors.address && (
            <div className="d-flex align-items-center mt-1">
              <FiInfo className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>{errors.address.message}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ color: "#fb6f92", fontWeight: 600 }}>
            <FiTruck className="me-2" size={18} />
            Delivery Type
          </label>
          <div className="d-flex gap-3 mt-2 flex-wrap">
            <div className="form-check flex-grow-1" style={{ minWidth: "120px" }}>
              <input
                className="form-check-input"
                type="radio"
                id="standard"
                value="Standard"
                {...register("deliveryType", { required: true })}
                style={{
                  width: "1.1em",
                  height: "1.1em",
                  marginTop: "0.2em"
                }}
              />
              <label className="form-check-label d-flex align-items-center" htmlFor="standard" style={{ fontWeight: 600, color: "#fb6f92" }}>
                <FiClock className="me-2" size={16} />
                Standard (3-5 days)
              </label>
            </div>
            <div className="form-check flex-grow-1" style={{ minWidth: "120px" }}>
              <input
                className="form-check-input"
                type="radio"
                id="express"
                value="Express"
                {...register("deliveryType", { required: true })}
                style={{
                  width: "1.1em",
                  height: "1.1em",
                  marginTop: "0.2em"
                }}
              />
              <label className="form-check-label d-flex align-items-center" htmlFor="express" style={{ fontWeight: 600, color: "#fb6f92" }}>
                <FiTruck className="me-2" size={16} />
                Express (1-2 days)
              </label>
            </div>
          </div>
          {errors.deliveryType && (
            <div className="d-flex align-items-center mt-1">
              <FiInfo className="text-danger me-1" size={14} />
              <span className="text-danger" style={{ fontSize: "0.85rem" }}>Please select delivery type</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label d-flex align-items-center" style={{ color: "#fb6f92", fontWeight: 600 }}>
            <FaRegSmile className="me-2" size={16} />
            Additional Notes
          </label>
          <input
            className="form-control"
            style={{
              borderRadius: "1.5rem",
              border: "1.5px solid rgba(251, 111, 146, 0.3)",
              background: "#fff9fb",
              fontWeight: 500,
              padding: "0.75rem 1.25rem"
            }}
            {...register("notes")}
            placeholder="Any special instructions (optional)"
          />
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
            borderRadius: "2rem",
            boxShadow: "0 4px 16px rgba(251, 111, 146, 0.3)",
            padding: "0.85rem 0",
            transition: "all 0.3s ease",
            zIndex: "1"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(251, 111, 146, 0.4)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(251, 111, 146, 0.3)";
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
            background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
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