import React, { useState } from 'react';
import UpdateTransaction from "./updateTransaction";
import NewTransaction from './createTransactions';
import DeleteTransaction from './deleteTransaction';


function TransactionPageTabs() {
    const [activeTab, setActiveTab] = useState('create');
  
    const PageContent = () => {
      switch (activeTab) {
        case 'create':
          return <NewTransaction />;
        case 'update':
          return <UpdateTransaction />;
       case 'delete':
          return <DeleteTransaction />;
        default:
          return null;
      }
    };
  
    return (
      <div className="tabs-container">
        <div className="tab-buttons">
          <button onClick={() => setActiveTab('create')} className={activeTab === 'create' ? 'active' : ''}>Create Transaction</button>
          <button onClick={() => setActiveTab('update')} className={activeTab === 'update' ? 'active' : ''}>Update Transaction</button>
          <button onClick={() => setActiveTab('delete')} className={activeTab === 'delete' ? 'active' : ''}>Delete Transaction</button>
        </div>
        <div className="page-content">
          {PageContent()}
        </div>
      </div>
    );
  }
  
  export default TransactionPageTabs;