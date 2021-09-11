import { Router } from 'express';
import OrderController from './app/controller/OrderController';

import StoreController from './app/controller/StoreController';

const routes = new Router();

routes.get('/stores', StoreController.find);

routes.post('/order', OrderController.createOrder);

export default routes;