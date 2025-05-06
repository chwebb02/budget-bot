import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../create.css';
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

 //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
        await api.put(API_ROUTES.updateBudgetItem,{
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

  // Cancel and return to list
  const handleCancel = () => {
    setShowForm(false);
    setSelectedId(null);
  };

  return (
    <div className='container'>
        {!showForm ? (
            <div className='budget-item-list'>
            <h2>Choose an Item to Update</h2>
            {items.length === 0
            ? null
            : items.map((item) => (
            <div key={item._id} className='all-budget-items'>
                <input
                    type='checkbox'
                    checked={false}
                    onChange={() => handleCheckboxChange(item._id)}
                    disabled={isUpdating}
                />
                ${item.value} - {item.category} - {item.description}
            </div>
        ))}
        </div>
        ) : (
            <>
            <h2 className='updateHeader'>Update Budget Item</h2>
            <form onSubmit={handleSubmit} className="budget-form">
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

export default UpdateBudgetItem;