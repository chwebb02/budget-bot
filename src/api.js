import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080'; 

export const API_ROUTES = {
  login: '/api/auth/login',
  register: '/api/auth/register',
  transactions: '/api/transactions',
  budgets: '/api/budgets'
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: Inject token if it exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
