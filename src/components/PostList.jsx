import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await api.get();
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/${id}`);
                fetchPosts();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Board</h2>
            <Link to="/create" className="btn btn-primary mb-3">Create New Post</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                            <td>{post.author}</td>
                            <td>
                                <Link to={`/edit/${post.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;
