import "dotenv/config";
import "./database";

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