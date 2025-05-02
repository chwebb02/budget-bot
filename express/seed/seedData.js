// backend/seed/seedData.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');           // adjust path if needed
const Transaction = require('../models/Transaction');
const BudgetItem = require('../models/BudgetItem');

// MongoDB connection URI
const MONGO_URI = '';  // use your Atlas URI

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear old data first (optional but recommended)
    await User.deleteMany();
    await Transaction.deleteMany();
    await BudgetItem.deleteMany();

    console.log('Old data cleared.');

    // Create a test user
    const hashedPassword = await bcrypt.hash('testpassword123', 10);

    const user = await User.create({
      username: 'testuser',
      password: hashedPassword
    });

    console.log('Test user created.');

    // Create some transactions
    const transactions = [
      { userId: user._id, description: 'Grocery Shopping', amount: -75.20, category: 'Food', date: new Date('2025-04-15') },
      { userId: user._id, description: 'Monthly Rent', amount: -1200.00, category: 'Housing', date: new Date('2025-04-01') },
      { userId: user._id, description: 'Paycheck', amount: 3000.00, category: 'Income', date: new Date('2025-04-05') },
      { userId: user._id, description: 'Gas Station', amount: -45.30, category: 'Transportation', date: new Date('2025-04-10') },
      { userId: user._id, description: 'Dinner with Friends', amount: -60.00, category: 'Entertainment', date: new Date('2025-04-18') },
      { userId: user._id, description: 'Freelance Project', amount: 450.00, category: 'Income', date: new Date('2025-04-20') }
    ];

    await Transaction.insertMany(transactions);
    console.log('Test transactions inserted.');

    // Create some budget items
    const budgets = [
      { userId: user._id, category: 'Food', value: 400, description: 'Monthly groceries and dining' },
      { userId: user._id, category: 'Housing', value: 1300, description: 'Rent and utilities' },
      { userId: user._id, category: 'Transportation', value: 200, description: 'Gas and car maintenance' },
      { userId: user._id, category: 'Entertainment', value: 150, description: 'Movies, games, outings' }
    ];

    await BudgetItem.insertMany(budgets);
    console.log('Test budget items inserted.');

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
