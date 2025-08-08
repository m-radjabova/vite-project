import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import apiClient from '../../apiClient/ApiClient';
import { toast } from 'react-toastify';
import { User } from '../../App';
import { GiFlowerPot } from 'react-icons/gi';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const Login = (data: FieldValues) => {
    apiClient.get<User[]>(`/users?email=${data.email}`).then((res) => {
      if (res.data.length > 0) {
        const user = res.data[0];
        if(res.data[0].password === data.password){
          toast.success("Добро пожаловать!");
          localStorage.setItem("token", user.id);
          navigate("/admin");
        }else{
          toast.error("упс, что-то пошло не так");
        }
      } else{
        toast.error("Account not found. Please sign up!");
      }
    });
  };

  return (
    <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ 
      backgroundColor: '#f8f9fa',
      backgroundImage: 'linear-gradient(135deg, #f9f0ff 0%, #f0f9ff 100%)'
    }}>
      <div className="login-form bg-white p-4 p-md-5 rounded-4" style={{ 
        width: '95%', 
        maxWidth: '450px',
        border: '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(5px)',
        background: 'rgba(255, 255, 255, 0.9)'
      }}>
        {/* Декоративные элементы */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,230,240,0.3) 0%, rgba(255,230,240,0) 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
        
        <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <GiFlowerPot className="mb-3" style={{ 
              fontSize: '3.5rem', 
              color: '#8e44ad',
              filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.05))'
            }} />
          </div>
          <h1 className="fw-bold mb-2" style={{ 
            color: '#2c3e50',
            fontSize: '1.8rem',
            letterSpacing: '0.5px',
            fontFamily: "'Playfair Display', serif"
          }}>Цветочная Лавка</h1>
          <p className="text-muted" style={{ color: '#7f8c8d', fontSize: '0.95rem' }}>Войдите в свой цветочный аккаунт</p>
        </div>

        <form onSubmit={handleSubmit(Login)} style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label" style={{ 
              color: '#34495e',
              fontSize: '0.9rem',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>Email адрес</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: '#e0e0e0',
                color: '#8e44ad'
              }}>
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ваш@email.com"
                {...register('email', { required: true })}
                style={{ 
                  borderLeft: 'none',
                  borderColor: '#e0e0e0',
                  boxShadow: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  padding: '0.75rem',
                  borderRadius: '0 0.375rem 0.375rem 0'
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label" style={{ 
              color: '#34495e',
              fontSize: '0.9rem',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>Пароль</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: '#e0e0e0',
                color: '#8e44ad'
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
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                  padding: '0.75rem',
                  borderRadius: '0 0.375rem 0.375rem 0'
                }}
              />
            </div>
            <div className="text-end mt-2">
              <NavLink 
                to="/forgot-password" 
                style={{ 
                  color: '#7f8c8d', 
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#8e44ad';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#7f8c8d';
                }}
              >
                Забыли пароль?
              </NavLink>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            style={{ 
              backgroundColor: '#8e44ad', 
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(142, 68, 173, 0.3)',
              transition: 'all 0.3s ease',
              fontSize: '1rem',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              letterSpacing: '0.5px',
              fontFamily: "'Montserrat', sans-serif"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#9b59b6';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#8e44ad';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Войти</span>
            <FaArrowRight style={{ position: 'relative', zIndex: 2 }} />
            <span style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
              transform: 'rotate(45deg)',
              transition: 'all 0.5s ease',
              zIndex: 1
            }} className="btn-shine"></span>
          </button>

          <div className="text-center mt-4">
            <p className="small mb-0" style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
              Нет аккаунта?{' '}
              <NavLink 
                to="/sign-up" 
                style={{ 
                  color: '#8e44ad', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#9b59b6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#8e44ad';
                }}
              >
                Зарегистрироваться
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
          background: 'radial-gradient(circle, rgba(230,255,240,0.2) 0%, rgba(230,255,240,0) 70%)',
          zIndex: 0,
          borderRadius: '50%'
        }}></div>
      </div>
    </div>
  );
};

export default LoginForm;