import { Link, Outlet } from "react-router-dom";
import useContextPro from "../../hooks/useContextPro";
import { FaSignOutAlt, FaUser, FaRegComments, FaRegNewspaper, FaGifts } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { LuFlower2 } from "react-icons/lu";
import 'react-datepicker/dist/react-datepicker.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { FiBook } from "react-icons/fi";
import { GiFlowerPot, GiLotusFlower } from "react-icons/gi";
import { useState } from "react";
import { LuFlower } from "react-icons/lu";
import {PiPlantBold} from "react-icons/pi";
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import { IoRoseOutline, IoSettingsOutline } from "react-icons/io5";
import TopNavigationBar from "./TopNavigationBar";

function Super_Admin() {
  const { state: { user }, dispatch } = useContextPro();
  const [isFlowersOpen, setIsFlowersOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const sidebarLinks = [
    {
      to: "profile",
      label: "My Profile",
      icon: <PersonOutlineOutlinedIcon className="nav-icon" />,
    },
    {
      to: "flowers",
      label: "Flower Arrangements",
      icon: <LuFlower2 className="nav-icon" />,
      subItems: [
        { to: "flowers/all", label: "All", icon: <LuFlower className="nav-icon" /> },
        {to: "flowers/season", label: "Season Flowers", icon: <GiLotusFlower className="nav-icon" />},
        { to: "flowers/hit", label: "Best Sellers", icon: <YardOutlinedIcon className="nav-icon" /> },
        { to: "flowers/discount", label: "At a Discount", icon: <LocalFloristOutlinedIcon className="nav-icon" /> },
        { to: "flowers/roses", label: "Roses", icon: <IoRoseOutline className="nav-icon" /> },
        { to: "flowers/bouquets", label: "Bouquets", icon: <LuFlower className="nav-icon" /> },
        { to: "flowers/flower", label: "Flowers", icon: <GiFlowerPot className="nav-icon" /> },
        { to: "flowers/plants", label: "Plants", icon: <PiPlantBold className="nav-icon" /> },
        { to: "flowers/gifts", label: "Gifts", icon: <FaGifts className="nav-icon" /> },
      ]
    },
    {
      to:"categories",
      label:"Categories",
      icon: <GiFlowerPot className="nav-icon" />
    },
    {
      to: "reviews",
      label: "Customer Reviews",
      icon: <FaRegComments className="nav-icon" />,
    },
    {
      to: "articles",
      label: "Blog Articles",
      icon: <FiBook className="nav-icon" />,
    },
    {
      to: "news",
      label: "Company News",
      icon: <FaRegNewspaper className="nav-icon" />,
    },
    {
      to: "delivery",
      label: "Delivery Points",
      icon: <MdOutlineLocalShipping className="nav-icon" />,
    },
    {
      to: "partners",
      label: "Partners",
      icon: <FaUser className="nav-icon" />,
    },
    {
      to: "settings",
      label: "Settings",
      icon: <IoSettingsOutline className="nav-icon" />
    }
  ];

  return (
    <div className="admin-app">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <Link to="/" className="sidebar-brand">
          <LuFlower2 className="brand-icon" />
          <h1 className="brand-title">Super Admin Panel</h1>
        </Link>
        
        <div className="sidebar-divider"></div>
        
        <ul className="sidebar-nav">
          {sidebarLinks.map(link => (
            <li className="nav-item" key={link.to}>
              {link.subItems ? (
                <>
                  <div 
                    className={`nav-link ${isFlowersOpen ? 'active' : ''}`}
                    onClick={() => setIsFlowersOpen(!isFlowersOpen)}
                  >
                    {link.icon}
                    <span className="nav-text">{link.label}</span>
                    <span className={`nav-arrow ${isFlowersOpen ? 'open' : ''}`}>
                      ▼
                    </span>
                    <span className="nav-highlight"></span>
                  </div>
                  {isFlowersOpen && (
                    <ul className="submenu">
                      {link.subItems.map(subItem => (
                        <li key={subItem.to}>
                          <NavLink
                            className={({ isActive }) => 
                              `submenu-link ${isActive ? 'active' : ''}`
                            }
                            to={subItem.to}
                          >
                            {subItem.icon}
                            {subItem.label}
                            
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  to={link.to}
                >
                  {link.icon}
                  <span className="nav-text">{link.label}</span>
                  <span className="nav-highlight"></span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar-sidebar">
              <FaUser />
            </div>
            <div className="user-info">
              <div className="user-name-sidebar">
                {user?.username || 'Floral Admin'}
              </div>
              <div className="user-role">
                <LuFlower2 className="role-icon" /> Super Admin
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt className="logout-icon" />
            <span>Sign Out</span>
            <span className="logout-overlay"></span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        <TopNavigationBar />
        <div className="content-container">
          <div className="content-card">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Super_Admin; 