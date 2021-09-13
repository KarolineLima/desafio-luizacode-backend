import "dotenv/config";
import "./database";
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger_output.json'

import express from "express";
import cors from "cors";
import path from "path";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.server.use(cors());
    this.server.options('*', cors());
    this.server.use(express.json());
    this.routes();
    this.middleware();
    this.server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  middleware() {
    this.server.use(express.json())
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;