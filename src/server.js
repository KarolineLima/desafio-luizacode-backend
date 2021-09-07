<<<<<<< HEAD
import { Router } from 'express';

import StoreController from './app/controller/StoreController';

const routes = new Router();

routes.get('/stores', StoreController.find);

export default routes;
=======
import app from './app';

const PORT = process.env.PORT;
app.listen(PORT);

console.log(`This server started in port ${process.env.PORT}`)
>>>>>>> 71ffe54... update development environment
