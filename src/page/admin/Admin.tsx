import { Link, Outlet } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { FaSignOutAlt, FaUser, FaBox, FaList, FaCalendarAlt, FaChevronDown, FaClipboard, FaCog, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { GiHotMeal } from "react-icons/gi";

function Admin() {
  const { state: { user }, dispatch } = useContextPro();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="admin-container d-flex" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fef6ee',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        minWidth: '280px',
        background: 'linear-gradient(180deg, #1e1e2e 0%, #13131a 100%)',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10,
        borderRight: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div>
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ 
              background: 'rgba(255,165,0,0.1)',
              borderLeft: '4px solid #ff8c00',
              transition: 'all 0.3s ease'
            }}>
              <GiHotMeal className="fs-4 me-3" style={{ 
                color: '#ff8c00',
                animation: 'pulse2 2s infinite'
              }} />
              <h1 className="sidebar-title fs-5 mb-0 text-white" style={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
                background: 'linear-gradient(90deg, #ff8c00, #ffaa00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Your Meal Admin</h1>
            </div>
          </Link>
          
          <hr className="bg-slate-600 opacity-10 my-3" />
          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="product"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                  color: isActive ? '#ffaa00' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid #ff8c00' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  padding: '12px 16px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    color: !isActive && '#fff'
                  }
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
                  backgroundColor: isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                  color: isActive ? '#ffaa00' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid #ff8c00' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  padding: '12px 16px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    color: !isActive && '#fff'
                  }
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
                to="orders"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                  color: isActive ? '#ffaa00' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid #ff8c00' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  padding: '12px 16px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    color: !isActive && '#fff'
                  }
                })}
              >
                <FaClipboard className="me-3" />
                <span>Orders</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => isActive ?
                  "active nav-link d-flex align-items-center rounded" :
                  "nav-link text-white-50 d-flex align-items-center rounded"}
                to="clients"
                style={({isActive}) => ({
                  backgroundColor: isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                  color: isActive ? '#ffaa00' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid #ff8c00' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  padding: '12px 16px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    color: !isActive && '#fff'
                  }
                })}
              >
                <FaUsers className="me-3" />
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
                  backgroundColor: isActive ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                  color: isActive ? '#ffaa00' : 'rgba(255,255,255,0.7)',
                  borderLeft: isActive ? '3px solid #ff8c00' : '3px solid transparent',
                  transition: 'all 0.3s ease',
                  padding: '12px 16px',
                  fontWeight: 500,
                  ':hover': {
                    backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    color: !isActive && '#fff'
                  }
                })}
              >
                <FaUser className="me-3" />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center p-3 rounded" style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.03)',
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,140,0,0.2) 0%, rgba(255,165,0,0.1) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff8c00',
              fontSize: 16,
              marginRight: 12,
              flexShrink: 0,
              border: '1px solid rgba(255,140,0,0.3)'
            }}>
              <FaUser />
            </div>
            <div className="overflow-hidden">
              <div className="text-white" style={{ 
                fontWeight: 600, 
                fontSize: 14,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}>
                {user?.username || 'Admin User'}
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
            className="btn w-100 d-flex align-items-center justify-content-center py-2 position-relative btn-logout"
            style={{
              background: 'linear-gradient(90deg, rgba(255,140,0,0.2) 0%, rgba(255,165,0,0.15) 100%)',
              color: '#ff8c00',
              border: '1px solid rgba(255,140,0,0.2)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.3s ease',
              gap: 8,
              overflow: 'hidden',
              zIndex: 1
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, #ff8c00 0%, #ffaa00 100%)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,140,0,0.2) 0%, rgba(255,165,0,0.15) 100%)';
            }}
          >
            <FaSignOutAlt style={{ fontSize: 14 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="content flex-grow-1" style={{ 
        backgroundColor: '#fef6ee',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div className="px-4 py-3 d-flex align-items-center justify-content-between" style={{
          background: 'rgba(254, 246, 238, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 5,
          borderBottom: '1px solid rgba(0,0,0,0.03)'
        }}>
          <h2 className="mb-0 fs-5 fw-semibold" style={{
            color: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <GiHotMeal style={{ 
              color: '#ff8c00',
              fontSize: '1.4em'
            }} />
            <span>Your Meal</span>
            <span style={{
              background: 'linear-gradient(90deg, #ff8c00, #ffaa00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>Dashboard</span>
          </h2>
          
          <div className="d-flex align-items-center gap-4">
            <button className="btn p-0 btn-setting" style={{
              color: '#6b7280',
              transition: 'all 0.3s ease'
            }}>
              <FaCog size={18} />
            </button>
            
            <div className="d-flex align-items-center" style={{
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: 500
            }}>
              <FaCalendarAlt className="me-2" />
              <span>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="link" className="d-flex align-items-center p-0 text-decoration-none admin-dropdown" >
                <div className="d-flex align-items-center gap-2">
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(255,140,0,0.2) 0%, rgba(255,165,0,0.1) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff8c00',
                    fontSize: 14,
                    border: '1px solid rgba(255,140,0,0.3)'
                  }}>
                    <FaUser />
                  </div>
                  <span className="small fw-medium" style={{ color: '#1a1a1a' }}>
                    {user?.username || 'Admin'}
                  </span>
                  <FaChevronDown size={12} style={{ color: '#9ca3af' }} />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0" style={{ 
                minWidth: '200px',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.05)',
                padding: '8px 0',
                marginTop: '10px'
              }}>
                <Dropdown.Item className="d-flex align-items-center gap-3 py-2 px-3 admin-drpdown-item" href="#" style={{
                  color: '#4b5563',
                  transition: 'all 0.2s ease',
                  borderRadius: '6px',
                  margin: '0 4px'
                }}>
                  <FaUser size={14} />
                  <NavLink to="/admin/profile" className="text-decoration-none">My Profile</NavLink>
                </Dropdown.Item>
                <Dropdown.Divider style={{ margin: '8px 0' }} />
                <Dropdown.Item 
                  className="d-flex align-items-center gap-3 py-2 px-3" 
                  onClick={handleLogout}
                  style={{
                    color: '#ef4444',
                    transition: 'all 0.2s ease',
                    borderRadius: '6px',
                    margin: '0 4px'
                  }}
                >
                  <FaSignOutAlt size={14} />
                  <span>Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="p-4" style={{ 
          minHeight: 'calc(100vh - 56px)',
          background: 'linear-gradient(135deg, rgba(255,236,219,0.4) 0%, rgba(255,248,240,0.2) 100%)'
        }}>
          <div className="rounded-lg p-4" style={{ 
            minHeight: 'calc(100vh - 120px)',
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.03)'
          }}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;