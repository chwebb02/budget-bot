const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/userModel.js");
const Transaction = require("./models/transactionModel.js");

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
        const newUser = new User({ username, password: hashed_password});
        const savedUser = await newUser.save();
        return savedUser._id;

    } catch (error){
        console.error("Unable to create user:", error);
        throw error;
    }
    
}

//logout option?--requires authentication token

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

module.exports = { get_user_by_username, create_user, createTransaction, getTransactionsForUser, getTransactionById, updateTransaction, deleteTransaction };