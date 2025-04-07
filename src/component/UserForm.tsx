import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { User } from "../App";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  IconButton
} from "@mui/material";
import { FaUserEdit, FaUserPlus, FaTimes } from "react-icons/fa";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff9fb', 
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  p: 3,
  border: '1px solid #f0e6ea',
};

interface Props {
  open: boolean;
  onClose: () => void;
  addUser: (data: Omit<User, "id">) => void;
  updateUser: (user: User) => void;
  selectedUser: User | null;
}

function UserForm({ open, onClose, addUser, updateUser, selectedUser }: Props) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (selectedUser) {
      const { id, ...rest } = selectedUser;
      console.log(`Selected user ID: ${id}`);
      setFormData(rest);
    } else {
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: ""
      });
    }
  }, [selectedUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser({ ...formData, id: selectedUser.id });
    } else {
      addUser(formData);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography 
            id="user-modal-title" 
            variant="h6" 
            component="h2"
            sx={{ 
              color: '#6d6875', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {selectedUser ? (
              <>
                <FaUserEdit style={{ color: '#b5838d', fontSize: '1.2rem' }} />
                Edit User
              </>
            ) : (
              <>
                <FaUserPlus style={{ color: '#b5838d', fontSize: '1.2rem' }} />
                Add New User
              </>
            )}
          </Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            sx={{
              color: '#b5838d',
              '&:hover': {
                backgroundColor: 'rgba(181, 131, 141, 0.1)'
              }
            }}
          >
            <FaTimes style={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>
        
        <Divider sx={{ 
          my: 2, 
          borderColor: '#f0e6ea',
          borderWidth: '1px'
        }} />
        
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  borderColor: '#e2d9dc',
              },
              '&:hover fieldset': {
                  borderColor: '#b5838d',
              },
              '&.Mui-focused fieldset': {
                  borderColor: '#b5838d',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#b5838d',
            }
          }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  borderColor: '#e2d9dc',
              },
              '&:hover fieldset': {
                  borderColor: '#b5838d',
              },
              '&.Mui-focused fieldset': {
                  borderColor: '#b5838d',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#b5838d',
            }
          }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  borderColor: '#e2d9dc',
              },
              '&:hover fieldset': {
                  borderColor: '#b5838d',
              },
              '&.Mui-focused fieldset': {
                  borderColor: '#b5838d',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#b5838d',
            }
          }}
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          variant="outlined"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                  borderColor: '#e2d9dc',
              },
              '&:hover fieldset': {
                  borderColor: '#b5838d',
              },
              '&.Mui-focused fieldset': {
                  borderColor: '#b5838d',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#b5838d',
            }
          }}
        />
        
        <Divider sx={{ 
          my: 2, 
          borderColor: '#f0e6ea',
          borderWidth: '1px'
        }} />
        
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            sx={{
              color: '#6d6875',
              borderColor: '#e2d9dc',
              '&:hover': {
                borderColor: '#b5838d',
                backgroundColor: 'rgba(181, 131, 141, 0.08)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{
              backgroundColor: '#b5838d',
              '&:hover': {
                backgroundColor: '#9d6b75',
              }
            }}
          >
            {selectedUser ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UserForm;