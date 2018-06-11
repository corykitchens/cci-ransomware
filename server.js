require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const passport = require('passport')
const routes = require('./app/routes.js');
const port = process.env.PORT || 5000;

require('./config/passport.js')(passport);

app.use(express.static(__dirname + '/client/build/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/build/');
});

app.listen(port, () => winston.log(`Server running on port ${port}`));