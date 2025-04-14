import CommentList from './../component/CommentList';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiClient from "../apiClient/ApiClient"
import { FaPlus, FaRegComment } from 'react-icons/fa';
import { Button } from '@mui/material';
import AddCommentForm from '../component/AddCommentForm';
import { toast } from 'react-toastify';

export interface CommentType {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
    userId: number
}

function Comments() {
    const { id } = useParams()
    const [comments, setComments] = useState<CommentType[]>([])
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getComments();
    }, [id])

    function getComments() {
        setLoading(true);
        apiClient.get<CommentType[]>(`/posts/${id}/comments`)
            .then(res => {
                setComments(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    const addComments = (data: Omit<CommentType, "id" | "postId" | "userId">) => {
        const copyComment = [...comments]
        const newComment: CommentType = {
            ...data, 
            id: comments.length + 1,
            postId: Number(id),  
            userId: 1      
                
        }
        setComments([...copyComment, newComment])
    
        apiClient.post(`/posts/${id}/comments`, newComment)
            .then(res => {
                setComments([...copyComment, res.data]);
                toast.success("Comment added successfully");
            })
            .catch(err => {
                setComments(copyComment);
                toast.error("Failed to add comment: " + err.message);
            });
    }

    const deleteComment = async (commentId: number) => {
        const originalComments = [...comments];
        
        try {
          setComments(comments.filter(comment => comment.id !== commentId));
             await apiClient.delete(`/comments/${commentId}`); 
            toast.success("Comment deleted successfully");
        } catch (err) {
          setComments(originalComments);
          toast.error("Failed to delete comment: " + (err as Error).message);
        }
    };

    return (
        <div className="container mt-3">
            <div className='d-flex justify-content-between'>
                <h2 className="text-primary mb-0" style={{ fontWeight: 600 }}>
                    <FaRegComment className="me-2" style={{ transform: 'translateY(-2px)' }} />
                    Comments
                    <span className="badge bg-primary bg-opacity-10 text-primary ms-2" style={{ 
                        fontSize: '0.8rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '50px'
                    }}>
                        {comments.length}
                    </span>
                </h2>
                <Button
                    sx={{
                        backgroundColor: '#1e88e5',
                        color: '#fff',
                        textTransform: 'capitalize',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                        backgroundColor: '#1976d2',
                        }
                    }}
                    onClick={handleOpen}
                    variant="contained"
                    startIcon={<FaPlus />}
                    className="add-post-btn"
                    disabled={loading}
                >
                    Add Comment
                </Button>
            </div>
            <AddCommentForm 
                addComments={addComments}
                open={open} 
                onClose={handleClose}
            />

            <CommentList 
                deleteComment={deleteComment}
                comments={comments} 
            />
        </div>
    )
}
export default Comments;