const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,  
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }

});

const User = mongoose.model('User', accountSchema);

module.exports = User;