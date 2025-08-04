import { FaUser, FaEnvelope, FaSave, FaUserTimes } from 'react-icons/fa';
import Select from 'react-select';
import { getRoleBadge } from './GetBadgeFunction';
import useUsers from '../../hooks/useUsers';

function Settings() {
    const { users, deleteUsers, handleRoleChange, saveRoleChange, editedRoles, isSaving } = useUsers();

    
    const roleOptions = [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'USER', label: 'User' }
    ];

    

    return (
        <div className="user-management">
            <div className="user-management__header">
                <FaUser className="user-management__header-icon" />
                <div>
                    <h1 className="user-management__title">User Management</h1>
                    <p className="user-management__subtitle">Manage team members and their permissions</p>
                </div>
            </div>
            <div className="user-management__table-container">
                <div className="user-management__table-scroll">
                    <table className="user-management__table">
                        <thead>
                            <tr className="user-management__table-header">
                                <th className="user-management__avatar-column"></th>
                                <th className="user-management__name-column">Name</th>
                                <th className="user-management__email-column">Email</th>
                                <th className="user-management__roles-column">Current Roles</th>
                                <th className="user-management__edit-column">Edit Roles</th>
                                <th className="user-management__actions-column">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="user-management__table-row">
                                    <td className="user-management__avatar-cell">
                                        <div className="user-management__avatar">
                                            <FaUser className="user-management__avatar-icon" />
                                        </div>
                                    </td>
                                    <td className="user-management__name-cell">
                                        <div className="user-management__username">{user.username}</div>
                                    </td>
                                    <td className="user-management__email-cell">
                                        <div className="user-management__email">
                                            <FaEnvelope className="user-management__email-icon" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="user-management__roles-cell">
                                        <div className="user-management__roles">
                                            {user.roles && getRoleBadge(user.roles)}
                                        </div>
                                    </td>
                                    <td className="user-management__edit-cell">
                                        <Select 
                                            isMulti
                                            className="user-management__role-select"
                                            classNamePrefix="user-management__select"
                                            options={roleOptions}
                                            value={roleOptions.filter(option => (editedRoles[user.id] || user.roles).includes(option.value))}
                                            onChange={(selectedOptions) => handleRoleChange(user.id.toString(), selectedOptions || [])}
                                        />
                                    </td>
                                    <td className="user-management__actions-cell">
                                        <div className="user-management__actions">
                                        <button
                                            onClick={() => saveRoleChange(String(user.id))}
                                            disabled={isSaving[user.id]}
                                            className={`user-management__button user-management__button--save ${isSaving[user.id] ? 'user-management__button--saving' : ''}`}
                                        >
                                            {isSaving[user.id] ? (
                                            <>
                                                <span className="user-management__spinner"></span>
                                                Saving...
                                            </>
                                            ) : (
                                            <>
                                                <FaSave className="user-management__button-icon" />
                                                Save
                                            </>
                                            )}
                                        </button>

                                        <button 
                                            onClick={() => deleteUsers(String(user.id))}
                                            disabled={isSaving[user.id]}
                                            className="user-management__button user-management__button--delete"
                                        >
                                            <FaUserTimes className="user-management__button-icon" />
                                            Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Settings;