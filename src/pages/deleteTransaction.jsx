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

  // Fetch transactions
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


  // Single selection handling
  const handleCheckboxChange = (id) => {
    setSelectedIds(prev => prev.includes(id) ? [] : [id]);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const transactionId = selectedIds[0];
    setIsDeleting(true);

    try {
      await api.delete(API_ROUTES.deleteTransaction(transactionId));
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
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
    <div className='container'>
      <div className='transaction-list'>
        <h2>Choose a Transaction to Delete</h2>
        {transactions.length === 0
            ? null
            : transactions.map((transaction) => (
              <div key={transaction._id} className='all-transactions'>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(transaction._id)}
                  onChange={() => handleCheckboxChange(transaction._id)}
                  disabled={isDeleting}
                />
                ${transaction.value} - {transaction.category} - {transaction.description} - 
                {transaction.date?.substring(0,10)}
              </div>
            ))
        }
      </div>

      <button className="deleteButton"
        onClick={handleDelete}
        disabled={selectedIds.length !== 1 || isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete Transaction'}
      </button>
    </div>
  );
}

export default DeleteTransaction;
