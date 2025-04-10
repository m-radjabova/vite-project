import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent
} from "@mui/material";
import { theme } from "../context/Theme";
import { FaTimes } from "react-icons/fa";

const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '& fieldset': {
      borderColor: '#FFE5E5',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.light}`
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary,
  }
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

interface User {
  id: number;
  name: string;
}

interface NewPost {
  userId: number;
  title: string;
  body: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  users: User[];
  onUserSelect: (newPost: NewPost) => Promise<void>;
}

function AddPostForm({ open, onClose, users, onUserSelect }: Props) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [postData, setPostData] = useState({
    title: '',
    body: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserChange = (event: SelectChangeEvent<number>) => {
    const userId = event.target.value as number;
    setSelectedUser(userId);
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    setIsSubmitting(true);
    
    const newPost: NewPost = {
      userId: selectedUser,
      title: postData.title,
      body: postData.body
    };
    
    try {
      await onUserSelect(newPost);
      setPostData({ title: '', body: '' });
      setSelectedUser(null);
      console.log(newPost)
      onClose();
    } catch (error) {
      console.error('Failed to add post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(3px)',
      }}
    >
      <Box 
        sx={{
          position: 'relative',
          width: { xs: '90%', sm: '80%', md: '600px' },
          bgcolor: 'background.paper',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(255, 107, 139, 0.2)',
          p: 4,
          outline: 'none',
          transform: open ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '1px solid #FFE5E5',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, #FFD3D3 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography 
            id="user-modal-title" 
            variant="h6" 
            component="h2"
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pl: 1
            }}
          >
            Add New Post
          </Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 139, 0.1)',
                transform: 'rotate(90deg)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <FaTimes style={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>
        
        <Divider sx={{ 
          my: 3, 
          borderColor: '#FFE5E5',
          borderWidth: '1px'
        }} />
        
        <FormControl fullWidth sx={{ mb: 3, ...textFieldStyles }}>
          <InputLabel id="user-select-label">Select User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={selectedUser || ''}
            onChange={handleUserChange}
            input={<OutlinedInput label="Select User" />}
            MenuProps={MenuProps}
            required
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          '& .MuiTextField-root': {
            mb: 0
          }
        }}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            variant="outlined"
            name="title"
            value={postData.title}
            onChange={handleInputChange}
            required
            sx={textFieldStyles}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Body"
            variant="outlined"
            name="body"
            value={postData.body}
            onChange={handleInputChange}
            required
            sx={textFieldStyles}
          />
        </Box>
        
        <Divider sx={{ 
          my: 3, 
          borderColor: '#FFE5E5',
          borderWidth: '1px'
        }} />
      
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button 
            onClick={onClose} 
            variant="outlined" 
            startIcon={<FaTimes />}
            sx={{
              color: theme.palette.text.secondary,
              borderColor: '#FFD3D3',
              borderRadius: '12px',
              px: 3,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: 'rgba(255, 107, 139, 0.08)',
                color: theme.palette.primary.main
              },
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: '12px',
              px: 3,
              color: '#fff',
              boxShadow: '0 4px 12px rgba(255, 107, 139, 0.3)',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 16px rgba(255, 107, 139, 0.4)',
              },
              transition: 'all 0.2s ease',
              '&:disabled': {
                background: '#e0e0e0',
                color: '#a0a0a0'
              }
            }}
          >
            {isSubmitting ? 'Adding...' : 'Add New Post'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddPostForm;