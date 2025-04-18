import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div className="container admin">
      <div className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li>
            <Link to="services">Services</Link>
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