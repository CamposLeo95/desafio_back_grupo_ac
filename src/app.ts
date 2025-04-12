import express from "express";
export class App {
	app = express();

	constructor() {
		this.initApp();
	}

	initApp() {}
}

export default new App().app;
