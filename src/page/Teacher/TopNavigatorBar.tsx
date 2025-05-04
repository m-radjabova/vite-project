import { Dropdown } from "react-bootstrap"
import { FaBell, FaChalkboardTeacher, FaCog, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa"
import useContextPro from "../../hooks/useContextPro";
import { useNavigate } from "react-router-dom";
interface Props {
    getInitials : (name: string) => string
}
function TopNavigatorBar( { getInitials } : Props ) {

    const { state: { user } } = useContextPro();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
  return (
    <div>
        <nav className="navbar navbar-expand navbar-light bg-white shadow-sm" style={{ height: '70px' }}>
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <FaChalkboardTeacher className="text-primary me-2" size={24} />
                <span className="navbar-brand fw-bold">Teacher Dashboard</span>
              </div>
              
              <div className="d-flex align-items-center mx-4" style={{ width: '400px' }}>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Search students, classes..." 
                  />
                </div>
              </div>
              
              <div className="d-flex align-items-center ms-auto">
                <button className="btn btn-light position-relative mx-2">
                  <FaBell size={18} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    3
                  </span>
                </button>
                
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-profile" 
                    className="d-flex align-items-center border-0 bg-transparent shadow-none"
                  >
                    <div className="position-relative me-2">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center" 
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)' 
                        }}
                      >
                        <span className="text-white fw-bold">{getInitials(user?.username || '')}</span>
                      </div>
                      <span className="position-absolute bottom-0 end-0 p-1 bg-success rounded-circle border border-2 border-white"></span>
                    </div>
                    <span className="d-none d-lg-inline fw-medium">{user?.username || 'Teacher'}</span>
                  </Dropdown.Toggle>
    
                  <Dropdown.Menu className="shadow border-0 mt-2">
                    <Dropdown.Item href="#profile" className="d-flex align-items-center">
                      <FaUser className="me-2 text-muted" /> 
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#settings" className="d-flex align-items-center">
                      <FaCog className="me-2 text-muted" /> 
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} href="#logout" className="d-flex align-items-center text-danger">
                      <FaSignOutAlt className="me-2" /> 
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </nav>
    </div>
  )
}

export default TopNavigatorBar