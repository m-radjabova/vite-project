import { FaHome, FaLeaf } from "react-icons/fa";
import { GiFlowerPot } from "react-icons/gi";
import { Link } from "react-router-dom";
import useContextPro from "../hooks/useContextPro";

function PageNotFound() {
  const {state: { user }} = useContextPro();
  
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center" 
        style={{ 
            backgroundColor: '#f8f9fa',
            background: 'linear-gradient(135deg, #f9f0ff 0%, #f0f9ff 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,230,240,0.3) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(230,255,240,0.3) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      
      <div className="container text-center py-5" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex justify-content-center mb-4">
              <GiFlowerPot className="mx-3" size={60} style={{ 
                color: '#8e44ad', 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                transition: 'transform 0.3s ease',
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.color = '#9b59b6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = '#8e44ad';
              }}
              />
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #e6e6e6, #f8f8f8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 15px',
                animation: 'rotate 8s linear infinite'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #d5d5d5, #f0f0f0)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}></div>
              </div>
              <GiFlowerPot className="mx-3" size={60} style={{ 
                color: '#8e44ad', 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                transition: 'transform 0.3s ease',
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.color = '#9b59b6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.color = '#8e44ad';
              }}
              />
            </div>
        
            <h1 className="display-1 fw-bold mb-3" style={{ 
              color: '#2c3e50',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '2px'
            }}>404</h1>
            
            <h2 className="h2 mb-4" style={{ 
              color: '#8e44ad',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              letterSpacing: '1px'
            }}>
              Цветок не найден
            </h2>
            
            <p className="lead mb-5" style={{ 
              color: '#7f8c8d',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Цветок, который вы ищете, уже распустился в другом месте.<br />
              Может быть, вы хотите посмотреть нашу прекрасную коллекцию?
            </p>
        
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link 
                to="/" 
                className="btn px-4 py-3 rounded-0" 
                style={{
                  backgroundColor: '#8e44ad',
                  color: 'white',
                  border: 'none',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#9b59b6';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#8e44ad';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <FaHome className="me-2" />
                На главную
              </Link>
              
              <Link 
                to="/products" 
                className="btn px-4 py-3 rounded-0" 
                style={{
                  backgroundColor: 'transparent',
                  color: '#8e44ad',
                  border: '1px solid #8e44ad',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Montserrat', sans-serif"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(142, 68, 173, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Наши цветы
              </Link>
              
              {user?.roles?.includes("ADMIN") && (
                <Link 
                  to="/admin" 
                  className="btn px-4 py-3 rounded-0" 
                  style={{
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    border: 'none',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#34495e';
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2c3e50';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <FaLeaf className="me-2" />
                  Админ панель
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated decorative elements */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '40px',
        background: 'linear-gradient(to right, transparent, rgba(142, 68, 173, 0.1), transparent)',
        opacity: 0.6
      }}></div>
      
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}

export default PageNotFound;