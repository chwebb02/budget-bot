const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Database Connection

const MONGO_URI = 'mongodb+srv://<db_username>:<db_password>@mizzouwebdevbudgetbotpr.uhgxvse.mongodb.net/<database_name>'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => {
    console.error(' Something went wrong with the connection:', err);
    process.exit(1);
  });

app.listen(process.env.PORT || 8080);