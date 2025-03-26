
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+998\(\d{2}\)\d{3}-\d{2}-\d{2}$/, "Phone number must be in +998(XX)XXX-XX-XX format")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };


  return (
    <div className="container mt-3">
      <div className="blur-container">
        <h1 className="text-center mb-4 text-dark">Register Form</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                id="firstName"
                // placeholder="Enter your first name"
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                id="lastName"
                // placeholder="Enter your last name"
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label ">Email</label>
            <input
              {...register("email")}
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              // placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label ">Phone</label>
            <input
              {...register("phone")}
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              // placeholder="+998(XX)XXX-XX-XX"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              {...register("address")}
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              // placeholder="Enter your address"
            />
            {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                {...register("password")}
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                // placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                // placeholder="Confirm your password"
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
            </div>
          </div>
          <button className="btn btn-dark w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default App;