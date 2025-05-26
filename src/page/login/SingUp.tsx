import { FaArrowRight, FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa"
import { FiShoppingBag } from "react-icons/fi"
import { FieldValues, useForm } from "react-hook-form"
import apiClient from "../../apiClient/ApiClient"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function SignUp() {
    const {register, handleSubmit, formState: { errors }, reset} = useForm()
    const navigate = useNavigate()

    const checkUser = async (data: FieldValues) => {
        apiClient.get(`/users?email=${data.email}`).then((res) => {
            if (res.data.length > 0) {
                toast.error("User already exists")
            } else {
                regiterUser(data)
            }
        })
    }

    const regiterUser = async (data: FieldValues) => {
        apiClient.post("/users", {...data, role: "USER"}).then((res) => {
            console.log(res)
            navigate("/login")
            toast.success("User registered successfully")
            reset()
        }).catch((err) => {
            toast.error("Error registering user")
            console.log(err)
        })
    }


    return (
        <div className="signup d-flex justify-content-center align-items-center min-vh-100" style={{ 
            backgroundColor: '#fff8f0',
            backgroundImage: 'linear-gradient(rgba(255,165,0,0.05), rgba(255,165,0,0.05))'
        }}>
            <div className="signup-form bg-white p-3 p-md-5 rounded-4 shadow" style={{ 
                width: '95%', 
                maxWidth: '500px', 
                border: 'none',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30px',
                    left: '-30px',
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>
                
                <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <FiShoppingBag className="mb-3" style={{ 
                        fontSize: '2.5rem', 
                        color: '#ff8c00',
                        filter: 'drop-shadow(0 2px 4px rgba(255,140,0,0.3))'
                    }} />
                    <h2 className="fw-bold" style={{ color: '#ff8c00' }}>Join YouMeal</h2>
                    <p className="text-muted">Create your account to start ordering</p>
                </div>
                
                <form onSubmit={handleSubmit(checkUser)} style={{ position: 'relative', zIndex: 1 }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#ff8c00'
                            }}>
                                <FaUser style={{ color: '#ff8c00' }} />
                            </span>
                            <input 
                                {...register("name", { required: true })} 
                                type="text" 
                                className="form-control" 
                                id="name"
                                placeholder="John Doe"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#ff8c00',
                                    boxShadow: 'none'
                                }}
                            />
                        </div>
                        {errors.name && <p className="text-danger mt-1">Name is required</p>}
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#ff8c00'
                            }}>
                                <FaEnvelope style={{ color: '#ff8c00' }} />
                            </span>
                            <input 
                                {...register("email", { required: true })} 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="john@example.com"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#ff8c00',
                                    boxShadow: 'none'
                                }}
                            />
                        </div>
                        {errors.email && <p className="text-danger mt-1">Email is required</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#ff8c00'
                            }}>
                                <FaPhone style={{ color: '#ff8c00' }} />
                            </span>
                            <input 
                                {...register("phone", { required: true })} 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                placeholder="+1234567890"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#ff8c00',
                                    boxShadow: 'none'
                                }}
                            />
                        </div>
                        {errors.phone && <p className="text-danger mt-1">Phone number is required</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#ff8c00'
                            }}>
                                <FaLock style={{ color: '#ff8c00' }} />
                            </span>
                            <input 
                                {...register("password", { required: true, minLength: 8 })}
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="At least 8 characters"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#ff8c00',
                                    boxShadow: 'none'
                                }}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-danger mt-1">
                                {errors.password.type === 'required' 
                                    ? 'Password is required' 
                                    : 'Password must be at least 8 characters'}
                            </p>
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="form-label fw-semibold">Confirm Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#ff8c00'
                            }}>
                                <FaLock style={{ color: '#ff8c00' }} />
                            </span>
                            <input 
                                {...register("confirmPassword", { required: true })}
                                type="password" 
                                className="form-control" 
                                id="confirm-password" 
                                placeholder="Re-enter your password"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#ff8c00',
                                    boxShadow: 'none'
                                }}
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-danger mt-1">Please confirm your password</p>}
                    </div>         
                    
                    <button 
                        type="submit" 
                        className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" 
                        style={{ 
                            backgroundColor: '#ff8c00', 
                            color: 'white',
                            borderRadius: '50px',
                            border: 'none',
                            boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)',
                            transition: 'all 0.3s ease',
                            fontSize: '1.1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: 1
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff6b00';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#ff8c00';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>Sign Up Now</span>
                        <FaArrowRight style={{ position: 'relative', zIndex: 2 }} />
                        <span style={{
                            position: 'absolute',
                            top: '-10px',
                            right: '-10px',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            zIndex: 0
                        }}></span>
                    </button>
                    
                    <div className="text-center mt-4">
                        <p className="text-muted small mb-0">
                            Already have an account? 
                            <Link 
                                to="/login" 
                                style={{ 
                                    color: '#ff8c00', 
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                    fontWeight: '600',
                                    textDecoration: 'none'
                                }}
                                className="hover-underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp