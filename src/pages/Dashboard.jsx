import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import ChartCard from '../components/ChartCard';
import BudgetSummary from '../components/BudgetSummary';
import api, {API_ROUTES} from '../api/api';

function TransactionList() {
  const[txs, setTxs] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getTransactions(userId).then(res => setTxs(res.data));
  }, [userId]);

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTxs(txs.filter(tx => tx.id !== id));
  };

  return(
    <ul>
      {txs.map(tx => (
        <li key={tx.id} className="flex justify-between items-center p-4 bg-white shadow rounded mb-2">
          <div>
            <h3 className="text-lg font-semibold">{tx.description}</h3>
            <p className="text-gray-600">${tx.amount.toFixed(2)}</p>
          </div>
          <button onClick={() => handleDelete(tx.id)} className="text-red-500 hover:text-red-700">Delete</button>
        </li>
      ))}
    </ul>
  )
}

const mockTransactions = [
  { id: 1, description: 'Groceries', amount: -50, category: 'Food', date: '2025-04-20' },
  { id: 2, description: 'Salary', amount: 2000, category: 'Income', date: '2025-04-18' },
  { id: 3, description: 'Coffee', amount: -5, category: 'Food', date: '2025-04-18' },
  { id: 4, description: 'Gym', amount: -45, category: 'Health', date: '2025-04-17' },
  { id: 5, description: 'Gas', amount: -30, category: 'Transport', date: '2025-04-17' },
  { id: 6, description: 'Freelance Work', amount: 500, category: 'Income', date: '2025-04-15' }
];

const mockBudgets = [
  { id: 1, category: 'Food', value: 400, description: 'Monthly groceries and dining' },
  { id: 2, category: 'Housing', value: 1300, description: 'Rent and utilities' },
  { id: 3, category: 'Transportation', value: 150, description: 'Gas and travel' },
  { id: 4, category: 'Entertainment', value: 100, description: 'Movies and outings' }
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(API_ROUTES.TRANSACTIONS, { params: { userId } });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchBudgets = async () => {
      try {
        const response = await api.get(API_ROUTES.BUDGETS, { params: { userId } });
        const mapped = response.data.map(tx => ({
          id: tx.id,
          description: tx.description,
          value: tx.value,
          category: tx.category,
          date: new Date(tx.date).toISOString().split('T')[0]
        }));
        setTransactions(mapped);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
  };

if (userId) {
    fetchTransactions();
    fetchBudgets();
  }
}, [userId]);

  const income = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((a, b) => a + b.amount, 0);
  const balance = income + expenses;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-xl">${balance.toFixed(2)}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-xl text-green-800">${income.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-xl text-red-800">${Math.abs(expenses).toFixed(2)}</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (2/3): Transactions + Budget */}
        <div className="lg:col-span-2 space-y-6">
          <TransactionList transactions={transactions.slice(0, 5)} />
          <BudgetSummary budgets={mockBudgets} />
        </div>

        {/* Right (1/3): Chart */}
        <div className="flex justify-end items-start">
          <div className="w-[300px] h-[300px]">
            <ChartCard transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
