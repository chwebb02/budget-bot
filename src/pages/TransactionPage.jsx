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
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded ${
            activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Create Transaction
        </button>
        <button
          onClick={() => setActiveTab('update')}
          className={`px-4 py-2 rounded ${
            activeTab === 'update' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Update Transaction
        </button>
        <button
          onClick={() => setActiveTab('delete')}
          className={`px-4 py-2 rounded ${
            activeTab === 'delete' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Delete Transaction
        </button>
      </div>
      <div>{PageContent()}</div>
    </div>
  );
}

export default TransactionPageTabs;
