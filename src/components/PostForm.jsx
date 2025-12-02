import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const PostForm = () => {
    const [post, setPost] = useState({ title: '', content: '', author: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await api.put(`/${id}`, post);
            } else {
                await api.post('', post);
            }
            navigate('/');
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    return (
        <div className="container">
            <h2>{id ? 'Edit Post' : 'Create Post'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={post.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" name="author" value={post.author} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" name="content" rows="5" value={post.content} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-success">Save</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default PostForm;
