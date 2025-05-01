const db = require('./database');
const bcrypt = require('bcrypt')

// Implementation of service layer
export async function register(username, password) {
    const user = db.get_user_by_username()
    if (user != null) {
        throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await db.create_user(username, hashedPassword)
}