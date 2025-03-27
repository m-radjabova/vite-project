import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { User } from "../types/types"
import UsersList from "./UsersList"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react"

type FormData = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string;
}

const schema = z.object({
    name: z.string().min(3, { message: "3 tadan kam kiritma!!!" }),
    email: z.string().email({ message: "Emailni to'g'ri kirit!!!" }),
    password: z.string().min(8, { message: "8 tadan kam kiritma!!!" }),
    confirmPassword: z.string().min(8, { message: "8 tadan kam kiritma!!!" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Parollar bir xil emas",
    path: ["confirmPassword"]
})

interface Props {
    addUser: (user: User) => void
}

function RegisterForm( {addUser} : Props) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        const newUser: User = {
            id: UsersList.length + 1,
            ...data
        };
        addUser(newUser);
        reset();
    }

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-5 border p-4 rounded shadow bg-white">
                <h1 className="text-center mb-4 text-primary">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label" htmlFor="name">Name</label>
                <input
                    {...register("name")}
                    type="text"
                    className={`form-control mb-2 ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    // placeholder="Enter your name"
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}

                <label className="form-label" htmlFor="email">Email</label>
                <input
                    {...register("email")}
                    type="text"
                    className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    // placeholder="Enter your email"
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <label className="form-label" htmlFor="password">Password</label>
                <div className="position-relative mb-2">
                    <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    // placeholder="Enter your password"
                    />
                    <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <div className="position-relative mb-2">
                    <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                    id="confirmPassword"
                    // placeholder="Confirm your password"
                    />
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                <button className="btn btn-primary mt-3 w-100">Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm

