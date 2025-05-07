import React, { useState, useEffect } from 'react';
import api, { API_ROUTES } from '../api';
import { useNavigate } from 'react-router-dom';

function NewBudgetItem(onAddItem) {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);

  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userID = sessionStorage.getItem("userID");
      const details = await api.post(API_ROUTES.createBudgetItem, {
        userID,
        value,
        category,
        description
      });
      setValue('');
      setCategory('');
      setDescription('');
      alert('Item created successfully!');
      onAddItem(details.data);
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-indigo-100 p-6 rounded shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pl-10">Create a Budget Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-[45px]">
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Value ($)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
        </div>
        <div className="flex flex-col">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 text-base border border-gray-300 rounded w-[80%]"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded text-base hover:bg-green-700 w-fit"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default NewBudgetItem;
