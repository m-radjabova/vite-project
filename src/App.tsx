import { ChangeEvent, useEffect, useRef, useState } from "react";
import PostList from "./component/PostList";
import UserSelect from "./component/UserSelect";
import apiClient from "./apiClient/ApiClient";
import { FaSearch } from "react-icons/fa";
import PageAndLimit from "./component/PageAndLimit";
import { Button, createTheme, TextField } from "@mui/material";
import axios from "axios";
import AddPostForm from "./component/AddPostForm";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User{
  id: number;
  name: string
}

export interface NewPost {
  userId: number;
  title: string;
  body: string;
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [open, setOpen] = useState(false);

  const searchTimeout = useRef<number | null>(null);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, [page, limit, search, selectedUsers]);

  function getPosts() {
    let url = `/posts?_page=${page}&_limit=${limit}`;
    
    if (search) {
      url += `&title_like=${search}`;
    }
    
    if (selectedUsers.length > 0) {
      url += `&userId=${selectedUsers.join('&userId=')}`;
    }

    axios.get(apiClient.defaults.baseURL + url)
      .then((response) => {
        setPageSize(Math.floor(response.headers['x-total-count'] / limit));
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function getUsers() {
    axios.get(
      apiClient.defaults.baseURL + `/users`
    ).then((res) => setUsers(res.data));
  }



  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
        setSearch(value);
    }, 2000);
  }

  async function addPost(newPost: NewPost) {
    try {
      const response = await axios.post<Post>(
        apiClient.defaults.baseURL + '/posts',
        newPost
      );
      getPosts();
      alert("Post added successfully!");
      return response.data;
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }

  return (
    <div className="container mt-5" >
      <div className="d-flex justify-content-end">
        <Button onClick={handleOpen} className="mb-3" variant="outlined">Add Post</Button>
      </div>
      <AddPostForm 
        open={open}
        onClose={handleClose}
        users={users}
        onUserSelect={async (newPost) => {
          await addPost(newPost);
        }}
      />
        <TextField
            onChange={handleSearch}
            fullWidth
            label="Search posts..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <FaSearch
                  style={{
                    color: theme.palette.primary.main,
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

          <PageAndLimit 
            pageSize={pageSize} 
            limit={limit} 
            setLimit={setLimit} 
            setPage={setPage}
          />
          <UserSelect 
            users={users} 
            selectedUsers={selectedUsers} 
            setSelectedUsers={setSelectedUsers} 
          />

          <PostList posts={posts} />

    </div>
  );
}

export default App;