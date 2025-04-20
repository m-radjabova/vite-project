import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div className="admin">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li>
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="services">Services</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="project">Projects</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => isActive ? "active" : ""} to="blog">Blog</NavLink>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default Admin