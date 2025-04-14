import { Box, Button, Modal, Typography } from "@mui/material";
import { Post, User } from "../page/Posts";
import { FaUser, FaHashtag, FaRegClock, FaRegHeart, FaTrash, FaEdit, FaExclamationTriangle, FaTimes, FaInfoCircle} from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from "react";

interface Props {
  posts: Post[];
  users: User[];
  deletePost: (id: number) => void;
  handleEdit: (post: Post) => void;
  selectedPost: (post: Post) => void;
}

function PostList({ posts, users, deletePost, handleEdit, selectedPost}: Props) {
  const userNameById = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  const [openDel, setOpenDel] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
    const handleOpen = (post: Post) => {
      setPostToDelete(post); 
      setOpenDel(true);
    };

    
    const handleClose = () => {
      setPostToDelete(null);
      setOpenDel(false);
    };
  
    const handleDeletePost= () => {
      if (postToDelete) {
        deletePost(postToDelete.id);
        handleClose();
      }
    };
  
  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
      <div className="row g-4 justify-content-center">
        {(posts).map((post, index) => {
          const user = userNameById(post.userId);
          const userName = user ? user.name : `User ${post.userId}`;
          
          return (
            <div 
              key={post ? `post-${post.id}` : `skeleton-${index}`} 
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ minWidth: '390px', maxWidth: '410px' }}
            >
              <div 
                className="card h-100 border-0 overflow-hidden"
                style={{
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
              >
                <div 
                  className="card-img-overlay bg-primary bg-opacity-10 opacity-0" 
                  style={{ transition: 'opacity 0.3s ease', zIndex: -1 }}
                />
                
                {post ? (
                  <>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                          <FaUser className="text-primary" size={14} />
                        </div>
                        <span className="text-muted small">{userName}</span>
                      </div>
                      
                      <h5 
                        className="card-title fw-semibold mb-3" 
                        style={{ 
                          color: '#1e3a8a',
                          minHeight: '64px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {post.title}
                      </h5>
                      
                      <p 
                        className="card-text text-secondary mb-4 flex-grow-1" 
                        style={{ 
                          lineHeight: '1.6',
                          fontSize: '0.9rem'
                        }}
                      >
                        {post.body.length > 100
                          ? `${post.body.substring(0, 100)}...`
                          : post.body}
                      </p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="badge bg-light text-primary border border-primary d-flex align-items-center py-2">
                          <FaHashtag className="me-1" size={12} />
                          {post.id}
                        </span>
                        <span className="text-muted small d-flex align-items-center">
                          <FaRegClock className="me-1" size={12} />
                          {Math.floor(Math.random() * 10) + 1}m ago
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3 placeholder-wave">
                        <span className="placeholder rounded-circle" style={{ width: '36px', height: '36px' }}></span>
                        <span className="placeholder col-4 ms-3" style={{ height: '16px' }}></span>
                      </div>
                      
                      <div className="placeholder-glow">
                        <span className="placeholder col-8 rounded mb-3" style={{ height: '28px' }}></span>
                        <span className="placeholder col-12 rounded mb-2" style={{ height: '16px' }}></span>
                        <span className="placeholder col-12 rounded mb-2" style={{ height: '16px' }}></span>
                        <span className="placeholder col-6 rounded mb-2" style={{ height: '16px' }}></span>
                      </div>
                      
                      <div className="d-flex justify-content-between mt-4 placeholder-wave">
                        <span className="placeholder col-2 rounded" style={{ height: '24px' }}></span>
                        <span className="placeholder col-3 rounded" style={{ height: '16px' }}></span>
                      </div>
                    </div>
                  </>
                )}

                <div className="card-footer " style={{ 
                  padding: '0.75rem 1.25rem 1.25rem',
                }}>
                  <div className="d-flex justify-content-between align-items-center flex-column gap-3">
                    <div className="d-flex">
                      <button 
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3"
                        style={{
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          height: '32px'
                        }}
                      >
                        <FaRegHeart style={{ fontSize: '0.85rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>Like</span>
                      </button>
                      
                      <Link 
                        to={`/Posts/${post.id}/Comments`}
                        className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3 ms-2"
                        style={{
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          height: '32px',
                          textDecoration: 'none'
                        }}
                      >
                        <FaRegCommentAlt style={{ fontSize: '0.85rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>Comments</span>
                      </Link>
                    </div>
                    <div className="d-flex">
                      <button 
                        onClick={() => {
                          selectedPost(post);
                          handleEdit(post);
                        }}
                        className="btn btn-sm d-flex align-items-center gap-2 px-3"
                        style={{
                          borderRadius: '8px',
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#1d4ed8',
                          border: 'none',
                          transition: 'all 0.2s ease',
                          height: '32px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                        }}
                      >
                        <FaEdit style={{ fontSize: '0.85rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>Edit</span>
                      </button>
                      
                      <button
                        onClick={() => handleOpen(post)}
                        className="btn btn-sm d-flex align-items-center gap-2 px-3 ms-2"
                        style={{
                          borderRadius: '8px',
                          backgroundColor: 'rgba(220, 38, 38, 0.1)',
                          color: '#dc2626',
                          border: 'none',
                          transition: 'all 0.2s ease',
                          height: '32px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                        }}
                      >
                        <FaTrash style={{ fontSize: '0.85rem' }} />
                        <span style={{ fontSize: '0.8rem' }}>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          );
        })}
      </div>

      <Modal
        open={openDel}
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
          bgcolor: '#f5f9ff',
          boxShadow: 24,
          p: 4,
          borderRadius: '12px',
          border: '1px solid #c7d8ff', 
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: '#e6f0ff', 
            padding: '16px',
            margin: '-32px -32px 24px -32px',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
            borderBottom: '1px solid #c7d8ff'
          }}>
            <Typography
              id="modal-modal-title" 
              variant="h6" 
              component="h2"
              sx={{
                color: '#1a56db', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FaExclamationTriangle style={{ fontSize: '1.2rem', color: '#1a56db' }} />
              Delete Post
            </Typography>
          </div>
          
          <Typography 
            id="modal-modal-description" 
            sx={{ 
              mt: 2,
              color: '#1e429f',
              fontSize: '1.1rem'
            }}
          >
            Are you sure you want to delete this post? This action cannot be undone.
          </Typography>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '32px'
          }}>
            <Button
              variant="contained" 
              onClick={handleDeletePost}
              startIcon={<FaTrash />}
              sx={{
                bgcolor: '#3b82f6', 
                color: 'white',
                borderRadius: '8px',
                px: 3,
                py: 1,
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#1d4ed8',
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                }
              }}
            >
              Delete Post
            </Button>
            
            <Button
              variant="outlined" 
              onClick={handleClose}
              startIcon ={<FaTimes />}
              sx={{
                color: '#3b82f6', 
                borderColor: '#3b82f6',
                borderRadius: '8px',
                px: 3,
                py: 1,
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f5f9ff',
                  borderColor: '#1d4ed8',
                  color: '#1d4ed8'
                }
              }}
            >
              Cancel
            </Button>
          </div>
          
          <div style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px dashed #c7d8ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <FaInfoCircle style={{ color: '#3b82f6' }} />
            <Typography variant="caption" sx={{ color: '#3b82f6' }}>
              This will permanently remove the post and all its comments
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PostList;