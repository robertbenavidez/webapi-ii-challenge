express = require('express');

const server = express();



//middleware

server.use(express.json());






module.exports = server; 