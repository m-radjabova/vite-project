import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton
} from "@mui/material";
import { User } from "../App";
import { FaTrashAlt, FaEdit, FaUsers, FaUserSlash } from "react-icons/fa";
import { theme } from "../context/Theme";

interface Props {
  users: User[];
  deleteUser: (id: number) => void;
  selectedUser: (user: User) => void;
  handleEdit: (user: User) => void
}

function UserList({ users, deleteUser, selectedUser, handleEdit }: Props) {
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
                      onClick={() => deleteUser(user.id)}
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
    </Box>
  );
}

export default UserList;