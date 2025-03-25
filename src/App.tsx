import { FieldValues, useForm } from "react-hook-form";


function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Enter your name"
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
          />
          {errors.name && <div className="invalid-feedback">Please enter your name</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            placeholder="Enter your last name"
            type="text"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            id="lastName"
          />
          {errors.lastName && <div className="invalid-feedback">Please enter your last name</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="Enter your email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
          />
          {errors.email && <div className="invalid-feedback">Please enter your email</div>}
        </div>
        <button className="btn btn-primary mt-3" >Submit</button>
      </form>
    </div>
  );
}

export default App;