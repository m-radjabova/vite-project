import { ChangeEvent, useEffect, useRef, useState } from "react";
import PostList from "../component/PostList";
import UserSelect from "../component/UserSelect";
import apiClient from "../apiClient/ApiClient";
import { FaArrowDown, FaInfoCircle, FaNewspaper, FaPlus, FaSearch } from "react-icons/fa";
import PageAndLimit from "../component/PageAndLimit";
import { Button, createTheme, InputAdornment, TextField, Typography } from "@mui/material";
import axios from "axios";
import AddPostForm from "../component/AddPostForm";
import { toast } from "react-toastify";
import Loading from "../component/Loading";

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

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchTimeout = useRef<number | null>(null);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPosts();
    getUsers();
  }, [page, limit, search, selectedUser]);

  function getPosts() {
    setIsLoading(true);
    let url = `/posts?_page=${page}&_limit=${limit}`;
  
    if (search) {
      url += `&title_like=${search}`;
    }
  
    if (selectedUser !== "") {
      url += `&userId=${selectedUser}`;
    }
  
    axios
      .get(apiClient.defaults.baseURL + url)
      .then((response) => {
        setPageSize(Math.floor(response.headers["x-total-count"] / limit));
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false)
      })
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

    setIsLoading(true)

    searchTimeout.current = setTimeout(() => {
        setSearch(value);
    }, 1000);
  }

  function addPosts(data: Omit<Post, "id">) {
    const postCopy = [...posts];
    const newPost: Post = { ...data, id: posts.length + 1 };
  
    setPosts([...postCopy, newPost]);
  
    axios.post(apiClient.defaults.baseURL + `/posts`, newPost)
      .then((res) => {
        setPosts([...postCopy, res.data]);
        toast.success("Post saved successfully");
      }).catch((error) => {
        setPosts(postCopy);
        toast.error("Failed to add post: " + error.message);
      });
  }
  

  return (
    <div className="container mt-5" style={{ maxWidth: '1200px' }}>
      {isLoading && <Loading />}
      <div className="d-flex justify-content-between align-items-center mb-4" style={{
        borderBottom: `2px solid ${theme.palette.primary.light}`,
        paddingBottom: '1rem'
      }}>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <FaNewspaper style={{ fontSize: '1.5rem' }} />
          Posts
          <span style={{
            fontSize: '1rem',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            padding: '4px 12px',
            borderRadius: '20px',
            marginLeft: '12px'
          }}>
            {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
          </span>
        </Typography>
        
        <Button 
          onClick={handleOpen} 
          variant="contained" 
          startIcon={<FaPlus />}
          sx={{
            borderRadius: '8px',
            padding: '8px 20px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0, 0, 255, 0.1)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0, 0, 255, 0.15)'
            }
          }}
        >
          Add Post
        </Button>
      </div>

      <AddPostForm 
        addPosts={addPosts}
        open={open}
        onClose={handleClose}
        users={users}
      />

      <div className="mb-4 p-4" style={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <TextField
          onChange={handleSearch}
          fullWidth
          label="Search posts..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
            style: { borderRadius: '12px' }
          }}
          sx={{
            marginBottom: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />

        <div className="d-flex flex-wrap gap-3">
          <UserSelect
            users={users}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          
          <PageAndLimit 
            pageSize={pageSize} 
            limit={limit} 
            setLimit={setLimit} 
            setPage={setPage}
          />
        </div>
      </div>

      {!isLoading && <PostList users={users} posts={posts} />}

      <div className="text-center mt-4 mb-5">
        <Button
          onClick={() => setLimit(limit + 10)}
          variant="outlined"
          endIcon={<FaArrowDown />}
          sx={{
            borderRadius: '8px',
            padding: '10px 28px',
            fontSize: '1rem',
            fontWeight: 600,
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px',
              backgroundColor: theme.palette.primary.light
            }
          }}
        >
          Load More Posts
        </Button>
        
        <Typography variant="body2" sx={{
          color: theme.palette.text.secondary,
          marginTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <FaInfoCircle />
          Showing {Math.min(limit, posts.length)} of {posts.length} posts
        </Typography>
      </div>
    </div>
  );
}

export default Posts;