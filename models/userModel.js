const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [4, 'Username must contain a minimum of 4 characters'],
        maxlength: [12, 'Username must contain a maximum of 12 characters'],
        
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }

});

const User = mongoose.model('User', accountSchema);

module.exports = User;