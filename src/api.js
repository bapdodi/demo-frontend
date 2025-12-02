import axios from 'axios';

const api = axios.create({
    baseURL: 'http://161.97.130.200:30610/api/posts',
});

export default api;
