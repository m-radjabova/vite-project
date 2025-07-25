import { useEffect, useState } from "react";
import { User } from "../App";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { MultiValue } from "react-select";

function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [editedRoles, setEditedRoles] = useState<{[key: string]: string[] }>({});
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

     const deleteUsers = async (userId: string) => {
        try {
          await apiClient.delete(`/users/${userId}`);
          setUsers(prevUsers => prevUsers.filter(user => user.id.toString() !== userId));
          toast.success('User deleted successfully!');
        } catch (error) {
          console.error('Error deleting user:', error);
          toast.error('Failed to delete user!');
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
                    user.id.toString() === userId ? { ...user, roles: newRoles as ("ADMIN" | "USER" | "SUPER_ADMIN")[] } : user
                )
            );
            setEditedRoles(prev => {
                const updated = { ...prev };
                delete updated[userId];
                return updated;
            });
            setIsSaving(prev => ({ ...prev, [userId]: false }));
            toast.success('Roles updated successfully!');
        } catch (error) {
            console.error('Error updating roles:', error);
        }
    };

  return { users, setUsers, deleteUsers, editedRoles, setEditedRoles, isSaving, setIsSaving, handleRoleChange, saveRoleChange };
}

export default useUsers