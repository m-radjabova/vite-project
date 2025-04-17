import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { FaEdit, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IoMdPhotos } from "react-icons/io";
import { FaUsers, FaUsersLine } from "react-icons/fa6";

function Header() {
    const location = useLocation();

    useEffect(() => {
      document.body.classList.remove('bodyblue', 'bodypink', 'bodygreen', 'bodyorange');
    
      if (location.pathname === '/Posts') {
        document.body.classList.add('bodyblue');
      } else if (location.pathname === '/Users') {
        document.body.classList.add('bodypink');
      } else if (location.pathname === '/Todos') {
        document.body.classList.add('bodygreen');
      } else if(location.pathname === '/Photos'){
        document.body.classList.add('bodyorange');
      }
    }, [location.pathname]);
    
  return (
    <header className="header bg-light p-3 shadow-sm ">
      <div className="container d-flex justify-content-between align-items-center">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FaUsersLine
                style={{
                    fontSize: "2rem",
                }}
            />
            <Typography variant="h4">Users Management</Typography>
        </Box>
        <div className="d-flex align-items-center gap-2">
          <Link to="/Users" className='link text-decoration-none'>
            <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Users' ? 'active-user' : ''}`}>
                <FaUsers className="fs-5" />
                Users
            </button>
          </Link>
          <Link to="/Posts" className='link text-decoration-none'>
            <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Posts' ? 'active-post' : ''}`}>
              <FaEdit className="fs-5" />
              Posts
            </button>
          </Link>
          <Link to="/Todos" className='link text-decoration-none'>
            <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Todos' ? 'active-todo' : ''}`}>
              <FaListAlt className="fs-5" />
              Todos
            </button>
          </Link>
          <Link to="/Photos" className='link text-decoration-none'>
            <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2  ${location.pathname === '/Photos' ? 'active-photo' : ''}`}>
              <IoMdPhotos className="fs-5" />
              Photos
            </button>
          </Link>
        </div>
      </div>
    </header>
    
  )
}

export default Header