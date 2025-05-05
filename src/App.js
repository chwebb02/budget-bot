import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateTransaction from './pages/CreateTransaction'; // create soon
//import CreateBudgetItem from './pages/CreateBudgetItem';   // create soon
//import NewBudgetItem from './pages/createItem.jsx';
import Login from './pages/Login';   
import BudgetItemPageTabs from './pages/BudgetItemPage.jsx';                    

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4 text-white">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/createTransaction">Add Transaction</Link></li>
          <li><Link to="/newBudgetItem">Add Budget Item</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/createTransaction" element={<CreateTransaction />} />
          <Route path="/newBudgetItem" element={<BudgetItemPageTabs />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
