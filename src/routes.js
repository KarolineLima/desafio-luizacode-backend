import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import OrderController from './app/controller/OrderController';
import CategoryController from './app/controller/CategoryController';
import StoreController  from './app/controller/StoreController';
import ProductController from './app/controller/ProductController';
import ImageController from './app/controller/ImageController';

import UserController from './app/controller/UserController';
import authMiddleware from './app/middlewares/auth';
import SessionController from './app/controller/SessionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/stores', StoreController.find)

routes.post('/product', ProductController.createProduct)
routes.get('/product', ProductController.listAll)
routes.get('/product/:id', ProductController.getById)
routes.put('/product/:id', ProductController.update)
routes.delete('/product/:id', ProductController.delete)

routes.post('/image', upload.single('image'), ImageController.create);

routes.post('/order', OrderController.createOrder);
routes.post('/order-status', OrderController.updateStatus);
routes.post('/order-product/user', OrderController.listByUser);

routes.post('/categories', CategoryController.createCategory)
routes.get('/categories', CategoryController.find)
routes.get('/categories/:id', CategoryController.getId)
routes.post('/stores', StoreController.createStore)
routes.get('/stores', StoreController.find);
routes.post('/register', UserController.register);
routes.post('/login', SessionController.store);


// routes.use(authMiddleware);
// routes.post('/login', StoreController.login);

routes.post('/order', OrderController.createOrder);

export default routes;