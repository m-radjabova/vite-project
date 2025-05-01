import { FaHome, FaSignOutAlt, FaChalkboardTeacher } from "react-icons/fa"
import { NavLink, Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import useContextPro from "../../hooks/useContextPro";

function Admin() {
  const {state: { user }, dispatch } = useContextPro();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="admin-layout" style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      <div className="top-navbar bg-white shadow-sm" style={{
        height: '70px',
        position: 'fixed',
        top: 0,
        right: 0,
        left: '280px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 2rem',
        borderBottom: '1px solid #eaeaea'
      }}>
        <div className="user-profile d-flex align-items-center">
          <div className="position-relative me-3">
            <div className="user-avatar rounded-circle overflow-hidden" 
              style={{ 
                width: '40px', 
                height: '40px',
                background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)'
              }}>
              <img 
                src="https://media.istockphoto.com/id/1382275304/photo/cheerful-caucasian-woman-checking-her-e-mails-on-her-laptop.jpg?s=2048x2048&w=is&k=20&c=0-WJa5pdqfiSfceETd4w3swl_ggZjRTglqWawpaTkks=" 
                alt="User" 
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <span className="online-status position-absolute bottom-0 end-0 p-1 bg-success rounded-circle border border-2 border-white"></span>
          </div>
          <div className="user-info me-3">
            <div className="fw-bold text-dark">{user?.username || 'Admin'}</div>
            <small className="text-muted">{user?.roles?.[0] || 'Administrator'}</small>
          </div>
          <button
            onClick={handleLogout} 
            className="logout-btn btn btn-sm d-flex align-items-center"
            style={{
              background: 'transparent',
              color: '#6c757d',
              border: '1px solid #eaeaea',
              borderRadius: '20px',
              padding: '0.25rem 0.75rem'
            }}
          >
            <FaSignOutAlt className="me-1" />
            <span>Logout</span>
          </button>
        </div>
      </div>


      <div className="sidebar bg-dark text-white" style={{ 
        width: '280px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        background: 'linear-gradient(180deg, #2b5876 0%, #4e4376 100%)',
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <Link to="/admin" className="text-decoration-none text-white mb-4 d-block">
          <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <FaHome className="fs-4 me-3" style={{ color: '#3a7bd5' }} />
            <h1 className="sidebar-title fs-5 mb-0 fw-bold">Admin Dashboard</h1>
          </div>
        </Link>
        
        <hr className="bg-light opacity-25 my-3" />
        
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink 
              className={({isActive}) => isActive 
                ? "active nav-link d-flex align-items-center py-3 px-3 rounded mb-2" 
                : "nav-link text-white-50 d-flex align-items-center py-3 px-3 rounded mb-2"} 
              to="add-teacher"
              style={({isActive}) => isActive ? {
                backgroundColor: 'rgba(58, 123, 213, 0.2)',
                borderLeft: '4px solid #3a7bd5',
                color: 'white'
              } : {}}
            >
              <FaChalkboardTeacher className="me-3 fs-5" />
              <span className="fw-medium">Manage Teachers</span>
            </NavLink>
          </li>

        </ul>
      </div>
      
      <div className="main-content" style={{ 
        marginLeft: '280px',
        paddingTop: '70px',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa'
      }}>
        <div className="content-container p-4" style={{ minHeight: 'calc(100vh - 70px)' }}>
          <div className="bg-white rounded-3 p-4 h-100" style={{
            boxShadow: '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)'
          }}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin