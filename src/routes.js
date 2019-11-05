import { Router } from 'express';
import actionFilter from './middlewares/actionFilter';
import UserController from './core/user/controller';

const routes = new Router();

routes.post('/users', actionFilter(UserController.store));

export default routes;
