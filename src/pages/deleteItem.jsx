import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../create.css';

  
  function DeleteBudgetItem() {
    const [items, setItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
  
    // Hardcoded userID
    const userId = '68143c705514ce8fd0e54de9';
  
    // Fetch budget items 
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const response = await axios.get(`/user/${userId}/budgetItems`);
          setItems(response.data);
        } catch (err) {
          console.error('Failed to fetch items:', err);
        }
      };
  
      fetchItems();
    }, [userId]);
  
    // Allow only one checkbox to be selected at a time
    const handleCheckboxChange = (id) => {
      setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));
    };
  
    
    const handleDelete = async () => {
  
      if (selectedIds.length === 0) return;
  
      const itemId = selectedIds[0];
      setIsDeleting(true);
  
      try {
        const response = await axios.delete(`/user/${userId}/budgetItems/${itemId}`);
      
        // Removes deleted item from list so it won't display
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
      <div className='container'>
        <div className='budget-item-list'>
          <h2>Choose an Item to Delete</h2>
          {items.length === 0
          ? null
          : items.map((item) => (
          <div key={item._id} className='all-budget-items'>
                <input
                    type='checkbox'
                    checked={selectedIds.includes(item._id)}
                    onChange={() => handleCheckboxChange(item._id)}
                    disabled={isDeleting}
                />
                ${item.value} - {item.category} - {item.description}
           </div>
         ))
        }
        </div>
  
        <button className="deleteButton"
          onClick={handleDelete}
          disabled={selectedIds.length !== 1 || isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Item'}
        </button>
      </div>
    );
  }
  
  export default DeleteBudgetItem;
  
