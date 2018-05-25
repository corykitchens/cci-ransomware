const express = require('express');
const app = express();
const db = require('./config/db');


db.then(() => console.log('Database connected'),
        err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/api/', (req, res) => res.send({message: "Hello World"}));

app.listen(port, () => console.log(`Server running on port ${port}`));