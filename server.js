const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require('./projects/projectsRoutes.js');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get("/", (req, res) => {
  res.send('<h2>This is My Sprint</h2>')
});

server.use('/api/projects', projectsRouter);

module.exports = server;