import { NavLink } from "react-router-dom";
import Logo from "../assets/Agency.svg";
import { FaChevronDown, FaShieldAlt, FaSignOutAlt, FaUserAlt, FaUserShield } from "react-icons/fa";
import useContextPro from "../hooks/useContextPro";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const { state: { user }, dispatch } = useContextPro();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    handleMenuClose();
  };

  return (
    <header id="header">
      <img src={Logo} alt="#" />
      <ul>
        {!user && (
          <>
            <NavLink to="/login" className="login text-decoration-none">
              <li>
                Login
              </li>
            </NavLink>
          </>
        )}
        <li> <a href="#home">Home</a>  </li>
        <li> <a href="#about">About</a></li>
        <li> <a href="#services">Services</a></li>
        <li> <a href="#projects">Projects</a></li>
        <li> <a href="#feedback">Feedback</a> </li>
        <li> <a href="#blog">Blog</a> </li>
        <li> <a href="#contact">Contact</a> </li>
        {user && (
          <li className="profile" style={{ listStyle: 'none' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer'
              }}
              onClick={handleMenuOpen}
            >
              <Avatar
                sx={{ 
                  bgcolor: user.name ? '#1e88e5' : '#9e9e9e',
                  width: 40,
                  height: 40,
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                {user.name ? user.name[0].toUpperCase() : <FaUserAlt size={14} />}
              </Avatar>
              <FaChevronDown
                size={12}
                style={{
                  color: '#6c757d',
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  width: 220,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  mt: 1
                }
              }}
            >
              {user?.roles?.includes("SUPER_ADMIN") && (
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <Link
                    to="/super-admin" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    <FaShieldAlt style={{ color: '#1976d2' }} />
                    <span>Super Admin</span>
                  </Link>
                </MenuItem>
              )}
              {user?.roles?.includes("ADMIN") && (
                <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                  <Link 
                    to="/admin" 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    <FaUserShield style={{ color: '#0288d1' }} />
                    <span>Admin</span>
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaSignOutAlt style={{ color: '#d32f2f' }} />
                  <span>Logout</span>
                </div>
              </MenuItem>
            </Menu>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;