const mongoose = require('mongoose');
const config = require("./config");

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
export async function get_user_by_username(username) {
    // Function stub, needs to be implemented
    return null;
}

export async function create_user(username, hashed_password) {
    // Function stub, needs to be implemented
    return 1;
}