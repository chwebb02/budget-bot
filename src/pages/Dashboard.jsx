import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import ChartCard from '../components/ChartCard';
import BudgetSummary from '../components/BudgetSummary';

//TODO: Once axios is implemented, the mock data below will need to be removed.
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

  useEffect(() => {
    // Temporary mock data; later you will replace with axios.get() call
    setTransactions(mockTransactions);
  }, []);

  // Calculate totals
  const income = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((a, b) => a + b.amount, 0);
  const balance = income + expenses;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
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

        <div className="grid grid-cols-2 gap-4">
            <ChartCard transactions={transactions} />
            <TransactionList transactions={transactions.slice(0, 5)} />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6">
            <BudgetSummary budgets={mockBudgets} />
        </div>

    </div>
  );
};

export default Dashboard;
