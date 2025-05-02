import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCard = ({ transactions }) => {
  // Calculate category sums
  const categorySums = {};
  transactions.forEach((t) => {
    const key = t.category;
    categorySums[key] = (categorySums[key] || 0) + Math.abs(t.amount);
  });

  const data = {
    labels: Object.keys(categorySums),
    datasets: [
      {
        data: Object.values(categorySums),
        backgroundColor: ['#4ADE80', '#F87171', '#60A5FA', '#FBBF24', '#A78BFA'],
      }
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Spending by Category</h2>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default ChartCard;
