import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo (1).svg';
import useContextPro from '../hooks/useContextPro';
import { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { FaChevronDown, FaUserShield, FaSignOutAlt, FaHamburger } from 'react-icons/fa';
import { Link } from 'react-router-dom';


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
                    <ul>
                        {!user ? (
                            <li className="login" style={{ listStyle: 'none' }}>
                                <NavLink 
                                    to="/login" 
                                    className="login text-decoration-none list-unstyled text-white "
                                    style={{fontSize: "24px"}}
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
                                        transition: 'all 0.3s ease',
                                        backgroundColor: open ? '#fff5f0' : 'transparent'
                                        }}
                                        onClick={handleMenuOpen}
                                    >
                                        {user.username ? (
                                        <Avatar
                                            alt={user.username}
                                            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160" // Burger image from Pexels
                                            sx={{ 
                                            width: 36,
                                            height: 36,
                                            boxShadow: '0 2px 8px rgba(255, 112, 32, 0.3)',
                                            border: '2px solid #FF7020'
                                            }}
                                        />
                                        ) : (
                                        <Avatar
                                            sx={{ 
                                            bgcolor: '#FFB347',
                                            width: 36,
                                            height: 36,
                                            boxShadow: '0 2px 8px rgba(255, 112, 32, 0.3)'
                                            }}
                                        >
                                            <FaHamburger size={16} style={{ color: '#fff' }} />
                                        </Avatar>
                                        )}
                                        <FaChevronDown
                                        size={12}
                                        style={{
                                            color: '#FF7020',
                                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        />
                                    </div>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                        sx: {
                                            width: 240,
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            mt: 1.5,
                                            border: '1px solid rgba(255, 112, 32, 0.2)',
                                            boxShadow: '0px 4px 20px rgba(255, 112, 32, 0.15)',
                                            '& .MuiMenuItem-root': {
                                            padding: '12px 16px'
                                            }
                                        }
                                        }}
                                    >
                                        <Box sx={{ 
                                        px: 2, 
                                        py: 1.5, 
                                        borderBottom: '1px solid rgba(255, 112, 32, 0.1)',
                                        backgroundColor: '#fff9f5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                        }}>
                                        {user.username ? (
                                            <Avatar
                                            alt={user.username}
                                            src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=160"
                                            sx={{ 
                                                width: 40,
                                                height: 40,
                                                border: '2px solid #FF7020'
                                            }}
                                            />
                                        ) : (
                                            <Avatar sx={{ bgcolor: '#FFB347', width: 40, height: 40 }}>
                                            <FaHamburger size={18} style={{ color: '#fff' }} />
                                            </Avatar>
                                        )}
                                        <div>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FF7020' }}>
                                            {user.username || 'Hungry Guest'}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#FF8C4B', display: 'block' }}>
                                            {user.email || 'Ready to order!'}
                                            </Typography>
                                        </div>
                                        </Box>
                                        
                                        {user?.roles?.includes("ADMIN") && (
                                        <MenuItem 
                                            onClick={handleMenuClose} 
                                            sx={{ 
                                            color: '#FF7020',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 112, 32, 0.08)'
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
                                            <FaUserShield style={{ fontSize: '16px' }} />
                                            <span>Admin Dashboard</span>
                                            </Link>
                                        </MenuItem>
                                        )}
                                        
                                        <MenuItem 
                                        onClick={handleLogout} 
                                        sx={{ 
                                            color: '#FF7020',
                                            '&:hover': {
                                            backgroundColor: 'rgba(255, 112, 32, 0.08)'
                                            }
                                        }}
                                        >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <FaSignOutAlt style={{ fontSize: '16px' }} />
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