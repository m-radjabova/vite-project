import { Link, Outlet } from "react-router-dom"
import useContextPro from "../../hooks/useContextPro"
import {FaSignOutAlt, FaUser, FaHamburger} from "react-icons/fa"
import { NavLink } from "react-router-dom";

function Admin() {
  const { state: { user }, dispatch } = useContextPro()

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="admin-container d-flex" style={{ minHeight: '100vh' }}>

      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #343a40 0%, #2b3035 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Link to="/" className="text-decoration-none">
          <div className="d-flex align-items-center mb-4 p-2 rounded" style={{ background: 'rgba(253, 126, 20, 0.1)' }}>
            <FaHamburger className="fs-4 me-2" style={{ color: '#fd7e14' }} />
            <h1 className="sidebar-title fs-5 mb-0 text-white">Your Meal Admin</h1>
          </div>
        </Link>
        <hr className="bg-secondary my-4" />

        <ul className="nav nav-pills flex-column">
          <li className="nav-item mb-2">
            <NavLink
              className={({ isActive }) => isActive ?
                "active nav-link d-flex align-items-center rounded-pill" :
                "nav-link text-white d-flex align-items-center rounded-pill"}
              to="product"
              style={({isActive}) => isActive ? {
                backgroundColor: '#fd7e14',
                color: 'white'
              } : {}}
            >
              <FaHamburger className="me-3" />
              <span>Products</span>
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink
              className={({ isActive }) => isActive ?
                "active nav-link d-flex align-items-center rounded-pill" :
                "nav-link text-white d-flex align-items-center rounded-pill"}
              to="categories"
              style={({isActive}) => isActive ? {
                backgroundColor: '#fd7e14',
                color: 'white'
              } : {}}
            >
              <FaHamburger className="me-3" />
              <span>Categories</span>
            </NavLink>
          </li>
        </ul>

        <div style={{ width: '100%', marginTop: 'auto' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '12px 16px',
            marginBottom: 16,
          }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(253, 126, 20, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fd7e14',
              fontSize: 24,
              flexShrink: 0,
            }}>
              <FaUser />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: 17 }}>
                {user?.username || 'Admin'}
              </div>
              <div style={{ color: '#bbb', fontSize: 13 }}>
                Administrator
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '100%',
              background: 'rgba(253, 126, 20, 0.08)',
              color: '#fd7e14',
              border: '1px solid #fd7e1440',
              borderRadius: 24,
              fontWeight: 500,
              fontSize: 17,
              padding: '10px 0',
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fd7e14';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#fd7e14';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(253, 126, 20, 0.08)';
              e.currentTarget.style.color = '#fd7e14';
              e.currentTarget.style.borderColor = '#fd7e1440';
            }}
          >
            <FaSignOutAlt style={{ fontSize: 20 }} />
            Logout
          </button>
        </div>
      </div>
      
      <div className="content flex-grow-1 p-4" style={{ 
        backgroundColor: '#f8f9fa',
        backgroundImage: 'linear-gradient(to bottom, rgba(253, 126, 20, 0.03), rgba(253, 126, 20, 0.01))'
      }}>
        <div className="bg-white rounded-3 p-4 shadow-sm" style={{ 
          minHeight: 'calc(100vh - 2rem)',
          borderLeft: '4px solid #fd7e14'
        }}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Admin