// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { API_ROUTES } from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await api.post(API_ROUTES.login, formData);
    
      sessionStorage.setItem("userID", response); 
    
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in.");
    }    
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium">Username</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>

      {/* Register link now inside the returned JSX */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
