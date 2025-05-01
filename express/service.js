const db = require('./database');
const bcrypt = require('bcrypt')

// Implementation of service layer
async function register(username, password) {
    const user = db.get_user_by_username(username)
    if (user != null) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.create_user(username, hashedPassword)
    return result._id;
}

async function login(username, password) {
    const user = db.get_user_by_username(username)
    if (user === null) {
        throw new Error("User does not exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (hashedPassword === user.password) {
        return user._id;
    }

    throw new Error("Bad login");
}

module.exports = { register, login };