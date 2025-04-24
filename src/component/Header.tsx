import { NavLink } from "react-router-dom";
import Logo from "../assets/Agency.svg";
import { FaChevronDown, FaShieldAlt, FaSignOutAlt, FaUserAlt, FaUserShield } from "react-icons/fa";
import useContextPro from "../hooks/useContextPro";
import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from "@mui/material";

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

  function stringToColor(string : string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }

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
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              sx={{ 
                bgcolor: user.name ? stringToColor(user.name) : '#9e9e9e',
                width: 36,
                height: 36,
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#fff'
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
              elevation: 4,
              sx: {
                width: 240,
                borderRadius: '12px',
                overflow: 'hidden',
                mt: 1.5,
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            <Box sx={{ px: 1.5, py: 1.5, borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user.name || 'Guest'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {user.email}
              </Typography>
            </Box>
            
            {user?.roles?.includes("SUPER_ADMIN") && (
              <MenuItem 
                onClick={handleMenuClose} 
                sx={{ 
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                  }
                }}
              >
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
                  <FaShieldAlt style={{ color: '#1976d2', fontSize: '16px' }} />
                  <span>Super Admin</span>
                </Link>
              </MenuItem>
            )}
            
            {user?.roles?.includes("ADMIN") && (
              <MenuItem 
                onClick={handleMenuClose} 
                sx={{ 
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(2, 136, 209, 0.08)'
                  }
                }}
              >
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
                  <FaUserShield style={{ color: '#0288d1', fontSize: '16px' }} />
                  <span>Admin</span>
                </Link>
              </MenuItem>
            )}
            
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.08)'
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaSignOutAlt style={{ color: '#d32f2f', fontSize: '16px' }} />
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