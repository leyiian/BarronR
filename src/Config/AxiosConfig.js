import axios from 'axios';
import Config from './Config';

const instance = axios.create({
  baseURL: Config.baseURL,
});

// Add a request interceptor to attach the headers dynamically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
