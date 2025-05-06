import React from 'react';
import {Routes, Route, Link, useNavigate}  from 'react-router-dom';
import Dashboard from './pages/Dashboard';
//import CreateTransaction from './pages/CreateTransaction'; 
//import CreateBudgetItem from './pages/CreateBudgetItem';   
import BudgetItemPageTabs from './pages/BudgetItemPage.jsx';
import TransactionPageTabs from './pages/TransactionPage.jsx';
import Login from './pages/Login'; 
import Register from './pages/Register';                        
import ReactEffect, { useEffect } from 'react';
import Header from './components/header';

function App() {
  useEffect(() => {
    document.title = 'BudgeBot';
  }, []);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("userID")
    navigate("/login");
  };

  return (
    <>
      <Header /> {/* ✅ This shows BudgeBot on all pages */}
      <nav className="sticky top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
  <div className="container mx-auto flex justify-between items-center p-4">
    <ul className="flex space-x-6 text-white font-medium">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/createTransaction">Transactions</Link></li>
      <li><Link to="/createBudgetItem">Budget Items</Link></li>
    </ul>
    <div className="flex items-center space-x-4">
  <Link to="/login" className="text-white font-medium hover:underline">
    Login
  </Link>
  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
  >
    Logout
  </button>
  </div>
  </div>
</nav>


    <div className="pt-16 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createTransaction" element={<TransactionPageTabs />} />
          <Route path="/createBudgetItem" element={<BudgetItemPageTabs />} />
          <Route path="/login" element={<Login />} />
            {/* Register route is here, but no nav link */}
            <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
