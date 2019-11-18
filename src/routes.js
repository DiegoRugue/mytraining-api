const { Router } = require('express');
const actionFilter = require('./middlewares/actionFilter');

const UserController = require('./core/user/controller');
const SessionController = require('./core/session/controller');

const routes = new Router();

routes.post('/users', actionFilter(UserController.store));

routes.post('/session', actionFilter(SessionController.store));

module.exports = routes;
