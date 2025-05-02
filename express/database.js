const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/userModel.js");

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

module.exports = { get_user_by_username, create_user };