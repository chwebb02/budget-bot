const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/userModel.js");
const Transaction = require("./models/transactionModel.js");
const budgetItem = require("./models/budgetItemModel.js")

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
async function get_user_by_username(username) {
    try{
        return await User.findOne({ username });

    } catch(error){
        console.error("Username not found", error);
        throw error;
    }
}

async function create_user(username, hashed_password) {
    try{
        const newUser = new User({ username: username, password: hashed_password});
        const savedUser = await newUser.save();
        return savedUser;

    } catch (error){
        console.error("Unable to create user:", error);
        throw error;
    }
    
}

//logout option?--requires authentication token

// Transaction CRUD
async function createTransaction(transaction) {
    // Function stub, needs implemented
    return await new Transaction({ transaction }).save();
}

async function getTransactionsForUser(userId) {
    // Function stub, needs implemented
    return [];
}

async function getTransactionById(transactionId) {
    // Function stub, needs implemented
    return null;
}

async function updateTransaction(transactionId, transaction) {
    // Function stub, needs implemented
    return null;
}

async function deleteTransaction(transactionId) {
    // Function stub, needs implemented
    // Does not need a return statement in final implementation, just
    // throw error if operation fails
    return null;
}

//Budget Item CRUD

//Create a budget item
async function createBudgetItem(userID, value, category, description) {
    try {
      const newBudgetItem = new budgetItem({
        userID,
        value,
        category,
        description,
      });
      const savedItem = await newBudgetItem.save();
      return savedItem;
    } catch (error) {
      console.error('Error creating budget item: ', error);
      throw error;
    }
  }

  //Get a Budget Item by User ID
  async function getBudgetItemUserID(userID) {
    try {
      const budgetItems = await budgetItem.find({userID}).exec();
      return budgetItems;
    } catch (error) {
      console.error('Unable to fetch budget item with specified ID: ', error);
      throw error;
    }
  }

  //Get a Budget Item by Budget ID
  async function getBudgetItemID(id) {
    try {
      const budgetItems = await budgetItem.findOne({_id: id}).exec();
      return budgetItems;
    } catch (error) {
      console.error('Unable to fetch budget item with specified ID: ', error);
      throw error;
    }
  }
 

  //Delete Budget Item
  async function deleteBudgetItem(id, userID){
    try{
        const deleteItem = await budgetItem.findOneAndDelete({_id: id, userID: userID}).exec();
        return deleteItem;
    }catch(error){
        console.error("Failed to delete budget item: ", error);
        throw error;

    }
  }

  //Update Budget Item
  async function updateBudgetItem(id, update){
    try{
        const updateItem = await budgetItem.findByIdAndUpdate(
            {_id: id},
            {$set: update},
            {new: true}
        ).exec();
        return updateItem;

    }catch(error){
        console.error('Failed to update budget item:', error);
        throw error;

    }
  }


module.exports = { get_user_by_username, 
    create_user, 
    createBudgetItem, 
    getBudgetItemUserID, 
    getBudgetItemID,
    deleteBudgetItem,
    updateBudgetItem,
    createTransaction,
    getTransactionsForUser,
    getTransactionById,
    updateTransaction,
    deleteTransaction

};
