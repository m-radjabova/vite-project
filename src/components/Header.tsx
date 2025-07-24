import useContextPro from '../hooks/useContextPro';
import { useState } from 'react';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import {FaUserShield, FaSignOutAlt, FaUserAlt, FaChevronDown, FaRegHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import singIn from '../assets/sign-in.svg';
import UserLogo from '../assets/user.svg'
import Logo from '../assets/Frame 6.svg'
import { LuClock } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { GiKing } from 'react-icons/gi';
function Header() {
    const { state: { user }, dispatch } = useContextPro();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

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
      <div className="header-content">
        <nav className="header-nav">
            <NavLink to="/catalog" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Каталог</NavLink>
            <NavLink to="/about" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>О компании</NavLink>
            <NavLink to="/payment" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Способы оплаты</NavLink>
            <NavLink to="/delivery" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Доставка</NavLink>
            <NavLink to="/reviews" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Отзывы</NavLink>
            <NavLink to="/discount" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Дисконтные карты</NavLink>
            <NavLink to="/video" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Видео</NavLink>
            <NavLink to="/contacts" className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>Контакты</NavLink>
        </nav>
        {!user ? (
              <div>
                  <NavLink 
                    to="/login" 
                    className="login text-decoration-none login" 
                  >
                    <img src={UserLogo} alt="sing-in" className="me-2" />
                    Войти
                </NavLink>
                <NavLink 
                    to="/sing-up" 
                    className="login text-decoration-none login" 
                  >
                    <img src={singIn} alt="sing-in" className="me-2" />
                    Регистрация
                </NavLink>
              </div>
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
                      bgcolor: user.username ? '#d23c67' : '#6c757d',
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
                  {user?.roles?.includes("SUPER_ADMIN") && (
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
                        <GiKing style={{ color: '#0288d1', fontSize: '16px' }} />
                        <span>Super Admin</span>
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
      </div>
      <div className='header-middle'>
        <img src={Logo} alt="header-logo" className="header-logo" onClick={() => navigate('/')} />
        <div className='phone-number'>
          <span>+7 965 151 18 39 </span>
          <span>+7 916 122 18 98</span>
        </div>
        <div className='timeAndAddress'>
          <div className='time'>
            <LuClock color='#43b02a' size={20} className="me-2 "  /> 
            Ждем вас с 8:00 до 22:00
          </div>
          <div className='address'>
            <CiLocationOn color='#43b02a' size={20} className="me-2" /> 
            Адреса цветочных центров
          </div>
        </div>
        <div className='likeAndCart' >
          <div className='like' onClick={() => navigate('/favorites')}>
            <FaRegHeart size={30} className="me-2" />
            <span>Избранное</span>
          </div>
          <div className='cart' onClick={() => navigate('/cart')}>
            <IoCartOutline size={30} className="me-2" />
            <span>0 ₽</span>
          </div>
        </div>
      </div>
     <div className='header-bottom'>
      <nav className='header-bottom-nav'>
        <NavLink to="/bouquets" className="header-bottom-link">Букеты</NavLink>
        <NavLink to="/roses" className="header-bottom-link">Розы</NavLink>
        <NavLink to="/flowers" className="header-bottom-link">Цветы</NavLink>
        <NavLink to="/plants" className="header-bottom-link">Горшечные растения</NavLink>
        <NavLink to="/about" className="header-bottom-link">Повод</NavLink>
        <NavLink to="/gifts" className="header-bottom-link">Подарки</NavLink>
        <NavLink to="/sales" className="header-bottom-link">Акции</NavLink>
      </nav>
    </div>
    </header>
  )
}

export default Header