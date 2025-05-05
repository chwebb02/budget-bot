import React, { useState } from 'react';
import UpdateBudgetItem from './updateItem.jsx';
import NewBudgetItem from './createItem.jsx';
import DeleteBudgetItem from './deleteItem.jsx';

function BudgetItemPageTabs() {
    const [activeTab, setActiveTab] = useState('create');
  
    const PageContent = () => {
      switch (activeTab) {
        case 'create':
          return <NewBudgetItem />;
        case 'update':
          return <UpdateBudgetItem />;
       case 'delete':
          return <DeleteBudgetItem />;
        default:
          return null;
      }
    };
  
    return (
      <div className="tabs-container">
        <div className="tab-buttons">
          <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>Create Budget Item</button>
          <button onClick={() => setActiveTab('update')} className={activeTab === 'update' ? 'active' : ''}>Update Budget Item</button>
          <button onClick={() => setActiveTab('delete')} className={activeTab === 'delete' ? 'active' : ''}>Delete Budget Item</button>
        </div>
        <div className="page-content">
          {PageContent()}
        </div>
      </div>
    );
  }
  
  export default BudgetItemPageTabs;
  
