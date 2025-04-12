import { Router } from "express";
import type { UserController } from "../../controllers/user/user.controller";

export class UserRoutes {
	private routes: Router;
	constructor(private userController: UserController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.get("/user", this.userController.createUser.bind(this));
	}

	public getRoutes(): Router {
		return this.routes;
	}
}
