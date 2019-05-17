require('dotenv').config();

const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require('./projects/projectsRoutes');
const actionsRouter = require('./actions/actionsRoutes')

function logger(req, res, next) {
  const seconds = new Date().toISOString();
    type= req.headers.type;
    url = req.headers.url;
  console.log(url, type, seconds);
    next();
  };

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

server.use('/api/projects', projectsRouter);

server.use('/api/actions', actionsRouter);

server.get("/", (req, res) => {
  res.send('<h2>This is My Sprint</h2>')
});

module.exports = server;