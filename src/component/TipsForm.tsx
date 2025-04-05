import { FaUser, FaUserTie, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useContextPro from "../hooks/useContextPro";
import { useEffect } from "react";

const tipsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters")
});

interface FormData {
    name: string;
    lastName: string;
    phone: string;
    address: string;
}

function TipsForm() {

    const { state: { selectedTip, tips }, dispatch } = useContextPro()

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(tipsSchema)
    });

    function submit(data: FormData) {
      if (selectedTip) {
          dispatch({ type: "EDIT", payload: { ...data, id: selectedTip.id } })
      } else {
          dispatch({ type: "ADD_TIP", payload: { ...data, id: tips.length + 1 } })
      }
      reset({ name: "", lastName: "", phone: "", address: "" })
  }

  useEffect(() => {
      reset(selectedTip)
  }, [selectedTip, reset])

  return (
    <div className="container py-4">
      <h2 className="mb-4" style={{ 
        color: "#ff6b88",
        fontWeight: "600",
        fontSize: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
        <FaPaperPlane style={{ color: "#ff8fab" }} /> Tips Form
      </h2>
      
      <form 
        onSubmit={handleSubmit(submit)}
        className="p-4 rounded" 
        style={{ 
          background: "rgba(255, 182, 193, 0.1)",
          border: "1px solid rgba(255, 107, 136, 0.3)",
          boxShadow: "0 4px 12px rgba(255, 107, 136, 0.1)"
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label" 
          style={{
            color: "#ff6b88",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FaUser size={16} /> Name
          </label>
          <input 
            type="text" 
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            {...register("name")}
            style={{
              borderColor: "#ffb6c1",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          />
          {errors.name && (
            <div className="invalid-feedback" style={{ color: "#ff6b88" }}>
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label" 
          style={{
            color: "#ff6b88",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FaUserTie size={16} /> Last Name
          </label>
          <input 
            type="text" 
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
            {...register("lastName")}
            style={{
              borderColor: "#ffb6c1",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          />
          {errors.lastName && (
            <div className="invalid-feedback" style={{ color: "#ff6b88" }}>
              {errors.lastName.message}
            </div>
          )}
        </div>


        <div className="mb-3">
          <label htmlFor="phone" className="form-label" 
          style={{
            color: "#ff6b88",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FaPhoneAlt size={16} /> Phone
          </label>
          <input 
            type="tel" 
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            {...register("phone")}
            style={{
              borderColor: "#ffb6c1",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          />
          {errors.phone && (
            <div className="invalid-feedback" style={{ color: "#ff6b88" }}>
              {errors.phone.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label" 
          style={{
            color: "#ff6b88",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FaMapMarkerAlt size={16} /> Address
          </label>
          <input 
            type="text" 
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address"
            {...register("address")}
            style={{
              borderColor: "#ffb6c1",
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}
          />
          {errors.address && (
            <div className="invalid-feedback" style={{ color: "#ff6b88" }}>
              {errors.address.message}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="btn w-100 py-2" 
          style={{
            background: "linear-gradient(to right, #ff6b88, #ff8fab)",
            color: "white",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "10px",
            transition: "all 0.3s ease"
          }}
        >
          <FaPaperPlane /> 
          {selectedTip ? "Update Tip" : "Add Tip"}
        </button>
      </form>
    </div>
  );
}

export default TipsForm;