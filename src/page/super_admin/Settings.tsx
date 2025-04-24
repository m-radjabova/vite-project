import { FaUser, FaEnvelope, FaIdCard, FaSave } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { User } from '../../App';
import apiClient from '../../apiClient/ApiClient';
import Select, { MultiValue } from 'react-select';
import { getRoleBadge } from './GetBadgeFunction';

function Settings() {
  const [users, setUsers] = useState<User[]>([]);
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: string[] }>({});
  const [isSaving, setIsSaving] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRoleChange = (userId: string, newRoles: MultiValue<{ value: string; label: string }>) => {
    setEditedRoles(prev => ({ ...prev, [userId]: newRoles.map(role => role.value) }));
  };

  const saveRoleChange = async (userId: string) => {
    const newRoles = editedRoles[userId];
    if (!newRoles) return;

    setIsSaving(prev => ({ ...prev, [userId]: true }));

    try {
      await apiClient.patch(`/users/${userId}`, { roles: newRoles });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, roles: newRoles as ("ADMIN" | "USER" | "SUPER_ADMIN")[] } : user
        )
      );
      setEditedRoles(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  };

  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'USER', label: 'User' },
    { value: 'SUPER_ADMIN', label: 'Super Admin' },
  ];

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
              <div className="table-responsive p-4">
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
                          <div
                            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                            style={{ width: '40px', height: '40px' }}
                          >
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
                          <Select
                            isMulti
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={roleOptions}
                            value={roleOptions.filter(option => (editedRoles[user.id] || user.roles).includes(option.value))}
                            onChange={(selectedOptions) => handleRoleChange(user.id, selectedOptions || [])}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => saveRoleChange(user.id)}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            {isSaving[user.id] ? 'Saving...' : <><FaSave className="me-1" /> Save</>}
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