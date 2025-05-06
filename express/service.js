const db = require('./database');
const bcrypt = require('bcrypt')

// Implementation of service layer
async function register(username, password) {
    const user = await db.get_user_by_username(username)
    if (user) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.create_user(username, hashedPassword)
    return result._id;
}

async function login(username, password) {
    let user = await db.get_user_by_username(username)
    if (!user) {
        throw new Error("User does not exist");
    }

    const valid_password = await bcrypt.compare(password, user.password);
    if(!valid_password) {
        throw new Error ('Bad login')
    }

    return user._id;
}

async function createTransaction(transaction) {
    return await db.createTransaction(transaction);
}

async function getUserTransactions(userId) {
    return await db.getTransactionsForUser(userId);
}

async function getTransactionById(transactionId) {
    return await db.getTransactionById(transactionId);
}

async function updateTransaction(transaction) {
    return await db.updateTransaction(transaction._id, transaction);
}

async function deleteTransaction(transactionId) {
    await db.deleteTransaction(transactionId);
}

async function createBudgetItem(budgetItem) {
    return await db.createBudgetItem(budgetItem);
}

async function getUserBudgetItems(userId) {
    return await db.getBudgetItemsForUser(userId);
}

async function getBudgetItemById(budgetItemId) {
    return await db.getBudgetItemById(budgetItemId);
}

async function updateBudgetItem(budgetItem) {
    return await db.updateBudgetItem(budgetItem._id, budgetItem);
}

async function deleteBudgetItem(budgetItemId) {
    await db.deleteBudgetItem(budgetItemId);
}


module.exports = { 
    register, 
    login, 
    createTransaction, 
    getUserTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction, 
    createBudgetItem,
    getUserBudgetItems,
    getBudgetItemById,
    updateBudgetItem,
    deleteBudgetItem
};
