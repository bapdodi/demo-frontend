import axios from 'axios';

const api = axios.create({
    baseURL: 'http://161.97.130.200:8080/api/posts',
});

export default api;
