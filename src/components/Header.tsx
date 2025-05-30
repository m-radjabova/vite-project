import Logo from '../assets/logo (1).svg';
import useContextPro from '../hooks/useContextPro';
import { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography, styled } from '@mui/material';
import { FaChevronDown, FaUserShield, FaSignOutAlt, FaHamburger } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const StyledNavLink = styled(NavLink)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const UserProfileButton = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(1, 1.5),
  borderRadius: '24px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

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
              <StyledNavLink to="/login">
                Login
              </StyledNavLink>
            </li>
          ) : (
            <li style={{ listStyle: 'none' }}>
              <UserProfileButton
                onClick={handleMenuOpen}
                sx={{
                  backgroundColor: open ? 'rgba(255, 112, 32, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 112, 32, 0.1)',
                  }
                }}
              >
                {user.username ? (
                  <Avatar
                    alt={user.username}
                    src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160"
                    sx={{
                      width: 40,
                      height: 40,
                      boxShadow: '0 2px 8px rgba(255, 112, 32, 0.3)',
                      border: '2px solid #FF7020',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 40,
                      height: 40,
                      boxShadow: '0 2px 8px rgba(255, 112, 32, 0.3)',
                    }}
                  >
                    <FaHamburger size={18} style={{ color: '#fff' }} />
                  </Avatar>
                )}
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {user.username}
                </Typography>
                <FaChevronDown
                  size={14}
                  style={{
                    color: '#FF7020',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </UserProfileButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    width: 280,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    mt: 1.5,
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                    '& .MuiMenuItem-root': {
                      padding: '12px 16px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 112, 32, 0.08)',
                      }
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{
                  px: 2,
                  py: 2,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  backgroundColor: 'rgba(255, 112, 32, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {user.username ? (
                    <Avatar
                      alt={user.username}
                      src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160"
                      sx={{
                        width: 48,
                        height: 48,
                        border: '2px solid #FF7020',
                        boxShadow: '0 4px 12px rgba(255, 112, 32, 0.2)',
                      }}
                    />
                  ) : (
                    <Avatar sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                      boxShadow: '0 4px 12px rgba(255, 112, 32, 0.2)',
                    }}>
                      <FaHamburger size={20} style={{ color: '#fff' }} />
                    </Avatar>
                  )}
                  <div>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {user.username || 'Hungry Guest'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', display: 'block' }}>
                      {user.email || 'Ready to order!'}
                    </Typography>
                  </div>
                </Box>
                
                {user?.roles?.includes("ADMIN") && (
                  <MenuItem onClick={handleMenuClose}>
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
                      <FaUserShield style={{ fontSize: '18px', color: '#FF7020' }} />
                      <Typography variant="body2">Admin Dashboard</Typography>
                    </Link>
                  </MenuItem>
                )}
                
                <MenuItem onClick={handleLogout}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                    <FaSignOutAlt style={{ fontSize: '18px', color: '#FF7020' }} />
                    <Typography variant="body2">Logout</Typography>
                  </Box>
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