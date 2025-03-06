import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Direct backend URL
});

export const fetchSneakers = (params = {}) =>
    api.get('/sneakers', { params });