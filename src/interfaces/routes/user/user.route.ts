import { Router } from "express";
import type { UserController } from "../../controllers/user/user.controller";

export class UserRoutes {
	private routes: Router;
	constructor(private userController: UserController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.post(
			"/user",
			this.userController.createUser.bind(this.userController),
		);
		this.routes.get(
			"/users",
			this.userController.findAllUsers.bind(this.userController),
		);
	}

	public getRoutes(): Router {
		return this.routes;
	}
}
