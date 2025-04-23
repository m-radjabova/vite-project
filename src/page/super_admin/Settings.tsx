import { FaUser, FaUserShield, FaCrown, FaQuestion, FaEnvelope, FaIdCard, FaSave} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { User } from '../../App';
import apiClient from '../../apiClient/ApiClient';

function Settings() {
  const [users, setUsers] = useState<User[]>([]);
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: string }>({});
  
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    apiClient.get('/users')
      .then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.error('Error fetching users:', error);
      }); ;
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setEditedRoles(prev => ({ ...prev, [userId]: newRole }));
  };

  const saveRoleChange = async (userId: string) => {
    const newRole = editedRoles[userId];
    try {
      await apiClient.put(`/users/${userId}/roles`, { roles: [newRole] });
      getUsers();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const getRoleBadge = (roles: ("ADMIN" | "USER" | "SUPER_ADMIN")[]) => {
    return roles.map((role, index) => {
      switch (role) {
        case 'ADMIN':
          return (
            <span key={index} className="badge bg-purple bg-opacity-10 text-purple p-2 me-2">
              <FaUserShield className="me-1" /> Admin
            </span>
          );
        case 'SUPER_ADMIN':
          return (
            <span key={index} className="badge bg-danger bg-opacity-10 text-danger p-2 me-2">
              <FaCrown className="me-1" /> Super Admin
            </span>
          );
        case 'USER':
          return (
            <span key={index} className="badge bg-primary bg-opacity-10 text-primary p-2 me-2">
              <FaUser className="me-1" /> User
            </span>
          );
        default:
          return (
            <span key={index} className="badge bg-secondary bg-opacity-10 text-secondary p-2 me-2">
              <FaQuestion className="me-1" /> Unknown
            </span>
          );
      }
    });
  };

  return (
    <div className="settings-container container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="fw-bold text-primary">
            <FaUser className="me-3" />
            User Management
          </h1>
          <p className="text-muted">Manage team members and their permissions</p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: '50px' }}></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>ID</th>
                      <th>Current Roles</th>
                      <th>Edit Roles</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '40px', height: '40px' }}>
                            <FaUser size={16} />
                          </div>
                        </td>
                        <td>
                          <h6 className="mb-0 fw-bold">{user.name}</h6>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaEnvelope className="text-muted me-2" />
                            <span>{user.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaIdCard className="text-muted me-2" />
                            <span>{user.id}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {getRoleBadge(user.roles)}
                          </div>
                        </td>
                        <td>
                        <select
                          className="form-select form-select-sm"
                          value={editedRoles[user.id] || user.roles[0]} 
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        >
                          <option value="ADMIN">Admin</option>
                          <option value="USER">User</option>
                          <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                        </td>
                        <td>
                          <button 
                            onClick={() => saveRoleChange(user.id)}
                            disabled={editedRoles[user.id] === undefined}
                            className="btn btn-sm btn-outline-primary me-2">
                            <FaSave className="me-1" /> Save
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;