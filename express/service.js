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

async function add_Budget_Item(userID, value, category, description){
     if (value <= 0){
        throw new Error ('Value must be greater than zero.');
     }

     if (!userID){
        throw new Error ('userID is required');
     }

     try{
        const newItem = await db.create_Budget_Item(userID, value, category, description);
        console.log ('Item created successfully!', newItem);
        return newItem;

     }catch (error){
        console.error('Failed to create new budget item: ', error)
        throw error;

     }
}


module.exports = { register, login, add_Budget_Item };