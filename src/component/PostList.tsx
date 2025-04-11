import { Post } from "../App";
import { FaUser, FaHashtag, FaRegClock } from 'react-icons/fa';

interface Props {
  posts: Post[];
}

function PostList({ posts }: Props) {

  
  return (
    <div className="container-fluid p-4" style={{ backgroundColor: '#f0f8ff' }}>
      <div className="row g-4 justify-content-center">
        {(posts).map((post, index) => (
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
                style={{ transition: 'opacity 0.3s ease' }}
              />
              
              {post ? (
                <>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                        <FaUser className="text-primary" size={14} />
                      </div>
                      <span className="text-muted small">User {post.userId}</span>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;