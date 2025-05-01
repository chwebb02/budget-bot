const service = require('./service');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

// Define api here
app.post('/user/register', function (req, res) {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Username and password are required');
    }

    try {
        const user_id = service.register(username, password);
        res.status(200).send(user_id);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(process.env.PORT || 8080);