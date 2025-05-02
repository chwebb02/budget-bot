const mongoose = require('mongoose');

const budgetItemSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    value:{
        type: Number, 
        required: true,
    },

    category:{
        type: String,

    },

    description:{
        type: String,
    },
});

const budgetItem = mongoose.model('budgetItem', budgetItemSchema);

module.exports = budgetItem;