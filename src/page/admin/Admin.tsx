import { Link, Outlet } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { FaSignOutAlt, FaUser, FaHamburger, FaBox, FaList, FaUserFriends, FaBell, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function Admin() {
  const { state: { user }, dispatch } = useContextPro();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="admin-container d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div>
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ 
              background: 'rgba(255,255,255,0.05)',
              borderLeft: '4px solid #f97316'
            }}>
              <FaHamburger className="fs-4 me-3" style={{ color: '#f97316' }} />
              <h1 className="sidebar-title fs-5 mb-0 text-white" style={{ fontWeight: 600 }}>Your Meal Admin</h1>
            </div>
          </Link>
          
          <hr className="bg-slate-600 opacity-25 my-3" />

          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="product"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(253, 126, 20, 0.15)' : 'transparent',
                  color: isActive ? '#fd7e14' : 'inherit',
                  borderLeft: isActive ? '3px solid #fd7e14' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  padding: '12px 16px',
                  fontWeight: 500
                })}
              >
                <FaBox className="me-3" />
                <span>Products</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="categories"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(253, 126, 20, 0.15)' : 'transparent',
                  color: isActive ? '#fd7e14' : 'inherit',
                  borderLeft: isActive ? '3px solid #fd7e14' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  padding: '12px 16px',
                  fontWeight: 500
                })}
              >
                <FaList className="me-3" />
                <span>Categories</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="clients"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(253, 126, 20, 0.15)' : 'transparent',
                  color: isActive ? '#fd7e14' : 'inherit',
                  borderLeft: isActive ? '3px solid #fd7e14' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  padding: '12px 16px',
                  fontWeight: 500
                })}
              >
                <FaUserFriends className="me-3" />
                <span>Clients</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="profile"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(253, 126, 20, 0.15)' : 'transparent',
                  color: isActive ? '#fd7e14' : 'inherit',
                  borderLeft: isActive ? '3px solid #fd7e14' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  padding: '12px 16px',
                  fontWeight: 500
                })}
              >
                <FaUser className="me-3" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User & Logout */}
        <div className="mb-3">
          <div className="d-flex align-items-center p-3 rounded" style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.2s ease',
            marginBottom: '16px'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(249, 115, 22, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f97316',
              fontSize: 16,
              marginRight: 12,
              flexShrink: 0,
            }}>
              <FaUser />
            </div>
            <div className="overflow-hidden">
              <div className="text-white" style={{ 
                fontWeight: 500, 
                fontSize: 14,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}>
                {user?.username || 'Admin'}
              </div>
              <div style={{ 
                color: 'rgba(255,255,255,0.6)', 
                fontSize: 12,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}>
                Administrator
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="btn w-100 d-flex align-items-center justify-content-center py-2"
            style={{
              background: 'rgba(249, 115, 22, 0.1)',
              color: '#f97316',
              border: 'none',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 14,
              transition: 'all 0.2s ease',
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f97316';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(249, 115, 22, 0.1)';
              e.currentTarget.style.color = '#f97316';
            }}
          >
            <FaSignOutAlt style={{ fontSize: 14 }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="content flex-grow-1" style={{ 
        backgroundColor: '#f8fafc',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div className="bg-white px-4 py-3 d-flex align-items-center justify-content-between border-bottom" style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}>
          <h2 className="mb-0 fs-5 fw-semibold text-slate-800">Dashboard</h2>
          
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center text-slate-500">
              <FaCalendarAlt className="me-2" />
              <span className="small">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            <button className="btn btn-link position-relative p-0 text-slate-500">
              <FaBell size={16} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.5rem', padding: '0.15rem 0.25rem' }}>
                3
              </span>
            </button>

            <Dropdown>
              <Dropdown.Toggle variant="link" className="d-flex align-items-center p-0 text-decoration-none">
                <div className="d-flex align-items-center">
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f97316',
                    fontSize: 14,
                    marginRight: 8,
                  }}>
                    <FaUser />
                  </div>
                  <span className="small fw-medium text-slate-600 me-1">{user?.username || 'Admin'}</span>
                  <FaChevronDown size={12} className="text-slate-400" />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0" style={{ minWidth: '180px' }}>
                <Dropdown.Item className="d-flex align-items-center gap-2 py-2" href="#">
                  <FaUser size={14} className="text-slate-500" />
                  <NavLink to="/admin/profile" className="text-slate-600 text-decoration-none fw-medium text-truncate">Profile</NavLink>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item 
                  className="d-flex align-items-center gap-2 py-2 text-danger" 
                  onClick={handleLogout}
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="p-4" style={{ 
          minHeight: 'calc(100vh - 56px)',
        }}>
          <div className="bg-white rounded-lg p-4 shadow-xs border" style={{ 
            minHeight: 'calc(100vh - 120px)'
          }}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;