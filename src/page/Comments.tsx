import CommentList from './../component/CommentList';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apiClient from "../apiClient/ApiClient"
import { FaRegComment } from 'react-icons/fa';

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

    useEffect(() => {
        getCommnets()
    }, [id])

    function getCommnets(){
        apiClient.get<CommentType[]>(`/posts/${id}/comments`)
        .then(res => setComments(res.data))
        .catch(err => console.log(err))
    }

  return (
    <div className="container mt-3">
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
        <CommentList comments={comments}/>
    </div>
  )
}

export default Comments