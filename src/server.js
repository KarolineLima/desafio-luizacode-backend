import { Router } from 'express';

import StoreController from './app/controller/StoreController';

const routes = new Router();

routes.get('/stores', StoreController.find);

export default routes;