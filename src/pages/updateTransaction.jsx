import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../create.css';
import api, { API_ROUTES } from '../api';  

function UpdateTransaction() {
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
    if (!sessionStorage.getItem("userID")) {
        navigate("/login");
    }
    }, [navigate]);

   
    useEffect(() => {
    fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
    const userID = sessionStorage.getItem("userID");
    if (!userID) return;
    try {
        const response = await api.get(API_ROUTES.getUserTransactions(userID));
        setItems(response.data);
    } catch (err) {
        console.error('Failed to fetch transactions:', err);
    }
    };

    const handleCheckboxChange = (id) => {
    setSelectedId(id);
    const item = items.find((itm) => itm._id === id);
    setValue(item.value);
    setCategory(item.category);
    setDescription(item.description);
    setDate(item.date ? item.date.substring(0,10) : ''); 
    setShowForm(true);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
        await api.put(API_ROUTES.updateTransaction, {
        _id: selectedId,    
        value,
        category,
        description,
        date,
        // budgetItemID if needed
        });
        await fetchTransactions();
        setShowForm(false);
        setSelectedId(null);
        alert('Transaction updated successfully!');
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
    <div className='container'>
        {!showForm ? (
        <div className='transaction-list'>
            <h2>Choose a Transaction to Update</h2>
            {items.length === 0
            ? null
            : items.map((item) => (
                <div key={item._id} className='all-transactions'>
                <input
                    type='checkbox'
                    checked={false}
                    onChange={() => handleCheckboxChange(item._id)}
                    disabled={isUpdating}
                />
                ${item.value} - {item.category} - {item.description} - {item.date ? item.date.substring(0,10) : ''}
                </div>
            ))}
        </div>
        ) : (
        <>
            <h2 className='updateHeader'>Update Transaction</h2>
            <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-details">
                <input
                type="number"
                placeholder="Value ($)"
                value={value}
                onChange={e => setValue(e.target.value)}
                required
                />
            </div>
            <div className="dropdown-details">
                <select className='dropdown'
                value={category}
                onChange={e => setCategory(e.target.value)}
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
            <div className="form-details">
                <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                />
            </div>
            <div className="form-details">
                <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
                />
            </div>
            <div className='buttonRow'>
                <button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Submit'}
                </button>
                <button className='cancelButton' type="button" onClick={handleCancel} disabled={isUpdating}>
                Cancel
                </button>
            </div>
            </form>
        </>
        )}
    </div>
    );
}

export default UpdateTransaction;