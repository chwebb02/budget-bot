import React, { useState } from 'react';
import axios from 'axios';
import '../create.css';
import './updateItem.jsx';

function NewBudgetItem(onAddItem) {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userID = '68143c705514ce8fd0e54de9';//hardcoded for testing purposes/replace with authentication once its implemented
      const details = await axios.post('/budgetItem/create', {
        userID,
        value,
        category,
        description
      });
      setValue('');
      setCategory('');
      setDescription('');
      alert('Item created successfully!');
      onAddItem(details);/*fetchItems();*/
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <div className='container'>
      <h2 className='createHeader'>Create a Budget Item</h2>
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
        <button type="submit">Create</button>
      </form>
      
    </div>
  );
}

export default NewBudgetItem;
