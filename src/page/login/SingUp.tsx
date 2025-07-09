import { FaEnvelope, FaLock, FaUser, FaPhone, FaLeaf } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../../apiClient/ApiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiFlowerPot } from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid';

function SignUp() {
    const {register, handleSubmit, formState: { errors }, reset, watch} = useForm();
    const navigate = useNavigate();

    const checkUser = async (data: FieldValues) => {
        apiClient.get(`/users?email=${data.email}`).then((res) => {
            if (res.data.length > 0) {
                toast.error("Пользователь с таким email уже существует");
            } else {
                regiterUser(data);
            }
        });
    };

    const regiterUser = async (data: FieldValues) => {
        apiClient.post("/users", {...data, id: uuidv4(), roles: ["USER"]}).then((res) => {
            console.log(res);
            navigate("/login");
            toast.success("Аккаунт успешно создан!");
            reset();
        }).catch((err) => {
            toast.error("Ошибка при регистрации");
            console.log(err);
        });
    };

    return (
        <div className="signup d-flex justify-content-center align-items-center min-vh-100" style={{ 
            backgroundColor: '#f8f9fa',
            backgroundImage: 'linear-gradient(135deg, #f9f0ff 0%, #f0f9ff 100%)'
        }}>
            <div className="signup-form bg-white p-4 p-md-5 rounded-4" style={{ 
                width: '95%', 
                maxWidth: '500px', 
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.03)',
                backdropFilter: 'blur(5px)',
                background: 'rgba(255, 255, 255, 0.9)'
            }}>
                {/* Decorative flower elements */}
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
                
                <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
                    <div>
                        <GiFlowerPot className="mb-3" style={{ 
                            fontSize: '3.5rem', 
                            color: '#8e44ad',
                            filter: 'drop-shadow(0 3px 5px rgba(0, 0, 0, 0.05))'
                        }} />
                    </div>
                    <h2 className="fw-bold mb-2" style={{ 
                        color: '#2c3e50',
                        fontSize: '1.8rem',
                        letterSpacing: '0.5px',
                        fontFamily: "'Playfair Display', serif"
                    }}>Цветочная Лавка</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>Создайте свой цветочный аккаунт</p>
                </div>
                
                <form onSubmit={handleSubmit(checkUser)} style={{ position: 'relative', zIndex: 1 }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ 
                            color: '#34495e',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Полное имя</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#8e44ad'
                            }}>
                                <FaUser />
                            </span>
                            <input 
                                {...register("username", { required: true })} 
                                type="text" 
                                className="form-control" 
                                id="username"
                                placeholder="Введите ваше имя"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#2c3e50',
                                    borderRadius: '0 0.375rem 0.375rem 0'
                                }}
                            />
                        </div>
                        {errors.username && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>Имя обязательно</p>}
                    </div>
                    
                    <div className="mb-3">
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
                                {...register("email", { 
                                    required: true,
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Неверный email адрес"
                                    }
                                })} 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="ваш@email.com"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#2c3e50',
                                    borderRadius: '0 0.375rem 0.375rem 0'
                                }}
                            />
                        </div>
                        {errors.email && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {errors.email.type === 'required' ? 'Email обязателен' : 'Неверный email адрес'}
                        </p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label" style={{ 
                            color: '#34495e',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Номер телефона</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#8e44ad'
                            }}>
                                <FaPhone />
                            </span>
                            <input 
                                {...register("phone", { 
                                    required: true,
                                })} 
                                type="tel" 
                                className="form-control" 
                                id="phone" 
                                placeholder="+71234567890"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#2c3e50',
                                    borderRadius: '0 0.375rem 0.375rem 0'
                                }}
                            />
                        </div>
                        {errors.phone && <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {errors.phone.type === 'required' ? 'Телефон обязателен' : 'Неверный номер телефона'}
                        </p>}
                    </div>

                    <div className="mb-3">
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
                                {...register("password", { 
                                    required: true, 
                                    minLength: 8,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                        message: "Должен содержать заглавные, строчные буквы и цифры"
                                    }
                                })}
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Минимум 8 символов"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#2c3e50',
                                    borderRadius: '0 0.375rem 0.375rem 0'
                                }}
                            />
                        </div>
                        {errors.password && (
                            <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                                {errors.password.type === 'required' 
                                    ? 'Пароль обязателен' 
                                    : errors.password.type === 'minLength'
                                        ? 'Пароль должен быть минимум 8 символов'
                                        : 'Должен содержать заглавные, строчные буквы и цифры'}
                            </p>
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="confirm-password" className="form-label" style={{ 
                            color: '#34495e',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            letterSpacing: '0.3px'
                        }}>Подтвердите пароль</label>
                        <div className="input-group">
                            <span className="input-group-text bg-white" style={{ 
                                borderRight: 'none',
                                borderColor: '#e0e0e0',
                                color: '#8e44ad'
                            }}>
                                <FaLock />
                            </span>
                            <input 
                                {...register("confirmPassword", { 
                                    required: true,
                                    validate: value => value === watch('password') || "Пароли не совпадают"
                                })}
                                type="password" 
                                className="form-control" 
                                id="confirm-password" 
                                placeholder="Повторите пароль"
                                style={{
                                    borderLeft: 'none',
                                    borderColor: '#e0e0e0',
                                    boxShadow: 'none',
                                    fontSize: '0.9rem',
                                    padding: '0.75rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#2c3e50',
                                    borderRadius: '0 0.375rem 0.375rem 0'
                                }}
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                                {'Подтвердите пароль'}
                            </p>
                        )}
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
                        <span style={{ position: 'relative', zIndex: 2 }}>Создать аккаунт</span>
                        <FaLeaf style={{ position: 'relative', zIndex: 2 }} />
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
                        <p className="text-muted small mb-0" style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                            Уже есть аккаунт? 
                            <Link 
                                to="/login" 
                                style={{ 
                                    color: '#8e44ad', 
                                    cursor: 'pointer',
                                    marginLeft: '5px',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    letterSpacing: '0.3px',
                                    fontFamily: "'Montserrat', sans-serif"
                                }}
                                className="hover-underline"
                                onMouseOver={(e) => {
                                    e.currentTarget.style.color = '#9b59b6';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.color = '#8e44ad';
                                }}
                            >
                                Войти
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;