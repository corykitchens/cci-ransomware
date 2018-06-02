const express = require('express');
const app = express();
const routes = require('./app/routes.js');
const db = require('./db');
const port = process.env.PORT || 5000;

app.use('/', routes);


app.listen(port, () => console.log(`Server running on port ${port}`));