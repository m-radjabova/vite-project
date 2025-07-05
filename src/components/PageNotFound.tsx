import { FaHome, FaUserShield } from "react-icons/fa";
import { GiPerfumeBottle } from "react-icons/gi";
import { Link } from "react-router-dom";
import useContextPro from "../hooks/useContextPro";
import { motion } from "framer-motion";

function PageNotFound() {
  const {state: { user }} = useContextPro();
  
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center" 
        style={{ 
            backgroundColor: '#fafafa',
            background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)'
        }}>
      <div className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
              className="d-flex justify-content-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GiPerfumeBottle className="mx-3" size={60} style={{ 
                color: '#333', 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }} />
              <motion.div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #e6e6e6, #f8f8f8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 15px'
                }}
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #d5d5d5, #f0f0f0)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}></div>
              </motion.div>
              <GiPerfumeBottle className="mx-3" size={60} style={{ 
                color: '#555', 
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }} />
            </motion.div>
        
            <h1 className="display-1 fw-bold mb-3" style={{ 
              color: '#333',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '2px'
            }}>404</h1>
            
            <h2 className="h2 mb-4" style={{ 
              color: '#555',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              letterSpacing: '1px'
            }}>
              Scent Not Found
            </h2>
            
            <p className="lead mb-5" style={{ 
              color: '#777',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              The fragrance you're seeking has evaporated.<br />
              Perhaps you'd like to explore our exquisite collection instead?
            </p>
        
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/" className="btn px-4 py-3 rounded-0" style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaHome className="me-2" />
                  Return Home
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/products" className="btn px-4 py-3 rounded-0" style={{
                  backgroundColor: 'transparent',
                  color: '#333',
                  border: '1px solid #333',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  minWidth: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  Explore Fragrances
                </Link>
              </motion.div>
              
              {user?.roles?.includes("ADMIN") && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link to="/admin" className="btn px-4 py-3 rounded-0" style={{
                    backgroundColor: '#222',
                    color: 'white',
                    border: 'none',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    minWidth: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaUserShield className="me-2" />
                    Admin Panel
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '40px',
        background: 'linear-gradient(to right, transparent, #eee, transparent)',
        opacity: 0.6
      }}></div>
      
      <motion.div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
          zIndex: 0
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)',
          zIndex: 0
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
}

export default PageNotFound;