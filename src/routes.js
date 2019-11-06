import { Router } from 'express';
import actionFilter from './middlewares/actionFilter';

import UserController from './core/user/controller';
import SessionController from './core/session/controller';

const routes = new Router();

routes.post('/users', actionFilter(UserController.store));

routes.post('/session', actionFilter(SessionController.store));

export default routes;
