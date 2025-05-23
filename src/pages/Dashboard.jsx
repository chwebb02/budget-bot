import React, { useState, useEffect } from 'react';
import TransactionList from '../components/TransactionList';
import ChartCard from '../components/ChartCard';
import BudgetSummary from '../components/BudgetSummary';
import api, {API_ROUTES} from '../api';
import {useNavigate}  from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);
  
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const userId = sessionStorage.getItem('userID');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await api.get(API_ROUTES.getUserTransactions(userId))
        const budgetItemResponse = await api.get(API_ROUTES.getUserBudgetItems(userId))

        setTransactions(transactionResponse.data);
        setBudgets(budgetItemResponse.data);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    }

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const income = transactions.filter(t => t.value > 0).reduce((a, b) => a + b.value, 0);
  const expenses = transactions.filter(t => t.value < 0).reduce((a, b) => a + b.value, 0);
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
          <BudgetSummary budgets={budgets} />
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
