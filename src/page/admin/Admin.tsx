import { Link, Outlet } from "react-router-dom"
import useContextPro from "../../hooks/useContextPro"
import { FaSignOutAlt, FaUser, FaHamburger, FaBox, FaList, FaUserFriends } from "react-icons/fa"
import { NavLink } from "react-router-dom";

function Admin() {
  const { state: { user }, dispatch } = useContextPro()

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="admin-container d-flex" style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div>
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ 
              background: 'rgba(255,255,255,0.05)',
              borderLeft: '4px solid #fd7e14'
            }}>
              <FaHamburger className="fs-4 me-3" style={{ color: '#fd7e14' }} />
              <h1 className="sidebar-title fs-5 mb-0 text-white" style={{ fontWeight: 600 }}>Your Meal Admin</h1>
            </div>
          </Link>
          
          <hr className="bg-secondary opacity-25 my-3" />

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
              background: 'rgba(253, 126, 20, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fd7e14',
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
              background: 'rgba(253, 126, 20, 0.1)',
              color: '#fd7e14',
              border: 'none',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 14,
              transition: 'all 0.2s ease',
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fd7e14';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(253, 126, 20, 0.1)';
              e.currentTarget.style.color = '#fd7e14';
            }}
          >
            <FaSignOutAlt style={{ fontSize: 14 }} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="content flex-grow-1" style={{ 
        backgroundColor: '#f5f7fa',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div className="bg-white px-4 py-3 d-flex align-items-center justify-content-between" style={{
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 5,
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <h2 className="mb-0 fs-5 fw-semibold text-dark">Dashboard</h2>
          <div className="text-muted small">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
        
        <div className="p-4" style={{ 
          minHeight: 'calc(100vh - 56px)',
        }}>
          <div className="bg-white rounded-3 p-4" style={{ 
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.05)',
            minHeight: 'calc(100vh - 120px)'
          }}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin