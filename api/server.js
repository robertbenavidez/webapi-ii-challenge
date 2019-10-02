express = require('express');

const server = express();

const PostsRouter = require('../router.js')

//middleware

server.use(express.json());

server.use('/api/posts', PostsRouter);





module.exports = server; 