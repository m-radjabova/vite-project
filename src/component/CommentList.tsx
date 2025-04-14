import { CommentType } from "../page/Comments";
import { FaUser, FaRegEnvelope, FaRegHeart, FaReply,FaIdCard, FaTrashAlt} from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

interface Props {
    comments: CommentType[]
    deleteComment: (id: number) => void
}

function CommentList({ comments, deleteComment}: Props) {

  return (
    <div className="row">
        <div className="col-lg-12 col-xl-12">
            {comments.length === 0 ? (
            <div className="text-center py-5">
                <div className="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-3">
                <FaUser className="text-primary" size={32} />
                </div>
                <h4 className="text-muted mb-2">No comments yet</h4>
                <p className="text-muted">Be the first to share your thoughts!</p>
            </div>
            ) : (
            <div className="mt-3">
                {comments.map(comment => (
                <div 
                    key={comment.id}
                    className="card mb-4 border-0 shadow-sm"
                    style={{
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease',
                    }}
                >
                    <div className="card-body p-4">
                    <div className="d-flex align-items-start gap-3">
                        <div className="position-relative">

                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                            <FaUser className="text-primary" size={18} />
                        </div>
                         <RiVerifiedBadgeFill 
                            className="text-info position-absolute" 
                            style={{ bottom: 0, right: 0, fontSize: '14px' }}
                            />
                            {comment.postId}
                        </div>
                        
                        <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <div>
                            <h3 className="h6 card-title text-primary mb-0">
                                {comment.name || `User ${comment.userId}`}
                            </h3>
                            <div className="d-flex align-items-center gap-2 mt-1">
                                <span className="badge bg-light text-muted small d-flex align-items-center">
                                <FaRegEnvelope className="me-1" size={10} />
                                {comment.email}
                                </span>
                                <span className="badge bg-light text-muted small d-flex align-items-center">
                                <FaIdCard className="me-1" size={10} />
                                ID: {comment.id}
                                </span>
                            </div>
                            </div>
                            <button className="btn btn-link text-muted p-0">
                            <BsThreeDotsVertical />
                            </button>
                        </div>
                        
                        <p className="card-text text-dark mb-3">
                            {comment.body}
                        </p>
                        
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                                <FaRegHeart size={14} />
                                <span>Like</span>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                                <FaReply size={14} />
                                <span>Reply</span>
                            </button>
                            <button onClick={() => deleteComment(comment.id)} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                                <FaTrashAlt size={14} />
                                <span>Delete</span>
                            </button>
                        </div> 
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
  )
}

export default CommentList