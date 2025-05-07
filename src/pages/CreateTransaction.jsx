import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { API_ROUTES } from '../api';

function CreateTransaction() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    description: '',
    value: '',          // ✅ Changed from 'amount' to 'value'
    category: '',
    date: ''
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
      const userID = sessionStorage.getItem("userID");
      const payload = {
        ...formData,
        userID
      };

      await api.post(API_ROUTES.createTransaction, payload);

      alert('Transaction created successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error creating transaction:', err);
      alert('Failed to create transaction.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-indigo-100 p-6 rounded shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pl-10">Create a Transaction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-[45px]">
        <div className="flex flex-col">
          <label className="block font-medium">Amount ($)</label>
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
          <label className="block font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-[84%] px-1 py-[9px] border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Housing">Housing</option>
            <option value="Utilities">Utilities</option>
            <option value="Insurance">Insurance</option>
            <option value="Transportation">Transportation</option>
            <option value="HealthCare">Health Care</option>
            <option value="Childcare">Childcare</option>
            <option value="Shopping">Shopping</option>
            <option value="Travel">Travel</option>
            <option value="Savings">Savings</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="block font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="block font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
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
}

export default CreateTransaction;
