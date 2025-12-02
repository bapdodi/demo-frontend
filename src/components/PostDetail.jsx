import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/${id}`);
                navigate('/');
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{post.title}</h2>
            <p className="text-muted">By {post.author} on {new Date(post.createdAt).toLocaleString()}</p>
            <hr />
            <div className="mb-4">
                {post.content}
            </div>
            <Link to="/" className="btn btn-secondary me-2">Back to List</Link>
            <Link to={`/edit/${post.id}`} className="btn btn-warning me-2">Edit</Link>
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
    );
};

export default PostDetail;
