import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
    baseURL: 'https://api.example.com',
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage or wherever you store it
        const token = localStorage.getItem('token');

        // If the token exists, add it to the headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;