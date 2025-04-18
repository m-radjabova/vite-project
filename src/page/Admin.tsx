import { Outlet, Link } from "react-router-dom";

function Admin() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <Link to="Users">Users</Link> |
        <Link to="Posts">Posts</Link> |
        <Link to="Todos">Todos</Link> |
        <Link to="Photos">Photos</Link>
      </nav>
      <Outlet /> 
    </div>
  );
}

export default Admin
