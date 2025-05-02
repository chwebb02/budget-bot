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


module.exports = { register, login };