const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    value:{
        type: Number,
        required: true,
    },

    description:{
        type: String,
    },

    category:{
        type: String,

    },
    
});

const transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;