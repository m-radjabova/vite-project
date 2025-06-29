import { FaHome } from "react-icons/fa";
import { GiIceCreamCone, GiIceCreamScoop } from "react-icons/gi";
import { TbIceCream } from "react-icons/tb";
import { Link } from "react-router-dom";
import useContextPro from "../hooks/useContextPro";
import { FaUserShield } from "react-icons/fa"; 

function PageNotFound() {
  const {state: { user }} = useContextPro();
  
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center" 
        style={{ 
            backgroundColor: '#fff5f7',
            background: 'linear-gradient(to bottom, #fff5f7, #ffebee)'
        }}>
      <div className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Animated ice cream icons */}
            <div className="d-flex justify-content-center mb-4">
              <GiIceCreamCone className="mx-3" size={50} style={{ 
                color: '#ff85a2', 
                animation: 'melt 4s infinite ease-in-out',
                filter: 'drop-shadow(0 4px 8px rgba(255, 133, 162, 0.3))'
              }} />
              <GiIceCreamScoop className="mx-3" size={60} style={{ 
                color: '#ffb6c1', 
                animation: 'float 3s infinite ease-in-out 0.5s',
                filter: 'drop-shadow(0 4px 8px rgba(255, 182, 193, 0.3))'
              }} />
              <TbIceCream className="mx-3" size={50} style={{ 
                color: '#ff69b4', 
                animation: 'melt 4s infinite ease-in-out 1s',
                filter: 'drop-shadow(0 4px 8px rgba(255, 182, 193, 0.3))'
              }} />
            </div>
        
            <h1 className="display-1 fw-bold mb-3" style={{ 
              color: '#ff85a2',
              textShadow: '2px 2px 4px rgba(255, 133, 162, 0.2)',
              fontFamily: "'Comic Neue', cursive"
            }}>404</h1>
            
            <h2 className="h2 mb-4" style={{ 
              color: '#ff69b4',
              fontFamily: "'Comic Neue', cursive",
              fontWeight: 700
            }}>
              Oops! Sweet Nothing Here
            </h2>
            
            <p className="lead mb-5" style={{ 
              color: '#d3567e',
              fontSize: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              The page you're looking for has melted away!<br />
              Maybe you were searching for one of our delicious ice cream flavors?
            </p>
        
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/" className="btn px-4 py-3 rounded-pill" style={{
                backgroundColor: '#ff85a2',
                color: 'white',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(255, 133, 162, 0.4)',
                transition: 'all 0.3s ease',
                minWidth: '180px'
              }}>
                <FaHome className="me-2" />
                Return Home
              </Link>
              
              <Link to="/" className="btn px-4 py-3 rounded-pill" style={{
                backgroundColor: 'white',
                color: '#ff85a2',
                border: '2px solid #ff85a2',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(255, 133, 162, 0.2)',
                transition: 'all 0.3s ease',
                minWidth: '180px'
              }}>
                <GiIceCreamScoop className="me-2" />
                View Flavors
              </Link>
              {user?.roles?.includes("ADMIN") && (
                <Link to="/admin" className="btn px-4 py-3 rounded-pill" style={{
                  backgroundColor: '#6a1b9a',
                  color: 'white',
                  border: 'none',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(106, 27, 154, 0.4)',
                  transition: 'all 0.3s ease',
                  minWidth: '180px'
                }}>
                  <FaUserShield className="me-2" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Ice cream sprinkles decoration */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        width: '100%',
        height: '40px',
        backgroundImage: 'radial-gradient(#ffb6c1 2px, transparent 2px)',
        backgroundSize: '20px 20px',
        opacity: 0.6
      }}></div>
    </div>
  );
}

export default PageNotFound;