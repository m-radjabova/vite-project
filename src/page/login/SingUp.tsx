import { FaEnvelope, FaLock, FaUser, FaPhone, FaRegSmile } from "react-icons/fa"
import { FieldValues, useForm } from "react-hook-form"
import apiClient from "../../apiClient/ApiClient"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { GiDelicatePerfume } from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid';
import { motion } from "framer-motion"

function SignUp() {
    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm()
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
        apiClient.post("/users", {...data, id: uuidv4(), roles: ["USER"]}).then((res) => {
            console.log(res)
            navigate("/login")
            toast.success("Account created successfully!")
            reset()
        }).catch((err) => {
            toast.error("Error registering user")
            console.log(err)
        })
    }

    return (
        <div className="signup d-flex justify-content-center align-items-center min-vh-100" style={{ 
            backgroundColor: '#fafafa',
            backgroundImage: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)'
        }}>
            <div className="signup-form bg-white p-4 p-md-5 rounded-4" style={{ 
                width: '95%', 
                maxWidth: '500px', 
                border: '1px solid #eaeaea',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.03)'
            }}>
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: '-100px',
                    right: '-100px',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(240,240,240,0.3) 0%, rgba(240,240,240,0) 70%)',
                    zIndex: 0
                }}></div>
                
                <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '-50px',
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(230,230,230,0.2) 0%, rgba(230,230,230,0) 70%)',
                    zIndex: 0
                }}></div>
                
                <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ scale: 0.9, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                        <GiDelicatePerfume className="mb-3" style={{ 
                            fontSize: '3.5rem', 
                            color: '#333',
                            filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.05))'
                        }} />
                    </motion.div>
                    <h2 className="fw-bold mb-2" style={{ 
                        color: '#222',
                        fontSize: '1.8rem',
                        letterSpacing: '0.5px'
                    }}>Soling Cosmetics</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem', color: '#777' }}>Create your beauty account</p>
                </div>
                
                <form onSubmit={handleSubmit(checkUser)} style={{ position: 'relative', zIndex: 1 }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ 
                            color: '#444',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Full Name</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#666'
                            }}>
                                <FaUser />
                            </span>
                            <input 
                                {...register("username", { required: true })} 
                                type="text" 
                                className="form-control" 
                                id="username"
                                placeholder="Enter your full name"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#fcfcfc',
                                    color: '#333'
                                }}
                            />
                        </div>
                        {errors.username && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>Name is required</p>}
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ 
                            color: '#444',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#666'
                            }}>
                                <FaEnvelope />
                            </span>
                            <input 
                                {...register("email", { 
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })} 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="your@email.com"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#fcfcfc',
                                    color: '#333'
                                }}
                            />
                        </div>
                        {errors.email && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {errors.email.type === 'required' ? 'Email is required' : 'Invalid email address'}
                        </p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label" style={{ 
                            color: '#444',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Phone Number</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#666'
                            }}>
                                <FaPhone />
                            </span>
                            <input 
                                {...register("phone", { 
                                    required: true,
                                    pattern: {
                                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                                        message: "Invalid phone number"
                                    }
                                })} 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                placeholder="+1234567890"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#fcfcfc',
                                    color: '#333'
                                }}
                            />
                        </div>
                        {errors.phone && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {errors.phone.type === 'required' ? 'Phone is required' : 'Invalid phone number'}
                        </p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ 
                            color: '#444',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#666'
                            }}>
                                <FaLock />
                            </span>
                            <input 
                                {...register("password", { 
                                    required: true, 
                                    minLength: 8,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: "Must contain uppercase, lowercase, and number"
                                    }
                                })}
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="At least 8 characters"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#fcfcfc',
                                    color: '#333'
                                }}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                                {errors.password.type === 'required' 
                                    ? 'Password is required' 
                                    : errors.password.type === 'minLength'
                                        ? 'Password must be at least 8 characters'
                                        : 'Must include uppercase, lowercase, and number'}
                            </p>
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="form-label" style={{ 
                            color: '#444',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Confirm Password</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#666'
                            }}>
                                <FaLock />
                            </span>
                            <input 
                                {...register("confirmPassword", { 
                                    required: true,
                                    validate: value => value === watch('password') || "Passwords don't match"
                                })}
                                type="password" 
                                className="form-control" 
                                id="confirm-password" 
                                placeholder="Re-enter your password"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: '#fcfcfc',
                                    color: '#333'
                                }}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                                {errors.confirmPassword.type === 'required' || 'Please confirm your password'}
                            </p>
                        )}
                    </div>         
                    
                    <motion.button 
                        whileHover={{ scale: 1.02, backgroundColor: '#222' }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2" 
                        style={{ 
                            backgroundColor: '#333', 
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            fontSize: '1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: 1,
                            letterSpacing: '0.5px'
                        }}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>Create Account</span>
                        <FaRegSmile style={{ position: 'relative', zIndex: 2 }} />
                        <span style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
                            transform: 'rotate(45deg)',
                            transition: 'all 0.5s ease',
                            zIndex: 1
                        }} className="btn-shine"></span>
                    </motion.button>
                    
                    <div className="text-center mt-4">
                        <p className="text-muted small mb-0" style={{ fontSize: '0.85rem', color: '#777' }}>
                            Already have an account? 
                            <Link 
                                to="/login" 
                                style={{ 
                                    color: '#333', 
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    letterSpacing: '0.3px'
                                }}
                                className="hover-underline"
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = '#000';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = '#333';
                                }}
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp