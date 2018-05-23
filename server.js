const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api/', (req, res) => res.send({message: "Hello World"}));

app.listen(port, () => console.log(`Server running on port ${port}`));