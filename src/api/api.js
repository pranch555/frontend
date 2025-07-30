import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // backend server
  withCredentials: true,
});

export default api;