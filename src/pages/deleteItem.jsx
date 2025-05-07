import React, { useEffect, useState } from 'react';
import api, { API_ROUTES } from '../api';
import { useNavigate } from 'react-router-dom';

function DeleteBudgetItem() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);

  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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

    fetchItems();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    const itemId = selectedIds[0];
    setIsDeleting(true);

    try {
      const response = await api.delete(API_ROUTES.deleteBudgetItem(itemId));

      if (response.status === 200) {
        setItems((prev) => prev.filter((item) => item._id !== itemId));
        setSelectedIds([]);
        alert('Item deleted successfully!');
      } else {
        alert('Failed to delete item.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('An error occurred while deleting the item.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Choose an Item to Delete</h2>

      <div className="space-y-2 mb-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No budget items found.</p>
        ) : (
          items.map((item) => (
            <label key={item._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(item._id)}
                onChange={() => handleCheckboxChange(item._id)}
                disabled={isDeleting}
              />
              <span className="text-sm text-gray-800">
                ${item.value} - {item.category} - {item.description}
              </span>
            </label>
          ))
        )}
      </div>

      <button
        onClick={handleDelete}
        disabled={selectedIds.length !== 1 || isDeleting}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isDeleting ? 'Deleting...' : 'Delete Item'}
      </button>
    </div>
  );
}

export default DeleteBudgetItem;
