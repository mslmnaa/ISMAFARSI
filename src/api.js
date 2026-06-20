import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.PUBLIC_URL || ''}/api`,
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
