import { FaHamburger, FaHome } from 'react-icons/fa';
import { GiFrenchFries } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center" 
         style={{ backgroundColor: '#fff8f0' }}>
      <div className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Animated food icons */}
            <div className="d-flex justify-content-center mb-4">
              <FaHamburger className="text-warning mx-2" size={40} style={{ animation: 'bounce 2s infinite' }} />
              <GiFrenchFries className="text-warning mx-2" size={40} style={{ animation: 'bounce 2s infinite 0.2s' }} />
              <BiDrink className="text-warning mx-2" size={40} style={{ animation: 'bounce 2s infinite 0.4s' }} />
            </div>
            
            {/* Main message */}
            <h1 className="display-1 fw-bold text-warning mb-3">404</h1>
            <h2 className="h3 mb-4" style={{ color: '#e67e22' }}>Oops! Page Not Found</h2>
            <p className="lead mb-5" style={{ color: '#d35400' }}>
              The page you're looking for doesn't exist or has been moved. 
              Maybe you were searching for one of our delicious menu items?
            </p>
        
            
            {/* Action buttons */}
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="btn btn-warning px-4 py-2">
                <FaHome className="me-2" />
                Return Home
              </Link>
              <Link to="/" className="btn btn-outline-warning px-4 py-2">
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .btn-warning {
            background-color: #e67e22;
            border-color: #e67e22;
            color: white;
          }
          .btn-warning:hover {
            background-color: #d35400;
            border-color: #d35400;
          }
          .btn-outline-warning {
            color: #e67e22;
            border-color: #e67e22;
          }
          .btn-outline-warning:hover {
            background-color: #e67e22;
            color: white;
          }
        `}
      </style>
    </div>
  );
}

export default PageNotFound;