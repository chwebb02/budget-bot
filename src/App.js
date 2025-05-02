import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTransaction from './pages/CreateTransaction'; 
import CreateBudgetItem from './pages/CreateBudgetItem';   
import Login from './pages/Login'; 
import Register from './pages/Register';                        

function App() {
  return (
    <Router>
      <nav className="fixed top-0 left-0 w-full bg-gray-800 border-b border-gray-700 z-50">
  <div className="container mx-auto flex justify-between items-center p-4">
    <ul className="flex space-x-6 text-white font-medium">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/createTransaction">Transactions</Link></li>
      <li><Link to="/createBudgetItem">Budget Items</Link></li>
    </ul>
    <Link to="/login" className="text-white font-medium hover:underline">
      Login
    </Link>
  </div>
</nav>


    <div className="pt-16 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createTransaction" element={<CreateTransaction />} />
          <Route path="/createBudgetItem" element={<CreateBudgetItem />} />
          <Route path="/login" element={<Login />} />
            {/* Register route is here, but no nav link */}
            <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
