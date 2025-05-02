const service = require('./service');
const express = require('express');
const path = require('path');
const app = express();
const Transaction = require('./models/transactionModel');
const transaction = require("./models/transactionModel");

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

app.put('/transaction/:transactionId', async (req, res) => {
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
        await deleteTransaction(transactionId);
        res.status(200).send();
    } catch (err) {
        let code = 500;

        res.status(code).send(err.message);
    }
})