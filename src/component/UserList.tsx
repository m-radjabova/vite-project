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
import { FaTrashAlt, FaEdit } from "react-icons/fa";

interface Props {
  users: User[];
  deleteUser: (id: number) => void;
  selectedUser: (user: User) => void;
}

function UserList({ users, deleteUser, selectedUser }: Props) {
  return (
    <Box sx={{ 
      width: '100%', 
      p: 3,
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom
        sx={{ 
          color: '#343a40',
          fontWeight: 600,
          mb: 4,
          pt: 2
        }}
      >
        User List
      </Typography>
      
      <TableContainer 
        component={Paper}
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead sx={{ backgroundColor: '#e9ecef' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: '#f8f9fa' },
                  '&:hover': { backgroundColor: '#f1f3f5' }
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => deleteUser(user.id)}
                    color="error"
                    sx={{ 
                      mr: 1,
                      '&:hover': { backgroundColor: 'rgba(220, 53, 69, 0.1)' }
                    }}
                  >
                    <FaTrashAlt />
                  </IconButton>
                  <IconButton
                    onClick={() => selectedUser(user)}
                    color="warning"
                    sx={{ 
                      '&:hover': { backgroundColor: 'rgba(255, 193, 7, 0.1)' }
                    }}
                  >
                    <FaEdit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UserList;