import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import { User } from '../../App';
import { GiIceCreamCone } from 'react-icons/gi';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const Login = (data: FieldValues) => {
    apiClient.get<User[]>(`/users?email=${data.email}`).then((res) => {
      if (res.data.length > 0) {
        const user = res.data[0];
        if(res.data[0].password === data.password){
          toast.success("Welcome back! ");
          localStorage.setItem("token", user.id);
          navigate("/admin");
        }else{
          toast.error("Oops! Wrong password");
        }
      } else{
        toast.error("Account not found. Please sign up!");
      }
    });
  };

  return (
    <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ 
      backgroundColor: '#fff5f7',
      backgroundImage: 'linear-gradient(rgba(255,182,193,0.05), rgba(255,192,203,0.05))'
    }}>
      <div className="login-form bg-white p-4 p-md-5 rounded-4 shadow" style={{ 
        width: '95%', 
        maxWidth: '450px',
        border: '1px solid rgba(255, 182, 193, 0.3)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(255, 182, 193, 0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        
        <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
          <GiIceCreamCone className="mb-3" style={{ 
            fontSize: '3rem', 
            color: '#ff85a2',
            filter: 'drop-shadow(0 2px 4px rgba(255,133,162,0.3))'
          }} />
          <h1 className="fw-bold" style={{ 
            color: '#ff85a2',
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
          }}>Sweet Treats</h1>
          <p className="text-muted" style={{ color: '#888' }}>Sign in to your ice cream paradise</p>
        </div>

        <form onSubmit={handleSubmit(Login)} style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#ff85a2' }}>Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: '#ffb6c1',
                color: '#ff85a2'
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
                  borderColor: '#ffb6c1',
                  boxShadow: 'none',
                  backgroundColor: '#fff9fa'
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#ff85a2' }}>Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: '#ffb6c1',
                color: '#ff85a2'
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
                  borderColor: '#ffb6c1',
                  boxShadow: 'none',
                  backgroundColor: '#fff9fa'
                }}
              />
            </div>
            <div className="text-end mt-2">
              <NavLink 
                to="/forgot-password" 
                style={{ 
                  color: '#ff85a2', 
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}
              >
                Forgot password?
              </NavLink>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            style={{ 
              backgroundColor: '#ff85a2', 
              color: 'white',
              borderRadius: '50px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(255, 133, 162, 0.3)',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#ff6b8b';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 133, 162, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#ff85a2';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 133, 162, 0.3)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Sweet Sign In</span>
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
            <p className="small mb-0" style={{ color: '#888' }}>
              Don't have an account?{' '}
              <NavLink 
                to="/sign-up" 
                style={{ 
                  color: '#ff85a2', 
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Create one
              </NavLink>
            </p>
          </div>
        </form>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '100px',
          height: '100px',
          backgroundColor: 'rgba(255, 182, 193, 0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
      </div>
    </div>
  );
};

export default LoginForm;