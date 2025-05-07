import React, { useEffect, useState } from 'react';
import api, { API_ROUTES } from '../api';
import { useNavigate } from 'react-router-dom';

function DeleteTransaction() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userID") == null) {
      navigate("/login");
    }
  }, [navigate]);

  const [transactions, setTransactions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) return;
    try {
      const response = await api.get(API_ROUTES.getUserTransactions(userID));
      setTransactions(response.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const transactionId = selectedIds[0];
    setIsDeleting(true);

    try {
      await api.delete(API_ROUTES.deleteTransaction(transactionId));
      setTransactions((prev) => prev.filter((t) => t._id !== transactionId));
      setSelectedIds([]);
      alert('Transaction deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete transaction');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Choose a Transaction to Delete</h2>
      <div className="space-y-2 mb-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <label key={transaction._id} className="flex items-center gap-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={selectedIds.includes(transaction._id)}
                onChange={() => handleCheckboxChange(transaction._id)}
                disabled={isDeleting}
              />
              <span>
                ${transaction.value} - {transaction.category} - {transaction.description} -{' '}
                {transaction.date?.substring(0, 10)}
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
        {isDeleting ? 'Deleting...' : 'Delete Transaction'}
      </button>
    </div>
  );
}

export default DeleteTransaction;
