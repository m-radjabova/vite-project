import Admin from "../page/admin/Admin";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <Admin />
      </div>
      <div className="content-area">
        
      </div>
    </div>
  );
}
