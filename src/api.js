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


export default api;
