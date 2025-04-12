import { Box, Typography, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,Modal,
  Button} from "@mui/material";
import { User } from "../page/Users";
import { FaTrashAlt, FaEdit, FaUsers, FaUserSlash, FaTimes, FaTrash, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { theme } from "../context/Theme";
import { useState } from "react";


interface Props {
    users: User[];
    deleteUser: (id: number) => void;
    selectedUser: (user: User) => void;
    handleEdit: (user: User) => void;
}
  
function UserList({ users, deleteUser, selectedUser, handleEdit }: Props) {

  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const handleOpen = (user: User) => {
    setUserToDelete(user); 
    setOpen(true);
  };
  
  const handleClose = () => {
    setUserToDelete(null);
    setOpen(false);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      handleClose();
    }
  };

    return (
      <Box sx={{ 
        width: '100%', 
        p: { xs: 2, md: 3 },
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
      }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom
          sx={{ 
            color: theme.palette.text.primary,
            fontWeight: 600,
            mb: 4,
            pt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <FaUsers style={{ color: theme.palette.primary.main }} />
          User List
        </Typography>
        
        <TableContainer 
          component={Paper}
          sx={{ 
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(255, 107, 139, 0.08)',
            overflow: 'hidden',
            border: '1px solid #FFE5E5',
            '& .MuiTable-root': {
              overflowX: 'auto'
            }
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead sx={{ 
              backgroundColor: '#FFF0F0',
              '& .MuiTableCell-root': {
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: '0.95rem'
              }
            }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ 
                    '&:nth-of-type(even)': { 
                      backgroundColor: '#FFF9F9' 
                    },
                    '&:hover': { 
                      backgroundColor: '#FFEEEE',
                      transform: 'scale(1.002)',
                      boxShadow: '0 2px 8px rgba(255, 107, 139, 0.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        onClick={() => handleOpen(user)}
                        sx={{ 
                          color: '#FF4757',
                          backgroundColor: 'rgba(255, 71, 87, 0.1)',
                          '&:hover': { 
                            backgroundColor: 'rgba(255, 71, 87, 0.2)',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease',
                          p: 1.5
                        }}
                      >
                        <FaTrashAlt size={16} />
                      </IconButton>
                      <IconButton
                         onClick={() => { selectedUser(user); handleEdit(user) }} 
                        sx={{ 
                          color: '#FF9E2C',
                          backgroundColor: 'rgba(255, 158, 44, 0.1)',
                          '&:hover': { 
                            backgroundColor: 'rgba(255, 158, 44, 0.2)',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease',
                          p: 1.5
                        }}
                      >
                        <FaEdit size={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
        {users.length === 0 && (
          <Paper sx={{ 
            p: 4, 
            mt: 3, 
            textAlign: 'center',
            backgroundColor: '#FFF9F9',
            borderRadius: '16px'
          }}>
            <FaUserSlash size={48} style={{ 
              color: theme.palette.primary.main,
              marginBottom: '16px',
              opacity: 0.5
            }} />
            <Typography variant="h6" color="textSecondary">
              No users found
            </Typography>
          </Paper>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff5f7', 
            boxShadow: 24,
            p: 4,
            borderRadius: '12px',
            border: '1px solid #ffccd5', 
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#ffebee', 
              padding: '16px',
              margin: '-32px -32px 24px -32px', 
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              borderBottom: '1px solid #ffccd5'
            }}>
              <Typography 
                id="modal-modal-title" 
                variant="h6" 
                component="h2"
                sx={{
                  color: '#d81b60', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaExclamationTriangle style={{ fontSize: '1.2rem' }} />
                Confirm Deletion
              </Typography>
            </div>
            
            <Typography 
              id="modal-modal-description" 
              sx={{ 
                mt: 2,
                color: '#880e4f', 
                fontSize: '1.1rem'
              }}
            >
              Are you sure you want to delete this user? This action cannot be undone.
            </Typography>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '32px'
            }}>
              <Button 
                variant="contained" 
                onClick={handleDeleteUser}
                startIcon={<FaTrash />}
                sx={{
                  bgcolor: '#f06292',
                  color: 'white',
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#d81b60', 
                    boxShadow: '0 2px 8px rgba(216, 27, 96, 0.3)'
                  }
                }}
              >
                Delete
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={handleClose}
                startIcon={<FaTimes />}
                sx={{
                  color: '#f06292', 
                  borderColor: '#f06292',
                  borderRadius: '8px',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#fff5f7',
                    borderColor: '#d81b60',
                    color: '#d81b60'
                  }
                }}
              >
                Cancel
              </Button>
            </div>
            
            <div style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px dashed #ffccd5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <FaInfoCircle style={{ color: '#f06292' }} />
              <Typography variant="caption" sx={{ color: '#f06292' }}>
                This will permanently remove all user data
              </Typography>
            </div>
          </Box>
        </Modal>
      </Box>
    );
}
  
export default UserList;