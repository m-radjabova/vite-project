import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import { User } from '../../App';
import { GiDelicatePerfume } from 'react-icons/gi';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const Login = (data: FieldValues) => {
    apiClient.get<User[]>(`/users?email=${data.email}`).then((res) => {
      if (res.data.length > 0) {
        const user = res.data[0];
        if(res.data[0].password === data.password){
          toast.success("Welcome back!");
          localStorage.setItem("token", user.id);
          navigate("/admin");
        }else{
          toast.error("Incorrect password");
        }
      } else{
        toast.error("Account not found. Please sign up!");
      }
    });
  };

  return (
    <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ 
      backgroundColor: '#fafafa',
      backgroundImage: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'
    }}>
      <div className="login-form bg-white p-4 p-md-5 rounded-4" style={{ 
        width: '95%', 
        maxWidth: '450px',
        border: '1px solid #eaeaea',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
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
        
        <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <GiDelicatePerfume className="mb-3" style={{ 
              fontSize: '3.5rem', 
              color: '#333',
              filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.05))'
            }} />
          </motion.div>
          <h1 className="fw-bold mb-2" style={{ 
            color: '#222',
            fontSize: '1.8rem',
            letterSpacing: '0.5px'
          }}>Soling Cosmetics</h1>
          <p className="text-muted" style={{ color: '#777', fontSize: '0.95rem' }}>Sign in to your beauty account</p>
        </div>

        <form onSubmit={handleSubmit(Login)} style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-4">
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
                type="email"
                className="form-control"
                id="email"
                placeholder="your@email.com"
                {...register('email', { required: true })}
                style={{ 
                  borderLeft: 'none',
                  borderColor: '#e0e0e0',
                  boxShadow: 'none',
                  backgroundColor: '#fcfcfc',
                  color: '#333',
                  fontSize: '0.9rem',
                  padding: '0.75rem'
                }}
              />
            </div>
          </div>

          <div className="mb-4">
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
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                {...register('password', { required: true })}
                style={{ 
                  borderLeft: 'none',
                  borderColor: '#e0e0e0',
                  boxShadow: 'none',
                  backgroundColor: '#fcfcfc',
                  color: '#333',
                  fontSize: '0.9rem',
                  padding: '0.75rem'
                }}
              />
            </div>
            <div className="text-end mt-2">
              <NavLink 
                to="/forgot-password" 
                style={{ 
                  color: '#666', 
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#333';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#666';
                }}
              >
                Forgot password?
              </NavLink>
            </div>
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
            <span style={{ position: 'relative', zIndex: 2 }}>Sign In</span>
            <FaArrowRight style={{ position: 'relative', zIndex: 2 }} />
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
            <p className="small mb-0" style={{ color: '#777', fontSize: '0.85rem' }}>
              Don't have an account?{' '}
              <NavLink 
                to="/sign-up" 
                style={{ 
                  color: '#333', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#333';
                }}
              >
                Create account
              </NavLink>
            </p>
          </div>
        </form>
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(230,230,230,0.2) 0%, rgba(230,230,230,0) 70%)',
          zIndex: 0
        }}></div>
      </div>
    </div>
  );
};

export default LoginForm;