import express from "express";
import { routes } from "./interfaces/routes/routes";

export class App {
	app = express();

	constructor() {
		this.initApp();
	}

	initApp() {
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use(routes);
	}
}

export default new App().app;
