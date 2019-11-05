import express from 'express';
import routes from './routes';
import response from './middlewares/response';

import './database';

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

export default new App().server;
