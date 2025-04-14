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
  const [openAdd, setOpenAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const searchTimeout = useRef<number | null>(null);


  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => {
    setOpenAdd(false);
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

  function deletePost(id: number) {
    const postCopy = [...posts];
  
    setPosts(postCopy.filter(post => post.id !== id));
  
    axios.delete(apiClient.defaults.baseURL + `/posts/${id}`)
      .then(() => {
        toast.success("Post deleted successfully");
      }).catch((error) => {
        setPosts(postCopy);
        toast.error("Failed to delete post: " + error.message);
      });
  }

  function updatePost(updatedPost: Post) {
    const postCopy = [...posts];
  
    setPosts(postCopy.map(post => post.id === updatedPost.id ? updatedPost : post));

    axios.patch(apiClient.defaults.baseURL + `/posts/${updatedPost.id}`, updatedPost)

      .then((res) => {
        toast.success("Post updated successfully");
        setPosts(posts.map((post) => 
          post.id === updatedPost.id ? res.data : post
        ))
      }).catch((error) => {
        setPosts(postCopy);
        toast.error("Failed to update post: " + error.message);
      });
  }

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setOpenAdd(true);
  }
  
  return (
    <div className="container mt-3 posts-container">
    {isLoading && <Loading />}
  
    <div className="posts-header">
      <Typography variant="h4" className="posts-title">
        <FaNewspaper style={{ fontSize: '1.5rem' }} />
        Posts
        <span className="posts-count">
          {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
        </span>
      </Typography>
  
      <Button 
        onClick={handleOpen} 
        variant="contained" 
        startIcon={<FaPlus />}
        className="add-post-btn"
      >
        Add Post
      </Button>
    </div>
  
    <AddPostForm 
      addPosts={addPosts}
      updatePost={updatePost}
      selectedPost={selectedPost}
      openAdd={openAdd}
      onClose={handleClose}
      users={users}
    />
  
    <div className="search-section">
      <TextField
        onChange={handleSearch}
        fullWidth
        label="Search posts..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch style={{ color: 'var(--primary-main)' }} />
            </InputAdornment>
          )
        }}
        className="search-input"
        sx={{ marginBottom: 3 }}
      />
  
      <div className="filters">
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
  
    {!isLoading && <PostList 
      handleEdit={handleEdit}
      selectedPost={(post: Post) => setSelectedPost(post)}
      deletePost={deletePost} 
      users={users} 
      posts={posts} 
      />}
  
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
              backgroundColor: '#f0f8ff'
            }
          }}
        >
          Load More Posts
        </Button>
  
      <Typography variant="body2" 
        sx={{
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