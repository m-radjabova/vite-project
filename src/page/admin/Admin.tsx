import { Link, Outlet } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { FaSignOutAlt, FaUser, FaSprayCan} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { LuCrown } from "react-icons/lu";
import 'react-datepicker/dist/react-datepicker.css';
import TopNavigatorBar from "./TopNavigatorBar";
import  PersonOutlineOutlinedIcon  from '@mui/icons-material/PersonOutlineOutlined';

function Admin() {
  const { state: { user }, dispatch } = useContextPro();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const sidebarLinks = [
    {
      to: "profile",
      label: "Profile",
      icon: <PersonOutlineOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
  ];

  return (
    <div className="admin-container d-flex" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)'
    }}>
      {/* Sidebar */}
      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        minWidth: '280px',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #000000 100%)',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10,
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div>
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              borderLeft: '4px solid #ffffff',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)',
            }}>
              <FaSprayCan className="fs-4 me-3" style={{ 
                color: '#ffffff',
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
              }} />
              <h1 className="sidebar-title fs-5 mb-0" style={{ 
                fontWeight: 600,
                letterSpacing: '1px',
                color: 'white',
                textTransform: 'uppercase',
                fontSize: '14px'
              }}>Essence Admin</h1>
            </div>
          </Link>
          
          <hr className="bg-white opacity-10 my-3" />
          
          <ul className="nav nav-pills flex-column gap-2">
            {sidebarLinks.map(link => (
              <li className="nav-item" key={link.to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "active nav-link d-flex align-items-center rounded"
                      : "nav-link text-white d-flex align-items-center rounded"
                  }
                  to={link.to}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    borderLeft: isActive ? '3px solid white' : '3px solid transparent',
                    transition: 'all 0.3s ease',
                    padding: '12px 16px',
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    backdropFilter: isActive ? 'blur(5px)' : 'none',
                    ':hover': {
                      backgroundColor: !isActive && 'rgba(255,255,255,0.05)',
                    }
                  })}
                >
                  {link.icon}
                  <span className="ms-2">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center p-3 rounded" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(5px)',
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 16,
              marginRight: 12,
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.1)'
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
                {user?.username || 'Perfume Admin'}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.5)', 
                fontSize: 12,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                letterSpacing: '0.5px'
              }}>
                <LuCrown className="me-1" style={{color: 'rgba(255,255,255,0.8)'}} /> Administrator
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn w-100 d-flex align-items-center justify-content-center py-2 position-relative btn-logout"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              fontWeight: 500,
              fontSize: 14,
              transition: 'all 0.3s ease',
              gap: 8,
              overflow: 'hidden',
              zIndex: 1,
              backdropFilter: 'blur(5px)',
              letterSpacing: '0.5px',
            }}
          >
            <FaSignOutAlt style={{ fontSize: 14 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1" style={{ 
        background: 'linear-gradient(135deg, #f9f9f9 0%, #f0f0f0 100%)',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <TopNavigatorBar />
        <div className="p-4" style={{ 
          minHeight: 'calc(100vh - 56px)',
          background: 'linear-gradient(135deg, rgba(240, 240, 240, 0.4) 0%, rgba(245, 245, 245, 0.2) 100%)'
        }}>
          <div className="rounded-lg p-4" style={{ 
            minHeight: 'calc(100vh - 120px)',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(5px)'
          }}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;