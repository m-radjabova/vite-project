import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import apiClient from '../../apiClient/ApiClient';
import { User } from '../../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useContextPro from '../../hooks/useContextPro';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContextPro();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    apiClient.get<User[]>('/users?email=' + data.email).then(res => {
      if(res.data.length > 0) {
        const user = res.data[0];
        if(user.password === data.password) {
          toast.success('Login successful');
          reset();
          localStorage.setItem("token", String(user.id));
          
          apiClient.get<User>("/users/" + user.id).then(res => {
            dispatch({ type: "SET_USER", payload: res.data });
            navigate('/admin');
          });
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        toast.error('User not found');
      }
    });
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ 
        backgroundImage: 'linear-gradient(to bottom right, #e3f2fd, #f8f9fa)'
      }}
    >
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: '450px',
          border: 'none',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }} 
        className="p-4"
      >
        <div className="text-center mb-4">
          <div 
            className="mx-auto mb-3" 
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FaLock size={30} color="#1976d2" />
          </div>
          <h4 className="mt-3" style={{ color: '#1976d2', fontWeight: '600' }}>Кириш</h4>
          <p className="text-muted">Илтимос, логин ва паролни киритинг</p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '500', color: '#495057' }}>
              <FaUser className="me-2" />
              Email
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type="email"
                placeholder="Email киритинг"
                {...register('email', { 
                  required: 'Email керак',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Туғри email киритинг'
                  }
                })}
                isInvalid={!!errors.email}
                style={{
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderRadius: '0',
                  borderBottom: '2px solid #ced4da',
                  paddingLeft: '40px'
                }}
              />
              <div 
                className="input-group-prepend" 
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  zIndex: '10'
                }}
              >
                <FaUser color="#adb5bd" />
              </div>
            </div>
            <Form.Control.Feedback type="invalid" className="d-flex align-items-center">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ fontWeight: '500', color: '#495057' }}>
              <FaLock className="me-2" />
              Пароль
            </Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Паролни киритинг"
                {...register('password', { 
                  required: 'Парол керак',
                  minLength: {
                    value: 6,
                    message: 'Парол камида 6 та белгидан иборат бўлиши керак'
                  }
                })}
                isInvalid={!!errors.password}
                style={{
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderTop: 'none',
                  borderRadius: '0',
                  borderBottom: '2px solid #ced4da',
                  paddingLeft: '40px'
                }}
              />
              <div 
                className="input-group-prepend" 
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  zIndex: '10'
                }}
              >
                <FaLock color="#adb5bd" />
              </div>
              <Button
                variant="link"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '5px',
                  zIndex: '10',
                  color: '#adb5bd'
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </div>
            {errors.password && (
              <div className="text-danger small mt-1 d-flex align-items-center">
                {errors.password.message}
              </div>
            )}
          </Form.Group>

          <Row className="mb-4">
            <Col>
              <Form.Check
                type="switch"
                id="rememberSwitch"
                label="Эслаб қолиш"
                {...register('remember')}
                style={{ color: '#495057' }}
              />
            </Col>
            <Col className="text-end">
              <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
                Паролни унутдингизми?
              </a>
            </Col>
          </Row>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-100 py-2"
            style={{
              backgroundColor: '#1976d2',
              border: 'none',
              borderRadius: '25px',
              fontWeight: '600',
              fontSize: '1.1rem'
            }}
          >
            <FaSignInAlt className="me-2" />
            Кириш
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;