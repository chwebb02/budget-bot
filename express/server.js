const service = require('./service');
const express = require('express');
const path = require('path');
const app = express();

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
        const user_id = await service.register(username, password);
        res.status(200).send(user_id);
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
        const user_id = await service.login(username, password);
        res.status(200).send(user_id);
    } catch (err) {
        let code = 500;
        if      (err.message === "User does not exist") { code = 404; }
        else if (err.message === "Bad login") { code = 401; }

        res.status(code).send(err.message);
    }
})