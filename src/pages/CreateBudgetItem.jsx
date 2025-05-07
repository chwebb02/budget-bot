import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api, { API_ROUTES } from '../api';

const CreateBudgetItem = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!sessionStorage.getItem("username");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    category: '',
    value: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post(API_ROUTES.createBudgetItem, formData);
      alert('Budget item created!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error creating budget item.');
    }
  };

  return (
    <div className="max-w-[500px] w-full mx-auto mt-[120px] p-5 bg-indigo-100 rounded-lg shadow text-gray-800 font-sans flex flex-col relative z-[5]">
      <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap pl-10 mb-4">Add New Budget Item</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] w-full px-[45px] bg-white p-6 rounded shadow">
        <div className="flex flex-col">
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="block font-medium">Budget Value ($)</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded text-base hover:bg-green-700 w-fit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBudgetItem;
