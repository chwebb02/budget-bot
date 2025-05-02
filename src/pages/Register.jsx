import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { API_ROUTES } from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = e => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post(API_ROUTES.register, formData);
      alert('Account created! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error creating account.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
