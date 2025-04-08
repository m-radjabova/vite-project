import { useEffect, useState } from "react";
import UserForm from "./component/UserForm";
import UserList from "./component/UserList";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { FaUserPlus, FaSearch, FaUserCog } from "react-icons/fa";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c96f5", 
    },
    secondary: {
      main: "#a0e4cb", 
    },
    background: {
      default: "#fafafa", 
      paper: "#ffffff", 
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#9c96f5",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

function App() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
      setAllUsers(res.data);
    });
  }, []);


  function addUser(data: Omit<User, "id">) {
    const usersx = [...users];
    const newUser: User = { ...data, id: users.length + 1 };
    setUsers([...usersx, newUser]);
    setAllUsers([...allUsers, newUser]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        setUsers([...usersx, res.data]);
        setAllUsers([...allUsers, res.data]);
        toast.success("User is saved successfully");
        handleClose();
      })
      .catch((err) => {
        setUsers(usersx);
        setAllUsers(allUsers);
        toast.error(err.message);
      });
  }

  function updateUser(updatedUser: User) {
    const usersx = [...users];
    const allUsersx = [...allUsers];

    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setAllUsers(
      allUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );

    axios
      .patch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      )
      .then((res) => {
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? res.data : user))
        );
        setAllUsers(
          allUsers.map((user) => (user.id === updatedUser.id ? res.data : user))
        );
        toast.success("User updated successfully");
        handleClose();
      })
      .catch((err) => {
        setUsers(usersx);
        setAllUsers(allUsersx);
        toast.error(err.message);
      });
  }

  const deleteUser = (id: number) => {
    const usersx = [...users];
    const allUsersx = [...allUsers];

    setUsers(users.filter((user) => user.id !== id));
    setAllUsers(allUsers.filter((user) => user.id !== id));

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        setUsers(usersx);
        setAllUsers(allUsersx);
        toast.error("Error deleting user");
      });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setUsers(allUsers);
    } else {
      axios
        .get(`https://jsonplaceholder.typicode.com/users?name_like=${search}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [search, allUsers]);
  

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          padding: { xs: 2, md: 4 },
        }}
      >
        <Paper
          sx={{
            padding: 4,
            maxWidth: 1200,
            margin: "0 auto",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FaUserCog
                style={{
                  fontSize: "1.75rem",
                  color: theme.palette.primary.main,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#5a5a5a",
                }}
              >
                User Management
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<FaUserPlus style={{ fontSize: "1rem" }} />}
              onClick={handleOpen}
              sx={{
                borderRadius: "12px",
                padding: "10px 20px",
                color: "#ffff"
              }}
            >
              Add User
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Search users..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <FaSearch
                  style={{
                    color: "#9e9e9e",
                    marginRight: "8px",
                  }}
                />
              ),
            }}
            sx={{
              marginBottom: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <UserForm
            open={open}
            onClose={handleClose}
            addUser={addUser}
            updateUser={updateUser}
            selectedUser={selectedUser}
          />

          <UserList
            users={users}
            deleteUser={deleteUser}
            selectedUser={handleEdit}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;