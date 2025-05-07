import React, { useState } from 'react';
import NewBudgetItem from './createItem';
import UpdateBudgetItem from './updateItem';
import DeleteBudgetItem from './deleteItem';

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
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white rounded shadow">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded ${
            activeTab === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Create Budget Item
        </button>
        <button
          onClick={() => setActiveTab('update')}
          className={`px-4 py-2 rounded ${
            activeTab === 'update' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Update Budget Item
        </button>
        <button
          onClick={() => setActiveTab('delete')}
          className={`px-4 py-2 rounded ${
            activeTab === 'delete' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Delete Budget Item
        </button>
      </div>
      <div>{PageContent()}</div>
    </div>
  );
}

export default BudgetItemPageTabs;
