import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { FaUsers, FaListAlt, FaEdit, FaUserCog } from 'react-icons/fa';
import { Box, Typography } from '@mui/material';

function Header() {
    const location = useLocation();

  return (
    <header className="header bg-light p-3 mb-4 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FaUserCog
                style={{
                    fontSize: "2rem",
                }}
            />
            <Typography variant="h4">User Management</Typography>
        </Box>
        <div className="d-flex align-items-center gap-2">
          <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Users' ? 'active-user' : 'text-muted'}`}>
            <FaUsers className="fs-5" />
            <Link className='link text-decoration-none' to="/Users">Users</Link>
          </button>
          <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Posts' ? 'active-post' : 'text-muted'}`}>
            <FaEdit className="fs-5" />
            <Link className='link text-decoration-none' to="/Posts">Posts</Link>
          </button>
          <button className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-2 ${location.pathname === '/Todos' ? 'active-todo' : 'text-muted'}`}>
            <FaListAlt className="fs-5" />
            <Link className='link text-decoration-none' to="/Todos">Todos</Link>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

