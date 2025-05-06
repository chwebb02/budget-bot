const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/userModel.js");
const Transaction = require("./models/transactionModel.js");
const BudgetItem = require("./models/budgetItemModel.js")

// Configure mongoose connection
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => {
        console.error(' Something went wrong with the connection:', err);
        process.exit(1);
    });

// Implement database CRUD operations here

//User CRUD
async function getUserByUsername(username) {
    try{
        return await User.findOne({ username });
    } catch(error){
        console.error("Username not found", error);
        throw error;
    }
}

async function createUser(username, hashed_password) {
    try{
        const newUser = new User({ username: username, password: hashed_password});
        const savedUser = await newUser.save();
        return savedUser;

    } catch (error){
        console.error("Unable to create user:", error);
        throw error;
    }
}

// Transaction CRUD
async function createTransaction(transaction) {
    return await new Transaction(transaction).save();
}

async function getTransactionsForUser(userId) {
    return await Transaction.find({'userID': userId}).exec();
}

async function getTransactionById(transactionId) {
    return await Transaction.findById(transactionId).exec();
}

async function updateTransaction(transactionId, transaction) {
    return await Transaction.findByIdAndUpdate(
        {_id: transactionId},
        {$set: transaction},
        {new: true}
    ).exec();
}

async function deleteTransaction(transactionId) {
    await Transaction.findByIdAndDelete(transactionId).exec();
}

//Budget Item CRUD
async function createBudgetItem(budgetItem) {
    return await new BudgetItem(budgetItem).save();
}

async function getBudgetItemsForUser(userId) {
    return await BudgetItem.find({'userID': userId}).exec();
}

async function getBudgetItemById(budgetItemId) {
    return await BudgetItem.findById(budgetItemId).exec();
}

async function updateBudgetItem(budgetItemId, budgetItem) {
    return await BudgetItem.findByIdAndUpdate(
        {_id: budgetItemId},
        {$set: budgetItem},
        {new: true}
    ).exec();
}

async function deleteBudgetItem(budgetItemId) {
    await BudgetItem.findByIdAndDelete(budgetItemId).exec();
}

module.exports = {
    getUserByUsername,
    createUser,
    createTransaction,
    getTransactionsForUser,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    createBudgetItem,
    getBudgetItemsForUser,
    getBudgetItemById,
    updateBudgetItem,
    deleteBudgetItem
};

