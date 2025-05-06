import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080'; 

export const API_ROUTES = {
  login: '/user/login',
  register: '/user/register',
  createTransaction: '/transaction/create',
  getUserTransactions: (userId) => `/user/${userId}/transactions`,
  getTransaction: (transactionId) => `transaction/${transactionId}`,
  updateTransaction: '/transaction',
  deleteTransaction: (transactionId) => `transaction/${transactionId}`,
  getUserBudgetItems: (userId) => `/user/${userId}/budgetItems`,
  getBudgetItem: (budgetItemId) => `budgetItem/${budgetItemId}`,
  updateBudgetItem: '/budgetItem',
  deleteBudgetItem: (budgetItemId) => `transaction/${budgetItemId}`
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
