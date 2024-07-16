import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`, // Replace with your API base URL
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.token) {
      config.headers['Authorization'] = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // If the error status is 401 (Unauthorized), sign out the user
      await signOut({ redirect: false });
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;