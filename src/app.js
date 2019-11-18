require('./bootstrap');
require('./database');

const express = require('express');
const routes = require('./routes');
const response = require('./middlewares/response');

class App {
  constructor() {
    this.server = express();
    this.midllewares();
    this.routes();
  }

  midllewares() {
    this.server.use(express.json());
    this.server.use(response);
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
