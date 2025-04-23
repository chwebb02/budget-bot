const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const MONGO_URI = 'mongodb+srv://cjstr4:FinalProjectTeam03@mizzouwebdevbudgetbotpr.uhgxvse.mongodb.net/'
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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