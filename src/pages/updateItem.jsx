import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { API_ROUTES } from '../api.js';

function UpdateBudgetItem() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) {
      console.error('No userID found in sessionStorage!');
      return;
    }
    try {
      const response = await api.get(API_ROUTES.getUserBudgetItems(userID));
      setItems(response.data);
    } catch (err) {
      console.error('Failed to fetch items:', err);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedId(id);
    const item = items.find((itm) => itm._id === id);
    setValue(item.value);
    setCategory(item.category);
    setDescription(item.description);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await api.put(API_ROUTES.updateBudgetItem, {
        _id: selectedId,
        value,
        category,
        description,
      });
      await fetchItems();
      setShowForm(false);
      setSelectedId(null);
      alert('Item updated successfully!');
    } catch (err) {
      alert('Update failed');
      console.error('Update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedId(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow">
      {!showForm ? (
        <div className="space-y-3">
          <h2 className="text-lg font-bold mb-2">Choose an Item to Update</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No budget items found.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => handleCheckboxChange(item._id)}
                  disabled={isUpdating}
                />
                <span className="text-sm text-gray-800">
                  ${item.value} - {item.category} - {item.description}
                </span>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-gray-800 mb-4 pl-10">Update Budget Item</h2>
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
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateBudgetItem;
