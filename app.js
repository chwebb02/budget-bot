// The main file for the express server

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/hello', function (req, res) {
    res.send("This is a test");
});

app.listen(3000, function () {
    console.log('app.js listening to http://localhost:3000/');
});