const express = require('express');
const { startConnection } = require('./config/connection');
const app = express();

// port
require('dotenv').config();
const { PORT = 4000} = process.env;

startConnection();
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log('Server running in port', PORT);
});


