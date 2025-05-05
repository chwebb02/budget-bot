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

async function addBudgetItem(budgetItemInfo){
    const {userID, value, category, description} = budgetItemInfo;
     if (value <= 0){
        throw new Error ('Value must be a number and greater than zero.');
     }

     if (!userID){
        throw new Error ('userID is required');
     }

     if(!category){
        throw new Error('Category is required');
     }

     if(!description){
        throw new Error('Description is required');
     }

     try{
        const newItem = await db.createBudgetItem(userID, value, category, description);
        console.log ('Item created successfully!', newItem);
        return newItem;

     }catch (error){
        console.error('Failed to create new budget item: ', error);
        throw error;

     }
}

async function getBudgetItemForUser(userID){
    try{
        const getItem = await db.getBudgetItemUserID(userID);

        if(!getItem){
            throw new Error('Budget item not found');
        }
        return getItem;

    }catch(error){
        console.error('Failed to retreive budget item by User ID');

    }

}

async function getBudgetItemByID(id){
    try{
        const getItem = await db.getBudgetItemID(id);

        if(!getItem){
            throw new Error('Budget Item not found');
        }

        return getItem;

    }catch(error){
        console.error('Failed to retrieve budget item by ID');

    }

}

async function deleteBudgetItems(id, userID){
    try{
        const deletedItem = await db.deleteBudgetItem(id, userID);

        if(!deletedItem){
            throw new Error('Budget item not found');
        }

        return deletedItem;
        

    }catch(error){
        console.error('Failed to delete budget item', error);

    }

}

async function modifyBudgetItem(id, update){
    try{
        const updateItem = await db.updateBudgetItem(id, update);

        if(!updateItem){
            throw new Error('Budget item not found');
        }

        return updateItem;

    }catch(error){
        console.error('Failed to update budget item', error);

    }

}



module.exports = { 
    register, 
    login, 
    createTransaction, 
    getUserTransactions, 
    getTransactionById, 
    updateTransaction, 
    deleteTransaction, 
    addBudgetItem,
    deleteBudgetItems,
    getBudgetItemForUser,
    getBudgetItemByID,
    modifyBudgetItem
};
