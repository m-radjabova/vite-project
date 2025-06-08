import Logo from '../assets/logo (1).svg';
import useContextPro from '../hooks/useContextPro';
import { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import {FaUserShield, FaSignOutAlt, FaUserAlt, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

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
    <header className="header">
        <img src={Logo} alt="logo" />
        <nav>
        <ul style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: 0, padding: 0 }}>
        {!user ? (
          <li style={{ listStyle: 'none' }}>
            <NavLink 
              to="/login" 
              className="login text-decoration-none" 
              style={{ color: '#BDC2FF' }}
            >
              Login
            </NavLink>
          </li>
        ) : (
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
                  bgcolor: user.username ? '#4a69bd' : '#6c757d',
                  width: 36,
                  height: 36,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                {user.username ? user.username[0].toUpperCase() : <FaUserAlt size={14} />}
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
                  {user.username || 'Guest'}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {user.email}
                </Typography>
              </Box>
              
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
      </nav>
    </header>
  )
}

export default Header