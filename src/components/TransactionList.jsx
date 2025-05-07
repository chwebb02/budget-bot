import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id} className="border-b py-2 flex justify-between">
            <span>{t.description}</span>
            <span className={t.value < 0 ? 'text-red-600' : 'text-green-600'}>
              ${t.value.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
