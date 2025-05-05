const service = require('./service');
const express = require('express');
const path = require('path');
const app = express();
const Transaction = require('./models/transactionModel');


app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE"
    );
    next();
});

app.listen(8080);

// Define api here
app.post('/user/register', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Username and password are required');
    }

    try {
        const userId = await service.register(username, password);
        res.status(200).send(userId);
    } catch (err) {
        let code = 500;
        if (err.message === "Username already exists") { code = 409; }

        res.status(code).send(err.message);
    }
});

app.post('/user/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Username and password are required');
    }

    try {
        const userId = await service.login(username, password);
        res.status(200).send(userId);
    } catch (err) {
        let code = 500;
        if      (err.message === "User does not exist") { code = 404; }
        else if (err.message === "Bad login") { code = 401; }

        res.status(code).send(err.message);
    }
});

app.post('/transaction/create', async (req, res) => {
    const transaction = new Transaction(req.body);
    if (!transaction) {
        res.status(400).send('Malformed request');
    }

    try {
        const savedTransaction = await service.createTransaction(transaction);
        res.status(200).send(savedTransaction);
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.get('/user/:userId/transactions', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send('Malformed request');
    }

    try {
        const transactions = await service.getUserTransactions(userId);
        res.status(200).send(transactions);
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.get('/transaction/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;
    if (!transactionId) {
        res.status(400).send('Malformed request');
    }

    try {
        const transaction = await service.getTransactionById(transactionId);
        res.status(200).send(transaction);
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.put('/transaction', async (req, res) => {
    const transaction = new Transaction(req.body);
    if (!transaction) {
        res.status(400).send('Malformed request');
    }

    try {
        const updatedTransaction = await service.updateTransaction(transaction);
        res.status(200).send(updatedTransaction);
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.delete('/transaction/:transactionId', async (req, res) => {
    const transactionId = req.params.transactionId;
    if (!transactionId) {
        res.status(400).send('Malformed request');
    }

    try {
        const removeTransaction = await service.deleteTransaction(transactionId);
        res.status(200).send(removeTransaction);
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
})


app.post('/budgetItem/create', async (req, res) => {
    const budgetItems = req.body;
    if (!budgetItems){
        res.status(400).send('Budget item not found');
    }

    try{
        const createdBudgetItem = await service.addBudgetItem(budgetItems);
        res.status(200).send(createdBudgetItem);

    }catch (err){
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.get('/user/:userId/budgetItems', async (req, res) => {
    const userId = req.params.userId;
        if (!userId) {
            res.status(400).send('Please provide a valid user ID');
        }

    try{
        const userByID = await service.getBudgetItemForUser(userId);
        res.status(200).send(userByID);

    }catch (err){
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.get('/budgetItem/:budgetItemId', async (req, res) => {
    const budgetItemId = req.params.budgetItemId;
    
    if (!budgetItemId) {
        res.status(400).send('Please provide a valid budget item id');
    }

    try{
        const getItem = await service.getBudgetItemByID(budgetItemId);
        res.status(200).send(getItem);

    }catch (err){
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.put('/budgetItem/:budgetItemId', async (req, res) => {
    const budgetItemId = req.params.budgetItemId;
    const modify = req.body;
    if (!modify) {
        res.status(400).send('budget item not found');
    }

    try {
        const updatedbudgetItem = await service.modifyBudgetItem(budgetItemId, modify);
        res.status(200).send(updatedbudgetItem);
       
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

app.delete('/user/:userId/budgetItems/:budgetItemId', async (req, res) => {
    const budgetItemId = req.params.budgetItemId;
    const userId = req.params.userId;
    if (!budgetItemId) {
        res.status(400).send('Please provide a valid budget item id');
    }

    try {
        const deleteItem = await service.deleteBudgetItem(budgetItemId, userId);
        res.status(200).send(deleteItem);
     
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
});

