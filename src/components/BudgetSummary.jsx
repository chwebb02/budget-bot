import React from 'react';

const BudgetSummary = ({ budgets }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Your Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget._id || budget.id} className="border-b py-2 flex justify-between">
            <div>
              <span className="font-medium">{budget.category}</span> — {budget.description}
            </div>
            <div className="text-blue-600">
              ${budget.value.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSummary;
