import { Link, Outlet, useNavigate } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { FaSignOutAlt, FaUser,FaCalendarAlt,FaCog, FaIceCream} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { LuCrown } from "react-icons/lu";
import {GiStrawberry } from "react-icons/gi";
import IcecreamOutlinedIcon from '@mui/icons-material/IcecreamOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

function Admin() {
  const { state: { user }, dispatch } = useContextPro();
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const sidebarLinks = [
    {
      to: "products",
      label: "Products",
      icon: <IcecreamOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
    {
      to: "carousel",
      label: "Carousel Images",
      icon: <CollectionsOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
    {
      to: "categories",
      label: "Categories",
      icon: <KitchenOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
    {
      to: "orders",
      label: "Orders",
      icon: <CalendarTodayOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
    {
      to: "questions",
      label: "Questions",
      icon: <QuestionAnswerOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
    {
      to: "profile",
      label: "Profile",
      icon: <PersonOutlineOutlinedIcon className="me-2" style={{ fontSize: '1.2em' }} />,
    },
  ];

  return (
    <div className="admin-container d-flex" style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #fff5f5 0%, #fff9fb 100%)'
    }}>
      <div className="sidebar p-3 d-flex flex-column justify-content-between" style={{ 
        width: '280px', 
        minWidth: '280px',
        background: 'linear-gradient(180deg, #ffb6c1 0%, #ff8fab 100%)',
        boxShadow: '4px 0 15px rgba(255, 192, 203, 0.2)',
        position: 'relative',
        zIndex: 10,
        borderRight: '1px solid rgba(255, 182, 193, 0.3)'
      }}>
        <div>
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center mb-4 p-3 rounded" style={{ 
              background: 'rgba(255, 255, 255, 0.3)',
              borderLeft: '4px solid #ff6b8b',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(5px)'
            }}>
              <FaIceCream className="fs-4 me-3" style={{ 
                color: '#d23c67',
                animation: 'pulse 2s infinite'
              }} />
              <h1 className="sidebar-title fs-5 mb-0" style={{ 
                fontWeight: 700,
                letterSpacing: '0.5px',
                background: 'linear-gradient(90deg, #d23c67, #ff6b8b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Sweet Scoops Admin</h1>
            </div>
          </Link>
          
          <hr className="bg-white opacity-20 my-3" />
          
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
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.9)',
                    borderLeft: isActive ? '3px solid white' : '3px solid transparent',
                    transition: 'all 0.3s ease',
                    padding: '12px 16px',
                    fontWeight: 500,
                    backdropFilter: isActive ? 'blur(5px)' : 'none',
                    ':hover': {
                      backgroundColor: !isActive && 'rgba(255,255,255,0.2)',
                    }
                  })}
                >
                  {link.icon}
                  <span className="ms-1">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3">
          <div className="d-flex align-items-center p-3 rounded" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            transition: 'all 0.3s ease',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 16,
              marginRight: 12,
              flexShrink: 0,
              border: '1px solid rgba(255,255,255,0.3)'
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
                {user?.username || 'Ice Cream Admin'}
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.8)', 
                fontSize: 12,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}>
                <LuCrown className="me-1" style={{color: '#ffeb3b'}} /> Administrator
              </div>
            </div>
          </div>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="btn w-100 d-flex align-items-center justify-content-center py-2 position-relative btn-logout"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.3s ease',
              gap: 8,
              overflow: 'hidden',
              zIndex: 1,
              backdropFilter: 'blur(5px)'
            }}
          >
            <FaSignOutAlt style={{ fontSize: 14 }} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="content flex-grow-1" style={{ 
        background: 'linear-gradient(135deg, #fff5f5 0%, #fff9fb 100%)',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Top navigation bar */}
        <div className="px-4 py-3 d-flex align-items-center justify-content-between" style={{
          background: 'rgba(255, 245, 245, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(255, 192, 203, 0.2)',
          position: 'sticky',
          top: 0,
          zIndex: 5,
          borderBottom: '1px solid rgba(255, 182, 193, 0.3)'
        }}>
          <h2 className="mb-0 fs-5 fw-semibold" style={{
            color: '#d23c67',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <GiStrawberry style={{ 
              color: '#ff6b8b',
              fontSize: '1.4em'
            }} />
            <span>Sweet Scoops</span>
            <span style={{
              background: 'linear-gradient(90deg, #d23c67, #ff6b8b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}>Dashboard</span>
          </h2>
          
          <div className="d-flex align-items-center gap-4">
            <button onClick={() => navigate('/admin/profile')} className="btn p-0 btn-setting" style={{
              color: '#ff8fab',
              transition: 'all 0.3s ease'
            }}>
              <FaCog size={18} />
            </button>
            
            <div className="d-flex align-items-center" style={{
              color: '#ff8fab',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}>
              <FaCalendarAlt className="me-2" />
              <span>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="d-flex align-items-center">
                <FaUser className="me-2" style={{ color: '#ff8fab' }} />
                <span className="fw-semibold" style={{ color: '#d23c67' }}>
                  {user?.username || 'Admin'}
                </span>
            </div>
          </div>
        </div>
        <div className="p-4" style={{ 
          minHeight: 'calc(100vh - 56px)',
          background: 'linear-gradient(135deg, rgba(255, 236, 236, 0.4) 0%, rgba(255, 240, 245, 0.2) 100%)'
        }}>
          <div className="rounded-lg p-4" style={{ 
            minHeight: 'calc(100vh - 120px)',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(255, 192, 203, 0.1)',
            border: '1px solid rgba(255, 182, 193, 0.2)',
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