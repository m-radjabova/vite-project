import { Post, User } from "../page/Posts";
import { FaUser, FaHashtag, FaRegClock, FaRegHeart} from 'react-icons/fa';
import { FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  posts: Post[];
  users: User[];
}

function PostList({ posts, users }: Props) {
  const userNameById = (userId: number) => {
    return users.find(user => user.id === userId);
  };
  
  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="row g-4 justify-content-center">
        {(posts).map((post, index) => {
          const user = userNameById(post.userId);
          const userName = user ? user.name : `User ${post.userId}`;
          
          return (
            <div 
              key={post ? `post-${post.id}` : `skeleton-${index}`} 
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ minWidth: '280px', maxWidth: '400px' }}
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

                <div className="card-footer" style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  padding: '0.75rem 1.25rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  borderTop: '1px solid rgba(0, 0, 0, 0.125)'
                }}>
                  <button className="btn btn-outline-primary d-flex align-items-center gap-2" style={{
                    borderRadius: '20px',
                    padding: '0.375rem 1rem',
                    transition: 'all 0.2s ease-in-out',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}>
                    <FaRegHeart  style={{ fontSize: '0.9rem' }} />
                    <span>Like</span>
                  </button>
                  <Link to={`/Posts/${post.id}/Comments`} style={{ textDecoration: 'none' }} >
                    <button className="btn btn-outline-primary d-flex align-items-center gap-2 ms-2" style={{
                      borderRadius: '20px',
                      padding: '0.375rem 1rem',
                      transition: 'all 0.2s ease-in-out',
                      fontSize: '0.9rem',
                      cursor: 'pointer'
                    }}>
                      <FaRegCommentAlt style={{ fontSize: '0.9rem' }} />
                      <span>Comments...</span>
                    </button>
                  </Link>
                </div>
              </div> 
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostList;