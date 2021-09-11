import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import OrderController from './app/controller/OrderController';
import CategoryController from './app/controller/CategoryController';

import StoreController from './app/controller/StoreController';
import ImageController from './app/controller/ImageController';

import ProductController from './app/controller/ProductController';
import EmployeeController from './app/controller/EmployeeController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/stores', StoreController.find);

routes.post('/product', ProductController.createProduct);
routes.get('/product', ProductController.listAll);
routes.get('/product/:id', ProductController.listById);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);

routes.post('/image', upload.single('image'), ImageController.store);
// demais rotas
routes.post('/order', OrderController.createOrder);

routes.post('/categories', CategoryController.createCategory);
routes.get('/categories', CategoryController.find);
routes.get('/categories/:id', CategoryController.getId);
routes.post('/stores', StoreController.createStore);

routes.post('/employee', EmployeeController.registration);
routes.post('/employee/login', EmployeeController.login);
routes.put('/employee/:id', EmployeeController.update);

export default routes;
